import WebSocket from "ws";

import {
  GatewayPayload,
  HelloEvent,
  InvalidSessionEvent,
  MessageEvent,
  ReadyEvent
} from "./types/messages";
import { GatewayResponse } from "./types/responses";
import { fetch, timerFactory } from "./utils";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const TIMEOUT_INTERVAL = 1000;

export default function gatewayFactory(
  onMessage: (event: MessageEvent) => void
) {
  const timers = timerFactory();
  let ws: WebSocket;

  const connect = async () => {
    let timeout = TIMEOUT_INTERVAL;

    let heartbeatAck = false;
    let heartbeatInterval = 0;

    let sequence: number | null;
    let session: string | null;

    const reconnect = () => {
      console.log(`Reconnecting in ${timeout} ms ...`);

      timers.clearAll();
      timers.schedule("CONNECT", connect, timeout);

      timeout += TIMEOUT_INTERVAL;
    };

    console.log("Fetching gateway URL ...");
    const response = (await fetch("gateway/bot")) as GatewayResponse;

    if (response.session_start_limit.remaining < 1) {
      console.log("No available sessions.");
      reconnect();
      return;
    }

    console.log("Connecting to gateway ...");
    ws = new WebSocket(`${response.url}?v=8&encoding=json`);

    ws.onopen = () => {
      console.log("Connection open.");
      timeout = TIMEOUT_INTERVAL;
    };

    ws.onerror = () => {
      console.log("Connection error.");
      reconnect();
    };

    ws.onmessage = ({ data }) => {
      const send = (op: number, data: any) => {
        ws.send(JSON.stringify({ op, d: data }));
      };

      const identify = () => {
        if (session) {
          send(6, {
            token: DISCORD_TOKEN,
            session_id: session,
            seq: sequence ?? null
          });
        } else {
          send(2, {
            token: DISCORD_TOKEN,
            properties: {
              $os: process.platform,
              $browser: "TrashBot",
              $device: "TrashBot"
            },
            intents: 512
          });
        }
      };

      const heartbeat = () => {
        if (heartbeatAck) {
          send(1, sequence ?? null);
          heartbeatAck = false;

          timers.schedule("HEARTBEAT", heartbeat, heartbeatInterval);
        } else {
          ws.close(1002);
        }
      };

      if (typeof data !== "string") {
        console.log("Ignoring non-text data.", data);
        return;
      }
      const payload = JSON.parse(data) as GatewayPayload;

      switch (payload.op) {
        // Sent when a Discord event occurs
        case 0: {
          sequence = payload.s ?? null;

          switch (payload.t) {
            //
            case "READY": {
              const event = payload.d as ReadyEvent;
              console.log("Ready event received.");

              session = event.session_id;
              break;
            }

            //
            case "MESSAGE_CREATE":
            case "MESSAGE_UPDATE": {
              const event = payload.d as MessageEvent;
              onMessage && onMessage(event);
              break;
            }
          }
          break;
        }

        // Sent in some situations to request a heartbeat from us
        case 1: {
          heartbeatAck = true;
          heartbeat();
          break;
        }

        // Sent if the current session has been invalidated
        case 9: {
          const event = payload.d as InvalidSessionEvent;
          console.log("Invalid session event received.");

          if (!event) {
            sequence = null;
            session = null;
          }

          timers.schedule("IDENTIFY", identify, 1000 + Math.random() * 4000);
          break;
        }

        // Sent immediately after connecting
        case 10: {
          const event = payload.d as HelloEvent;
          console.log("Hello event received.");

          heartbeatInterval = event.heartbeat_interval;
          heartbeatAck = true;

          console.log(`Sending heartbeat every ${heartbeatInterval} ms.`);
          timers.schedule(
            "HEARTBEAT",
            heartbeat,
            heartbeatInterval * Math.random()
          );

          identify();
          break;
        }

        // Sent to acknowledge that a heartbeat has been received
        case 11: {
          heartbeatAck = true;
          break;
        }
      }
    };
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
    }
    timers.clearAll();
  };

  return {
    connect,
    disconnect
  };
}
