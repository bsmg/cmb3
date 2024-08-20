import * as fs from "node:fs/promises";
import * as path from "node:path";
import process from "node:process";

export class Configuration {
  private static _instance: Configuration;
  private static readonly _configPath = path.join(
    __dirname,
    "..",
    "configuration.json",
  );

  public static get instance() {
    if (!this._instance) this._instance = new Configuration();

    return this._instance;
  }

  public token = "";
  public clientId = "";
  public botLogChannel = "";
  public testId = "";

  private static readonly _default = {
    token: "null",
    clientId: "null",
    botLogChannel: "null",
    testId: "null"
  };

  public static async setup() {
    try {
      console.log("Attempting to access config");
      await fs.access(this._configPath, fs.constants.R_OK | fs.constants.W_OK);
      console.log("Accessed config, continuing setup");

      const configData = await fs.readFile(this._configPath, {
        encoding: "utf8",
      });
      const config = JSON.parse(configData);

      this.instance.token = config.token;
      this.instance.clientId = config.clientId;
      this.instance.botLogChannel = config.bogLogChannel;
      this.instance.testId = config.testId;
    } catch {
      console.log("Configuration not found. Creating default and exiting app.");
      await fs.writeFile(
        this._configPath,
        JSON.stringify(this._default, null, 4),
      );
      process.exit(0);
    }
  }
}
