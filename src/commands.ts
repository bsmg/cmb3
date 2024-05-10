import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import { commands as clientCommands } from "./client";
import { Configuration } from "./config";

export async function registerCommands() {
  clientCommands.clear();

  const rest = new REST().setToken(Configuration.config.token);

  const commandDir = join(__dirname, "commands");

  const categoryDirsUnfiltered = await readdir(commandDir);
  const categoryDirs = categoryDirsUnfiltered.filter(async (x) => {
    const category = (await stat(join(commandDir, x)));
    return category.isDirectory();
  });

  const commands = [];

  categoryDirs.map(async (category): Promise<void> => {
    const filesUnfiltered = await readdir(join(commandDir, category));
    const files = filesUnfiltered.filter(x => x.endsWith(".ts"));
  })

  const [commandFiles] = await Promise.all(
    categoryDirs.map(async (category) => {
      const filesUnfiltered = await readdir(join(commandDirs, category));
      return filesUnfiltered.filter(x => x.endsWith(".ts"));
    })
  );

  for (const category of categoryDirs) {
    const files = await readdir(join(commandDirs, category));
  }

  await rest.put(Routes.applicationCommands(Configuration.config.clientId), {
    body: commands,
  });
}
