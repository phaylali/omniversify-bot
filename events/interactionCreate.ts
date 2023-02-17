import ExtendedClient from "@core";
import { Event } from "@interfaces/mod.ts";
import { Interaction } from "harmony/mod.ts";

const event: Event = {
  name: "interactionCreate",
  run: async (client: ExtendedClient, interaction: Interaction) => {
    if (interaction.isApplicationCommand()) {
      const command = client.commands.get(interaction.name);

      if (command) {
        if (command.guildsOnly && !interaction.guild) {
          return await interaction.reply({
            content: "Sorry, this command is only for guilds.",
            ephemeral: true,
          });
        }

        return await command.run(client, interaction).catch(async (e) => {
          console.warn(e);

          await interaction.reply("Unknown error happened!");
        });
      }
    }

    if (interaction.isMessageComponent()) {
      const component = client.components.find((component) =>
        component.customId.test(interaction.data.custom_id)
      );

      if (component) {
        return await component
          .run(client, interaction)
          ?.catch((e) => console.warn(e));
      }
    }
  },
};

export default event;
