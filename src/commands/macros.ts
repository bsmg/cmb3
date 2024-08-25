import type { CacheType, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { Constants } from "../constants";
import type { ICommand } from "../interfaces/command";

export default class Macros implements ICommand {
  public readonly builder = new SlashCommandBuilder()
    .setName("macros")
    .setDescription("Returns the macros page url");

  public readonly roleIds = [...Constants.allRoles];

  public async execute(interaction: CommandInteraction<CacheType>) {
    await interaction.reply({
      content: "All macros can be found at: https://macros.bsmg.dev",
      ephemeral: true,
    });
  }
}
