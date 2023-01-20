import ExtendedClient from "@core";
import { ClientEvents, Message } from "harmony";

type EventName = keyof ClientEvents;
type Args = ClientEvents[EventName];

interface Run {
  (
    client: ExtendedClient,
    // TODO: remove any here by fixing Args type
    // deno-lint-ignore no-explicit-any
    ...args: any[]
  ): //...args: Args
  Promise<Message | undefined | void> | Message | undefined | void;
}

export interface Event {
  name: EventName;
  run: Run;
}
