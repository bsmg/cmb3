import { Configuration } from "./config";
import { client, commands } from "./client";
import { registerCommands } from "./commands";
import { registerEvents } from "./events";

Configuration.Init();

registerCommands();
registerEvents();

client.login(Configuration.config.token);