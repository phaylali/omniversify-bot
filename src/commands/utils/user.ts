import { TaprisCommand } from "@framework/mod.ts";
import { LocaleRecords } from "@typings/mod.ts";
import { ApplicationCommandOptionType, Embed } from "harmony/mod.ts";

interface UserLocale extends LocaleRecords {
  unknownError: () => string;
  bot: () => string;
}

const command = new TaprisCommand<UserLocale>()
  .setName("user")
  .setDescription("Sends user information")
  .setOptions({
    name: "user",
    description: "User to be shown",
    type: ApplicationCommandOptionType.USER,
    required: true,
  })
  .setLocales({
    en: {
      unknownError: () => "Unknown error happened! :(",
      bot: () => "`bot`",
    },
    ru: {
      unknownError: () => "Произошла неизвестная ошибка! :(",
      bot: () => "`бот`",
    },
  })
  .setRun(async (client, interaction, locale) => {
    const user = await client.users.get(
      interaction.options.find((option) => option.name === "user")?.value,
    );

    if (!user) {
      return interaction.reply({
        embeds: [
          new Embed().setColor(client.botColor).setTitle(locale.unknownError()),
        ],
        ephemeral: true,
      });
    }

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(`${user.tag} ${user.bot ? locale.bot() : ""}`)
      .setThumbnail(user.avatarURL())
      .setURL(`https://discord.com/users/${user.id}`)
      .addFields({ name: "ID", value: user.id, inline: true });

    return interaction.reply({ embeds: [embed] });
  });

export default command;
