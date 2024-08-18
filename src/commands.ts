import { access } from "node:fs/promises";
import * as path from "node:path";
import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import type { SlashCommandBuilder } from "discord.js";
import { REST, Routes } from "discord.js";
import { Configuration } from "./configuration";

export class CommandsManager {
  private static _instance: CommandsManager;
  private _commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
  private readonly _commandsPath = path.join(__dirname, "commands");

  public static get instance() {
    if (!this._instance) this._instance = new CommandsManager();
    return this._instance;
  }

  public registerCommand(command: SlashCommandBuilder) {
    console.log(`Registering ${command.name}`);
    this._commands.push(command.toJSON());
  }

  public async loadCommandsAsync() {
    this._commands = [];

    try {
      console.log("Attempting to load commands");
      await access(this._commandsPath);
    } catch {}
  }

  public async refreshCommandsAsync() {
    console.log("Refreshing all commands!");

    const rest = new REST().setToken(Configuration.instance.token);
    await rest.put(
      Routes.applicationCommands(Configuration.instance.clientId),
      { body: this._commands },
    );

    console.log("Refreshed all commands");
  }
}
