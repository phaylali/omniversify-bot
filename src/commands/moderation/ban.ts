import { OmniversifyCommand } from "@framework/mod.ts";
import {
  ApplicationCommandOptionType,
  Embed,
  PermissionFlags,
} from "harmony/mod.ts";

interface BanLocale {
  success: (userTag: string) => string;
  failure: (userTag: string) => string;
}

export default new OmniversifyCommand<BanLocale>()
  .setName("ban")
  .setDescription("Ban selected member")
  .setOptions(
    {
      name: "member",
      description: "Member to be kicked",
      type: ApplicationCommandOptionType.USER,
      required: true,
    },
    {
      name: "reason",
      description: "Reason for kick",
      type: ApplicationCommandOptionType.STRING,
      required: true,
    },
  )
  .setMemberPermissions(PermissionFlags.BAN_MEMBERS)
  .setLocales({
    en: {
      success: (userTag: string) => `${userTag} got banned`,
      failure: (userTag: string) => `You can't ban ${userTag}`,
    },
    ar: {
      success: (userTag: string) => `${userTag} تم حضره`,
      failure: (userTag: string) => `لا تستطيع حظر ${userTag}`,
    },
  })
  .setGuildOnly()
  .setRun(async (client, interaction, locale) => {
    const member = await interaction.guild?.members.fetch(
      interaction.options.find((option) => option.name === "member")?.value,
    );
    const reason: string | undefined = interaction.options.find(
      (option) => option.name === "reason",
    )?.value;

    if (!(await member!.bannable(interaction.member))) {
      return interaction.reply({
        embeds: [
          new Embed()
            .setColor(client.botColor)
            .setTitle(locale.failure(member!.user.tag)),
        ],
        ephemeral: true,
      });
    }

    await member!.ban(reason);

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(locale.success(member!.user.tag));

    return interaction.reply({ embeds: [embed] });
  });
