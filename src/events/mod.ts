import { TaprisClient } from "@core/mod.ts";
import guildCreate from "@events/guildCreate.ts";
import guildDelete from "@events/guildDelete.ts";
import interactionCreate from "@events/interactionCreate.ts";
import ready from "@events/ready.ts";
import reconnect from "@events/reconnect.ts";

const events = [ready, interactionCreate, guildCreate, guildDelete, reconnect];

export const getEvents = (client: TaprisClient) =>
  events.forEach((event) => {
    client.events.set(event.name, event);
    client.on(event.name, event.run.bind(null, client));
  });
