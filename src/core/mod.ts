import { CommandsCollection } from "@commands/mod.ts";
import { ComponentsCollection } from "@components/mod.ts";
import { EventsCollection } from "@events/mod.ts";
import type { OmniversifyCommand, OmniversifyComponent, OmniversifyEvent } from "@framework/mod.ts";
import { type Env, OmniversifyDbClient } from "@utils/mod.ts";
import { Client, type Collection, GatewayIntents } from "harmony/mod.ts";

export class OmniversifyClient extends Client {
  public commands: Collection<string, OmniversifyCommand>;
  public components: Collection<RegExp, OmniversifyComponent>;
  public events: Collection<string, OmniversifyEvent>;

  public botColor: string;
  public botColor2: string;
  public db: OmniversifyDbClient;
  public authorId: string;

  constructor(
    env: Env,
    commands: OmniversifyCommand[],
    events: OmniversifyEvent[],
    components: OmniversifyComponent[]
  ) {
    super();

    this.commands = new CommandsCollection(commands);
    this.components = new ComponentsCollection(components);
    this.events = new EventsCollection(events);

    this.botColor = env.COLOR_GREEN;
    this.botColor2 = env.COLOR_RED;
    this.authorId = env.AUTHOR_ID;

    this.token = env.BOT_TOKEN;

    this.events.array().forEach((event) =>
      // deno-lint-ignore no-explicit-any
      this.on(event.name, event.run.bind(null, this) as any)
    );

    this.db = new OmniversifyDbClient();
  }

  /**
   * Start bot
   */
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
  }

  /**
   * Get amount of guilds
   * @returns Size of guild
   */
  public async getGuildsAmount(): Promise<number> {
    return await this.guilds.size();
  }

  /**
   * Updates presence
   */
  public async updatePresence() {
    const guildsAmount = await this.getGuildsAmount();

    this.setPresence({
      name: `Serving ${guildsAmount} guild${guildsAmount != 1 ? "s" : ""}!`,
      type: 0,
    });
  }
}
