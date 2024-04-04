import { commands } from "@commands/mod.ts";
import { components } from "@components/mod.ts";
import { events } from "@events/mod.ts";
import { OmniversifyClient, type OmniversifyCommand, type OmniversifyEvent, env } from "./src/mod.ts";
import ky from "ky";


// biome-ignore lint/style/noVar: <explanation>

Deno.cron("ping", "* * * * *", () => {
  // biome-ignore lint/style/noVar: <explanation>

  console.log(`Ping!!!${new Date(Date.now()).toString()}`);

});

//const API_ENDPOINT = 'YOUR_API_ENDPOINT';
//let initialData = null;

/*async function fetchInitialData() {
  const response = await ky.get(API_ENDPOINT);
  if (!response.ok) {
    console.error('Failed to fetch initial API data:', response.statusText);
    return;
  }
  initialData = await response.json();
}
*/
if (import.meta.main)
  await new OmniversifyClient(
    env,
    commands as OmniversifyCommand[],
    events as OmniversifyEvent[],
    components
  ).start();

export * from "./src/mod.ts";
