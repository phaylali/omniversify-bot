import { TaprisCommand } from "@framework/mod.ts";
import { ApplicationCommandOptionType, Embed } from "harmony/mod.ts";

interface UnbanLocale {
  success: string;
}

export default new TaprisCommand<UnbanLocale>()
  .setName("unban")
  .setDescription("Unban selected user")
  .setOptions(
    {
      name: "userId",
      description: "User id to be unbanned",
      type: 4,
      required: true,
    },
    {
      name: "reason",
      description: "Reason for kick",
      type: ApplicationCommandOptionType.STRING,
      required: true,
    }
  )
  .setLocales({
    en: {
      success: "User got unbanned",
    },
    ru: {
      success: "User got unbanned",
    },
  })
  .setGuildOnly()
  .setRun(async (client, interaction, locale) => {
    const userId: string = interaction.options.find(
      (option) => option.name == "userId"
    )?.value;
    const reason: string | undefined = interaction.options.find(
      (option) => option.name == "reason"
    )?.value;

    await interaction.guild!.bans.remove(userId, reason);

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(locale.success);

    return interaction.reply({ embeds: [embed] });
  });
