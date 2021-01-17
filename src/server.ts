import { rename } from "./commands/rename";
import gatewayFactory from "./gateway";

const gateway = gatewayFactory(async event => {
  const args = event.content.split(" ");
  const command = args.shift();

  switch (command) {
    case "/rename": {
      await rename(args, event.channel_id, event.guild_id);
    }
  }
});
gateway.connect();
