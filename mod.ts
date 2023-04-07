import Client from "@core";

if (import.meta.main) await new Client().init();

export * from "@framework/mod.ts";
export * from "@typings/mod.ts";
export * from "@utils/mod.ts";
export { Client };

