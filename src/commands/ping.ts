import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong")

export async function execute(interaction: CommandInteraction) {
    await interaction.reply("Plang");
}