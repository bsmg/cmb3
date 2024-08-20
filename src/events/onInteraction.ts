import type { CacheType, Interaction } from "discord.js";
import { Events } from "discord.js";
import type { IEvent } from "../interfaces/event";
import { CommandManager } from "../managers/commands";

export default class OnInteraction implements IEvent<Events.InteractionCreate> {
  public readonly eventName = Events.InteractionCreate;

  public async listener(interaction: Interaction<CacheType>) {
    if (!interaction.isChatInputCommand()) return;

    const command = CommandManager.instance.getCommand(interaction.commandName);
    if (!command)
      throw new Error("Command not found for: " + interaction.commandName);

    await command.execute(interaction);
  }
}
