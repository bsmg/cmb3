import { ClientManager } from "./client";
import { CommandManager } from "./commands";
import { Configuration } from "./configuration";
import { EventManager } from "./events";

(async () => {
  await Configuration.setup(); // must run first to load config, spent a good 30 mins trying to figure out why nothing worked :/

  await EventManager.instance.setupEventsAsync();
  await CommandManager.instance.loadCommandsAsync();

  await ClientManager.instance.client.login(Configuration.instance.token);
})();
