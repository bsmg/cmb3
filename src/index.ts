import * as process from "node:process";
import * as dotenv from "dotenv";
import { ClientManager } from "./managers/client";
import { CommandManager } from "./managers/commands";
import { EventManager } from "./managers/events";
import { FilterManager } from "./managers/filters";

(async () => {
  dotenv.config();

  await EventManager.instance.setupEvents();
  await CommandManager.instance.loadCommands();
  await FilterManager.instance.setupFilters();

  await ClientManager.client.login(process.env.Token);
})();
