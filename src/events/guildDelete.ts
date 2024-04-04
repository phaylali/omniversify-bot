import type { OmniversifyClient } from "@core/mod.ts";
import { OmniversifyEvent } from "@framework/mod.ts";
import type { Guild } from "harmony/mod.ts";

export default new OmniversifyEvent<"guildDelete">()
  .setName("guildDelete")
  .setRun(async (client: OmniversifyClient, guild: Guild) => {
    await client.db.removeGuild(guild.id);
    await client.updatePresence();
  });
