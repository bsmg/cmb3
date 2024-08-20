import type { CacheType, CommandInteraction, GuildMember } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { Constants } from "../constants";
import { resolveAnyRole } from "../helpers/resolveAnyRole";
import type { ICommand } from "../interfaces/command";

export default class Macros implements ICommand {
  public readonly builder = new SlashCommandBuilder()
    .setName("macros")
    .setDescription("Returns the macros page url");

  public async execute(interaction: CommandInteraction<CacheType>) {
    if (
      !resolveAnyRole(interaction.member as GuildMember, [
        ...Constants.allRoles,
        Constants.testId,
      ])
    ) {
      await interaction.reply({
        content: "You don't have permission to use this command!",
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: "All macros can be found at: https://macros.bsmg.dev",
      ephemeral: true,
    });
  }
}
