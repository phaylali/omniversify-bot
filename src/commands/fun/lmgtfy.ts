import { OmniversifyCommand } from "@framework/mod.ts";
import {
  type ActionRowComponent,
  ApplicationCommandOptionType,
  ButtonStyle,
  Embed,
  MessageComponentType,
} from "harmony/mod.ts";

interface LmgtfyLocale {
  getAnswerButton: (query: string) => string;
}

export default new OmniversifyCommand<LmgtfyLocale>()
  .setName("lmgtfy")
  .setDescription("'Let Me Google That For You' links generator")
  .setOptions({
    name: "query",
    description: "Query, to generate link",
    type: ApplicationCommandOptionType.STRING,
    required: true,
  })
  .setLocales({
    en: {
      getAnswerButton: (query: string) => `Get answer for "${query}" question`,
    },
    ar: {
      getAnswerButton: (query: string) => `ابحث عن جواب "${query}"`,
    },
  })
  .setRun((client, interaction, locale) => {
    const query = interaction.options.find(
      (option) => option.name === "query",
    )?.value;

    const link = `https://lmgtfy.app/?q=${encodeURI(query.replace(/ /g, "+"))}`;

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(link)
      .setURL(link);

    const buttonsRow: ActionRowComponent = {
      type: MessageComponentType.ACTION_ROW,
      components: [
        {
          type: MessageComponentType.BUTTON,
          url: link,
          label: locale.getAnswerButton(query),
          style: ButtonStyle.LINK,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  })
  ;
