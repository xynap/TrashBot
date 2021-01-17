import { Message, Snowflake, User } from "./common";

export interface GatewayPayload {
  op: number;
  d: HelloEvent | ReadyEvent | InvalidSessionEvent | MessageEvent | null;
  s: number | null;
  t: string | null;
}

export interface HelloEvent {
  heartbeat_interval: number;
}

export interface ReadyEvent {
  v: number;
  user: User;
  private_channels: [];
  guilds: {
    id: Snowflake;
    unavailable: boolean;
  }[];
  session_id: string;
  shard?: [number, number];
}

export type InvalidSessionEvent = boolean;

export type MessageEvent = Message;
