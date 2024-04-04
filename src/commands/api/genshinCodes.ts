import { OmniversifyCommand } from "@framework/mod.ts";
import {
  type ActionRowComponent,
  ButtonStyle,
  Embed,
  MessageComponentType,
} from "harmony/mod.ts";
import ky from "ky";

const ACTIVATE_GIFT_URL = "https://genshin.hoyoverse.com/en/gift";
const API_URL = "https://genshin-code.mchang.workers.dev/";
// biome-ignore lint/style/useConst: <explanation>

export interface Code {
  code: string;
  description: string;
  discovery: string;
  link: string;
}
export interface CodesResponse {
  CODES: Code[];
}
export interface getPromotionsResponse extends Array<Code> {}

interface GenshinCodesLocale {
  activateButton: string;
  embedTitle: string;
  description: string;
}

export default new OmniversifyCommand<GenshinCodesLocale>()
  .setName("genshincodes")
  .setDescription("Get valid codes for Genshin Impact")
  .setLocales({
    en: {
      activateButton: "Activate",
      embedTitle: "Codes for Genshin Impact",
      description: "NA, EU & Asia codes",
    },
    ar: {
      activateButton: "تفعيل",
      embedTitle: "كودات گنشن امپاكت",
      description: "كودات امريكا الشمالية، اسيا واوروبا",
    },
  })

  .setRun(async (client, interaction, locale) => {

    const res = await ky.get(API_URL).json();

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(locale.embedTitle)
      .setDescription(locale.description)
      .setURL(ACTIVATE_GIFT_URL);

    const withoutLast2 = res.slice(0, -2);



    // biome-ignore lint/complexity/noForEach: <explanation>
    withoutLast2.forEach((code: Code) => {
      embed.addField(
        code.code,
        code.link,true
      );
    });
    //console.log(res[0])

    const buttonsRow: ActionRowComponent = {
      type: MessageComponentType.ACTION_ROW,
      components: [
        {
          type: MessageComponentType.BUTTON,
          url: ACTIVATE_GIFT_URL,
          label: locale.activateButton,
          style: ButtonStyle.LINK,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  });
