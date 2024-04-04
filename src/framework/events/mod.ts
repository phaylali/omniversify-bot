import type { OmniversifyClient } from "@core/mod.ts";
import type {
  ApplicationCommandInteraction,
  ClientEvents,
  Interaction,
  Message,
} from "harmony/mod.ts";

export type EventName = keyof ClientEvents;
export type EventArgs<T extends EventName> = ClientEvents[T];

export type EventRun<T extends EventName> = (
  client: OmniversifyClient,
  ...args: EventArgs<T>
) =>
  | Promise<
      ApplicationCommandInteraction | Interaction | Message | undefined | void
    >
  | Message
  | undefined
  | void;

/**
 * Event builder used in Omniversify
 */
export class OmniversifyEvent<T extends EventName = EventName> {
  name!: T;
  run!: EventRun<T>;

  /**
   * Set name for event
   * @param name Name for event
   * @returns this
   */
  public setName(name: T) {
    this.name = name;

    return this;
  }

  /**
   * Set run function
   * @param run Function to be run
   * @returns this
   */
  public setRun(run: EventRun<T>) {
    this.run = run;

    return this;
  }
}
