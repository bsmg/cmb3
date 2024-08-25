import type { CacheType, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { Constants } from "../constants";
import type { ICommand } from "../interfaces/command";

export default class Ping implements ICommand {
  public readonly builder = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("pong");

  public readonly roleIds = [...Constants.allRoles];

  public async execute(interaction: CommandInteraction<CacheType>) {
    await interaction.reply("pong!");
  }
}
