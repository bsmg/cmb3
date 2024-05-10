import { promises as fsPromises } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";

export class Configuration {
  private static readonly defaultConfig = {
    token: "App token",
    logsChannel: "Spam channel ID",
    clientId: "Client ID",
    guildId: "Guild ID",
  };

  public static config = {
    token: "",
    logsChannel: "",
    clientId: "",
    guildId: "",
  };

  public static async Init() {
    const rootPath = path.join(__dirname, "..");
    const configPath = path.join(rootPath, "config.json");
    const templateConfigPath = path.join(rootPath, "config.template.json");

    if (!await AccessPath(configPath)) {
      if (!await AccessPath(templateConfigPath)) {
        await writeFile(
          templateConfigPath,
          JSON.stringify(Configuration.defaultConfig, null, 4)
        );
      }

      throw new Error(
        "Config not found, please update the `config.template.json` and rename it to `config.json` to continue",
      );
    }

    Configuration.config = JSON.parse(
      await readFile(configPath, { encoding: "ascii" }),
    );

    if (typeof Configuration.config.token !== "string")
      throw new Error("Config value `token` is not of type `string`");
    if (typeof Configuration.config.logsChannel !== "string")
      throw new Error("Config value `logsChannel` is not of type `string`");
    if (typeof Configuration.config.clientId !== "string")
      throw new Error("Config value `clientId` is not of type `string`");
    if (typeof Configuration.config.guildId !== "string")
      throw new Error("Config value `guildId` is not of type `string`");
  }
}

async function AccessPath(path: string): Promise<boolean> {
  try {
    await fsPromises.access(path);
    return true;
  }
  catch {
    return false;
  }
}