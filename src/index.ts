import { client } from "./client";
import { registerCommands } from "./commands";
import { Configuration } from "./config";
import { registerEvents } from "./events";

(async () => {
  Configuration.Init();
  await registerCommands();
  registerEvents();

  await client.login(Configuration.config.token);
})();
