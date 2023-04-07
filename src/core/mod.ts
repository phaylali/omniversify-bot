import GetCommands from "@commands/mod.ts";
import GetComponents from "@components/mod.ts";
import GetEvents from "@events/mod.ts";
import { TaprisCommand, TaprisComponent, TaprisEvent } from "@framework/mod.ts";
import api from "@utils/api.ts";
import env from "@utils/config.ts";
import DBManagerBuilder from "@utils/db.ts";
import { Client, Collection, GatewayIntents } from "harmony/mod.ts";
import { serve } from "std/http/server.ts";

export class TaprisClient extends Client {
  public commands: Collection<string, TaprisCommand<undefined>> =
    new Collection();
  public components: Collection<RegExp, TaprisComponent> = new Collection();
  public events: Collection<string, TaprisEvent> = new Collection();
  private env = env;
  public botColor = env.BOT_COLOR ? env.BOT_COLOR : "#97aee8";
  public db = new DBManagerBuilder({
    hostname: env.DATABASE_HOSTNAME,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE,
    port: env.DATABASE_PORT,
  });

  public async init() {
    GetCommands(this);
    GetEvents(this);
    GetComponents(this);

    await this.db
      .sync()
      .catch(() => console.warn("Error creating tables for database!"));
    await this.db
      .connect()
      .catch(() => console.warn("Failed to connect to database using TCP!"));

    await this.connect(this.env.BOT_TOKEN, [
      GatewayIntents.DIRECT_MESSAGES,
      GatewayIntents.GUILDS,
      GatewayIntents.GUILD_MESSAGES,
      GatewayIntents.GUILD_MEMBERS,
      GatewayIntents.GUILD_VOICE_STATES,
      GatewayIntents.GUILD_PRESENCES,
    ]);

    await serve(new api(this).fetch, {
      port: Number(env.SERVER_PORT),
    });
  }

  public async updatePresence() {
    const guildsAmount = (await this.guilds.array()).length;

    this.setPresence({
      name: `Serving ${guildsAmount} guild${guildsAmount != 1 ? "s" : ""}!`,
      type: 0,
    });
  }
}
