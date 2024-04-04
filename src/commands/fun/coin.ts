import { OmniversifyCommand } from "@framework/mod.ts";
import { type ActionRowComponent, ApplicationCommandOptionType, Embed, MessageComponentType } from "harmony/mod.ts";

type Choice = "coin" | "tail";

const choices: Choice[] = ["coin", "tail"];

interface coinLocale {
  winner: (choice: Choice) => string;
  youWonLost: (winOrNot: boolean) => string;
}

export default new OmniversifyCommand<coinLocale>()
  .setName("coin")
  .setDescription("Flip a coin")
  .setOptions({
    name: "choice",
    description: "Your selection",
    choices: [
      { name: "Coin", value: "coin" },
      { name: "Tail", value: "tail" },
    ],
    type: ApplicationCommandOptionType.STRING,
    required: true,
  })
  .setLocales({
    en: {
      winner: (choice: Choice) =>
        `Got ${choice === choices[0] ? "coin" : "tail"}`,
      youWonLost: (winOrNot: boolean) =>
        winOrNot ? "GG Copium" : "You Fucking Loser!",
    },
    ar: {
      winner: (choice: Choice) =>
        choice === choices[0] ? "راس" : "تريا",
      youWonLost: (winOrNot: boolean) =>
        winOrNot ? "بصحا, يلاه حسب الدروج" : "قودتيها",
    },
  })

  .setRun((client, interaction, locale) => {
    const choice = interaction.options.find(
      (option) => option.name === "choice",
    )?.value;

    const winner: Choice = choices[Math.floor(Math.random() * 2)];

    const embed = new Embed()
      .setTitle(locale.winner(winner))
      .setColor(winner === choice ? client.botColor : client.botColor2)
      .setDescription(locale.youWonLost(winner === choice))
      .setImage(winner === choice ? "https://i.imgur.com/onRIi79.jpeg":"https://i.imgur.com/4PPZu9Z.jpeg");

      const buttonsRow: ActionRowComponent = {
        type: MessageComponentType.ACTION_ROW,
        components: [
          {
            type: MessageComponentType.BUTTON,
            customID: `flip_coin_${choices[0]}`,
            label: `Select ${choices[0]}`,
            style: 1,
          },
          {
            type: MessageComponentType.BUTTON,
            customID: `flip_coin_${choices[1]}`,
            label: `Select ${choices[1]}`,
            style: 1,
          },
        ],
      };

    return interaction.reply({ embeds: [embed],components:[buttonsRow] });
  })

