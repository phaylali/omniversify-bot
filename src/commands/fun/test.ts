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
  .setName("test")
  .setDescription("Testing Commands")
  .setRun((client, interaction) => {
    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle("Testing new commands")
      .setDescription(
        "this is a test subject",
      )
      .addFields(
        { name: "TWITCH", value: TWITCH, inline: true },
        { name: "KICK", value: KICK, inline: true },
        { name: "YOUTUBE", value: YOUTUBE, inline: true },
        { name: "TROVO", value: TROVO, inline: true },
      );



    return interaction.reply('<@&1222329943996764344>',{ embeds: [embed], });
  });
