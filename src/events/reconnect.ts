import type { OmniversifyClient } from "@core/mod.ts";
import { OmniversifyEvent } from "@framework/mod.ts";
import type {  Message, TextChannel } from "harmony/mod.ts";

export default new OmniversifyEvent<"reconnect">()
  .setName("reconnect")
  .setRun(async (client: OmniversifyClient) => {
    await client.updatePresence();

    // biome-ignore lint/complexity/noForEach: <explanation>
    (await client.guilds.array()).forEach(async (guild) => {
      if (!(await client.db.getGuild(guild.id)))
        await client.db.registerGuild(guild.id);
    });

    console.info(`${client.user?.tag} is reconnected!`);
    // biome-ignore lint/complexity/noForEach: <explanation>
    (await client.guilds.array()).forEach(async (guild) => {
      if (!(await client.db.getGuild(guild.id)))
        await client.db.registerGuild(guild.id);
      const guildo =   await client.db.getGuild(guild.id);
      guildo?.cache.find(c => c.name ===  "welcome");

		(channel as TextChannel).send({ content: "I'M BACK",
		});
    });
    client.on('messageCreate', (msg: Message): void => {
      if (msg.content === '!ping') {
        msg.channel.send(`Pong! WS Ping: ${client.gateway.ping}`)
      }
    })
  }

);
