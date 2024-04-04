import { OmniversifyComponent } from "@framework/mod.ts";

export default new OmniversifyComponent()
  .setCustomId(/delete_message/)
  .setRun((_client, interaction) => interaction.message.delete());
