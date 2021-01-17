import { Channel } from "../types/common";
import { fetch } from "../utils";

export async function rename(
  args: string[],
  channelId: string,
  guildId?: string
) {
  if (args.length == 1) {
    await fetch(`channels/${channelId}`, "PATCH", { name: args[0] });
  } else if (guildId && args.length == 2) {
    const channels = (await fetch(`/guilds/${guildId}/channels`)) as Channel[];

    const targetChannel = channels.find(channel => channel.name == args[0]);
    if (targetChannel) {
      await fetch(`channels/${targetChannel.id}`, "PATCH", { name: args[1] });
    }
  }
}
