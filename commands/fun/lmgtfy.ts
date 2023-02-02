import { Command } from "@types";
import { ActionRowComponent, Embed } from "harmony";

const commandLocales = {
  en: {
    getAnswerButton: (query: string) => `Get answer for "${query}" question`,
  },
  ru: {
    getAnswerButton: (query: string) => `Получить ответ на вопрос "${query}"`,
  },
};

const command: Command = {
  name: "lmgtfy",
  description: "'Let Me Google That For You' links generator",
  options: [
    {
      name: "query",
      description: "Query, to generate link",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const query = interaction.options.find(
      (option) => option.name == "query",
    )?.value;

    const locales = (await client.db.selectLocale(
      interaction.guild?.id,
      commandLocales,
    )) as typeof commandLocales.en;

    const link = `https://lmgtfy.app/?q=${encodeURI(query.replace(/ /g, "+"))}`;

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle(link)
      .setURL(link);

    const buttonsRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 2,
          url: link,
          label: locales.getAnswerButton(query),
          style: 5,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  },
};

export default command;
