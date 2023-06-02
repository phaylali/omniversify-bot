import { CommandsCollection } from "@commands/mod.ts";
import { ComponentsCollection } from "@components/mod.ts";
import { EventsCollection } from "@events/mod.ts";
import { TaprisCommand, TaprisComponent, TaprisEvent } from "@framework/mod.ts";
import { Api, Config, TaprisDbClient } from "@utils/mod.ts";
import { Client, Collection, GatewayIntents } from "harmony/mod.ts";
import { serve } from "std/http/server.ts";

export class TaprisClient extends Client {
  public commands: Collection<string, TaprisCommand>;
  public components: Collection<RegExp, TaprisComponent>;
  public events: Collection<string, TaprisEvent>;

  public botColor: string;
  public db: TaprisDbClient;
  public authorId: string;
  public serverPort: string;

  constructor(
    config: Config,
    commands: TaprisCommand[],
    events: TaprisEvent[],
    components: TaprisComponent[]
  ) {
    super();

    this.commands = new CommandsCollection(commands);
    this.components = new ComponentsCollection(components);
    this.events = new EventsCollection(events);

    this.botColor = config.botColor;
    this.authorId = config.authorId;

    this.token = config.token;
    this.serverPort = config.serverPort;

    this.events.array().forEach((event) => {
      this.on(event.name, event.run.bind(null, this));
    });

    this.db = new TaprisDbClient();
  }

  public async start() {
    await this.db.connect();

    await this.connect(this.token, [
      GatewayIntents.DIRECT_MESSAGES,
      GatewayIntents.GUILDS,
      GatewayIntents.GUILD_MESSAGES,
      GatewayIntents.GUILD_MEMBERS,
      GatewayIntents.GUILD_VOICE_STATES,
      GatewayIntents.GUILD_PRESENCES,
    ]);

    await serve(new Api(this).fetch, {
      port: Number(this.serverPort),
    });
  }

  public async getGuildsAmount(): Promise<number> {
    return await this.guilds.size();
  }

  public async updatePresence() {
    const guildsAmount = await this.getGuildsAmount();

    this.setPresence({
      name: `Serving ${guildsAmount} guild${guildsAmount != 1 ? "s" : ""}!`,
      type: 0,
    });
  }
}
