import { OmniversifyCommand } from "@framework/mod.ts";
import {
  ApplicationCommandOptionType,
  type GuildTextChannel,
  PermissionFlags,
} from "harmony/mod.ts";

interface ClearLocale {
  bigRequest: string;
  smallNumber: string;
  oldMessages: string;
  deletedNMessages: (n: number) => string;
}

export default new OmniversifyCommand<ClearLocale>()
  .setName("clear")
  .setDescription("Clear messages in chat")
  .setOptions({
    name: "amount",
    description: "Amount of messages to be deleted",
    type: ApplicationCommandOptionType.NUMBER,
    required: true,
  })
  .setMemberPermissions(PermissionFlags.MANAGE_MESSAGES)
  .setLocales({
    en: {
      bigRequest: "I can't delete more than 100 posts at a time!",
      smallNumber: "You need to enter a number greater than 1!",
      oldMessages: "I can't delete messages older than 14 days!",
      deletedNMessages: (n: number) => `Deleted ${n} messages!`,
    },
    ar: {
      bigRequest: "لا أستطيع محو اكثر من 100 منشور!",
      smallNumber: "يجب ان تكتب عدد اكثر من 1!",
      oldMessages: "لا أستطيع محو رسائل اقدم من 14 يوم!",
      deletedNMessages: (n: number) => `رسائل ${n} تم محوها!`,
    },
  })
  .setGuildOnly()
  .setRun(async (_client, interaction, locale) => {
    const amount: number = interaction.options.find(
      (option) => option.name === "amount",
    )?.value;

    const channel = interaction.channel as GuildTextChannel;

    if (amount > 100) {
      return await interaction.reply({
        content: locale.bigRequest,
        ephemeral: true,
      });
    }
    if (amount < 1) {
      return await interaction.reply({
        content: locale.smallNumber,
        ephemeral: true,
      });
    }

    channel
      .bulkDelete(amount)
      .catch(
        async () =>
          await interaction.reply({
            content: locale.oldMessages,
            ephemeral: true,
          }),
      )
      .then(
        async () =>
          await interaction.reply({
            content: locale.deletedNMessages(amount),
            ephemeral: true,
          }),
      );
  });
