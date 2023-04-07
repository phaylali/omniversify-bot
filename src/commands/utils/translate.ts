import { TaprisCommand } from "@framework/mod.ts";
import { LocaleRecords } from "@typings/mod.ts";
import { GTR } from "gtr/mod.ts";
import { ApplicationCommandOptionType, Embed } from "harmony/mod.ts";

interface TranslateLocale extends LocaleRecords {
  invalidLanguage: () => string;
  textIn: (language: string) => string;
  origLang: () => string;
  origMessage: () => string;
}

const gtr = new GTR();

const command = new TaprisCommand<TranslateLocale>()
  .setName("translate")
  .setDescription("Translates text")
  .setOptions(
    {
      name: "text",
      description: "Text to be translated",
      type: ApplicationCommandOptionType.STRING,
      required: true,
    },
    {
      name: "to",
      description: "Language to translate to",
      type: ApplicationCommandOptionType.STRING,
      required: true,
    },
    {
      name: "from",
      description: "Original language",
      type: ApplicationCommandOptionType.STRING,
    }
  )
  .setLocales({
    en: {
      invalidLanguage: () => "Error, language is invalid!",
      textIn: (language: string) => `Text in ${language}`,
      origLang: () => "Original language",
      origMessage: () => "Original message",
    },
    ru: {
      invalidLanguage: () => "Я не могу найти этот язык!",
      textIn: (language: string) => `Текст на ${language} языке`,
      origLang: () => "Язык оригинала",
      origMessage: () => "Оригинальное сообщение",
    },
  })
  .setRun(async (client, interaction, locale) => {
    const from: string = interaction.options.find(
      (option) => option.name === "from"
    )?.value;

    const to: string = interaction.options.find(
      (option) => option.name === "to"
    )?.value;

    const text: string = interaction.options.find(
      (option) => option.name === "text"
    )?.value;

    try {
      const response = await gtr.translate(text, {
        targetLang: to,
        sourceLang: from ? from : "auto",
      });

      await interaction.defer();

      const embed = new Embed()
        .setColor(client.botColor)
        .setTitle(locale.textIn(to))
        .setDescription(response.trans)
        .addFields(
          {
            name: locale.origLang(),
            value: response.lang,
            inline: true,
          },
          {
            name: locale.origMessage(),
            value: text,
            inline: true,
          }
        );

      return await interaction.reply({ embeds: [embed] });
    } catch {
      return await interaction.reply({
        embeds: [
          new Embed()
            .setTitle(locale.invalidLanguage())
            .setColor(client.botColor),
        ],
        ephemeral: true,
      });
    }
  });

export default command;
