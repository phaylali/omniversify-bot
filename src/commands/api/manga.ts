import { OmniversifyCommand } from "@framework/mod.ts";
import {
  type ActionRowComponent,
  ApplicationCommandOptionType,
  ButtonStyle,
  Embed,
  MessageComponentType,
} from "harmony/mod.ts";
import ky from "ky";

interface SearchResult {
  id: string;
  name: string;
  lastChapter: string;
  thumbnail: string;
  author: string;
  url: string;
}

interface MangaLocales {
  mangaNotFound: string;
  lastChapter: string;
  readManga: string;
}

export default new OmniversifyCommand<MangaLocales>()
  .setName("manga")
  .setDescription("Get data about manga")
  .setOptions({
    name: "query",
    description: "Query for search",
    type: ApplicationCommandOptionType.STRING,
    required: true,
  })
  .setLocales({
    en: {
      mangaNotFound: "Sorry! Manga not found! :(",
      lastChapter: "Last chapter",
      readManga: "Read manga",
    },
    ar: {
      mangaNotFound: "لاتوجد هذه المانكا :(",
      lastChapter: "اخر جزء",
      readManga: "اقرأ المانكا",
    },
  })
  .setRun(async (client, interaction, locale) => {
    const query = interaction.options.find(
      (option) => option.name === "query",
    )?.value;

    const res: SearchResult[] = await ky
      .get(`https://manga.deno.dev/api/search?q=${encodeURI(query)}`)
      .json();

    if (res.length === 0) {
      return interaction.reply({
        embeds: [
          new Embed().setColor(client.botColor).setTitle(locale.mangaNotFound),
        ],
        ephemeral: true,
      });
    }

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(res[0].name)
      .addFields({
        name: locale.lastChapter,
        value: res[0].lastChapter,
        inline: true,
      })
      .setImage(res[0].thumbnail)
      .setURL(res[0].url)
      .setAuthor({ name: res[0].author });

    const buttonsRow: ActionRowComponent = {
      type: MessageComponentType.ACTION_ROW,
      components: [
        {
          type: MessageComponentType.BUTTON,
          url: res[0].url,
          label: locale.readManga,
          style: ButtonStyle.LINK,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  });
