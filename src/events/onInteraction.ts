import * as process from "node:process";
import type { CacheType, GuildMember, Interaction } from "discord.js";
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

    const member = interaction.member as GuildMember;
    const roles = command.roleIds;

    if (process.env.Debug === "true")
      roles.push(process.env.TestRoleId as string);

    await (member.roles.cache.hasAny(...command.roleIds)
      ? command.execute(interaction)
      : interaction.reply({
          content: "You don't have permission to use this command!",
          ephemeral: true,
        }));
  }
}
