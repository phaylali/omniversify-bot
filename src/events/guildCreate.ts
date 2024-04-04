import type { OmniversifyClient } from "@core/mod.ts";
import { OmniversifyEvent } from "@framework/mod.ts";
import { Embed, type Guild } from "harmony/mod.ts";

export default new OmniversifyEvent<"guildCreate">()
  .setName("guildCreate")
  .setRun(async (client: OmniversifyClient, guild: Guild) => {
    await client.db.registerGuild(guild.id);
    await client.updatePresence();

    if (!guild.systemChannelID || !client.user) return;
    const channel = await client.channels.get(guild.systemChannelID);
    if (!channel?.isText() || !channel) return;

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(client.user.username)
      .setThumbnail(client.user.avatarURL())
      .setDescription(
        `Type "/" to check bot commands!
         https://github.com/phaylali/Omniversify-bot.`,
      );

    return channel.send({
      embeds: [embed],
    });
  });
