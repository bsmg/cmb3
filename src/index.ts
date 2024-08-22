import * as process from "node:process";
import * as dotenv from "dotenv";
import { ClientManager } from "./managers/client";
import { CommandManager } from "./managers/commands";
import { EventManager } from "./managers/events";
import { FilterManager } from "./managers/filters";
// import { PostgresManager } from "./managers/postgres";

(async () => {
  dotenv.config();

  // await PostgresManager.instance.setup();
  await EventManager.instance.setupEvents();
  await CommandManager.instance.loadCommands();
  await FilterManager.instance.setupFilters();

  await ClientManager.instance.client.login(process.env.Token);
})();
