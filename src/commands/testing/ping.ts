import type { CacheType, CommandInteraction } from "discord.js";
import { Interaction, SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pong");

export async function execute(interaction: CommandInteraction<CacheType>) {
  await interaction.reply("Plang");
}
