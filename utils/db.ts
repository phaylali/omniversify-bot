import { LocaleNames } from "@interfaces/Locales.ts";
import { Client as PostgresClient } from "postgres/mod.ts";

interface Guild {
  id: number;
  language: LocaleNames;
}

class DBManagerBuilder extends PostgresClient {
  public async postInit() {
    await this.connect();
  }

  public async getGuildLanguage(id?: string) {
    if (!id) return "en";

    const guild = await this.queryObject<Guild>(
      `select language from Guild where id = ${id};`,
    );

    return guild.rows.length ? guild.rows[0] : "en";
  }

  public async sync() {
  }
}

export default DBManagerBuilder;
