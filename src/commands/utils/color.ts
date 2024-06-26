import { OmniversifyCommand } from "@framework/mod.ts";
import { createCanvas } from "canvas/mod.ts";
import {
  ApplicationCommandOptionType,
  Embed,
  MessageAttachment,
} from "harmony/mod.ts";

export default new OmniversifyCommand()
  .setName("color")
  .setDescription("Shows color or generates color")
  .setOptions({
    name: "string",
    description: "Color to be shown",
    type: ApplicationCommandOptionType.STRING,
    required: false,
  })
  .setRun(async (client, interaction) => {
    await interaction.defer();

    let colorString: string = interaction.options.find(
      (option) => option.name === "string",
    )?.value;

    if (!colorString) {
      const hexCharset = "ABCDEF0123456789";

      colorString = "#";

      for (let i = 0, n = hexCharset.length; i < 6; ++i) {
        colorString += hexCharset.charAt(Math.floor(Math.random() * n));
      }
    }

    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = colorString;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "50px monospace";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Lorem ipsum", 85, 200);
    ctx.font = "50px monospace";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText("Lorem ipsum", 85, 350);

    const embed = new Embed()
      .setTitle(colorString)
      .setImage("attachment://ColorHexSend.png")
      .attach(
        new MessageAttachment("ColorHexSend.png", canvas.toBuffer("image/png")),
      );

    try {
      embed.setColor(colorString);
    } catch {
      embed.setColor(client.botColor);
    }

    embed;

    return await interaction.reply({ embeds: [embed] });
  });
