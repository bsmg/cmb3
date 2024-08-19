import type { CacheType, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import type { ICommand } from "../interfaces/command";

export default class Ping implements ICommand {
  public readonly builder: SlashCommandBuilder = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("pong");

  public async execute(interaction: CommandInteraction<CacheType>) {
    await interaction.reply("pong!");
  }
}
