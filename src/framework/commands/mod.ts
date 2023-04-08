import { TaprisClient } from "@core/mod.ts";

import {
  ApplicationCommandInteraction,
  ApplicationCommandOption,
  SlashCommandInteraction,
} from "harmony/mod.ts";

export type LocaleNames = "en" | "ru";
// deno-lint-ignore no-explicit-any
export type LocaleFunction = (...args: any[]) => string;
export type LocaleRecords = Record<string, LocaleFunction>;
export type Locales = Record<LocaleNames, LocaleRecords>;

export class TaprisCommand<T extends LocaleRecords | undefined> {
  name = "";
  description = "";
  options: ApplicationCommandOption[] = [];
  guildOnly = false;

  run!: (
    client: TaprisClient,
    interaction: SlashCommandInteraction,
    locale: T
  ) => Promise<ApplicationCommandInteraction | undefined>;
  locales: Record<LocaleNames, T> | undefined;

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public setDescription(description: string) {
    this.description = description;
    return this;
  }

  public setOptions(...options: ApplicationCommandOption[]) {
    this.options = options;
    return this;
  }

  public addOption(option: ApplicationCommandOption) {
    this.options = [...this.options, option];
    return this;
  }

  public setRun(run: typeof this.run) {
    this.run = run;
    return this;
  }

  public setLocales(locales: Record<LocaleNames, T>) {
    this.locales = locales;
    return this;
  }

  public setGuildOnly(guildOnly = true) {
    this.guildOnly = guildOnly;
    return this;
  }
}