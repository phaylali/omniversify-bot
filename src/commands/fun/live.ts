import { OmniversifyCommand } from "@framework/mod.ts";
import {
  type ActionRowComponent,
  ButtonStyle,
  Embed,
  MessageComponentType,
} from "harmony/mod.ts";

const KICK = "https://kick.com/phaylali";
const TWITCH = "https://twitch.tv/phaylali/";
const TROVO = "https://trovo/s/phaylali";
const YOUTUBE = "https://youtube.com/@phaylali/";

export default new OmniversifyCommand()
  .setName("live")
  .setDescription("streaming on Kick, Twitch, Trovo and Youtube")
  .setRun((client, interaction) => {
    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle("Phaylali is Live")
      .setDescription(
        "streaming on Kick, Twitch, Trovo and Youtube",
      )
      .addFields(
        { name: "TWITCH", value: TWITCH, inline: true },
        { name: "KICK", value: KICK, inline: true },
        { name: "YOUTUBE", value: YOUTUBE, inline: true },
        { name: "TROVO", value: TROVO, inline: true },
      );



    return interaction.reply('<@&1222329943996764344>',{ embeds: [embed], });
  });
