import type { CacheType, GuildMember, Interaction } from "discord.js";
import { Events } from "discord.js";
import { memberHasAnyRole } from "../helpers/roles";
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

    const memberHasRole = memberHasAnyRole(member, roles);

    if (memberHasRole) {
      await command.execute(interaction);
      return;
    }

    await interaction.reply({
      content: "You don't have permission to use this command!",
      ephemeral: true,
    });
  }
}
