import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as process from "node:process";
import { Collection, REST, Routes } from "discord.js";
import type { ICommand } from "../interfaces/command";

export class CommandManager {
  private static _instance: CommandManager;
  private _commands: Collection<string, ICommand> = new Collection<
    string,
    ICommand
  >();
  private readonly _commandsPath = path.join(__dirname, "..", "commands");

  public static get instance() {
    if (!this._instance) this._instance = new CommandManager();
    return this._instance;
  }

  private registerCommand(command: ICommand) {
    console.log(`Registering ${command.builder.name}`);
    this._commands.set(command.builder.name, command);
  }

  public getCommand(commandName: string) {
    return this._commands.get(commandName);
  }

  public async loadCommands() {
    this._commands.clear();

    let files = await fs.readdir(this._commandsPath, {
      withFileTypes: true,
    });

    const directoryPromises = files
      .filter((x) => x.isDirectory())
      .map(async (dir) => {
        const dirFiles = await fs.readdir(
          path.join(this._commandsPath, dir.name),
          {
            withFileTypes: true,
          },
        );

        files.push(...dirFiles);
      });

    await Promise.all(directoryPromises);

    files = files.filter((x) => x.isFile() && x.name.endsWith(".ts"));

    const commandPromises = files.map(async (file) => {
      const module = await import(path.join(file.parentPath, file.name));

      if (module.default) {
        const instance = new module.default() as ICommand;
        this.registerCommand(instance);
      }
    });

    await Promise.all(commandPromises);

    await this.refreshCommandsAsync();
  }

  private async refreshCommandsAsync() {
    console.log("Refreshing all commands!");

    const rest = new REST().setToken(process.env.Token as string);
    await rest.put(Routes.applicationCommands(process.env.ClientId as string), {
      body: this._commands.map((x) => x.builder.toJSON()),
    });

    console.log("Refreshed all commands");
  }
}
