import deleteMessage from "@components/delete_message.ts";
import passwordNew from "@components/password-new.ts";
import type { OmniversifyComponent } from "@framework/mod.ts";
import { Collection } from "harmony/mod.ts";

export const components = [deleteMessage, passwordNew];

/**
 * Create a collection of components
 */
export class ComponentsCollection extends Collection<RegExp, OmniversifyComponent> {
  /**
   * Create a collection of components
   * @param components array of components to set to collection
   */
  constructor(components: OmniversifyComponent[]) {
    super();

    components.forEach((component) => this.set(component.customId, component));
  }
}
