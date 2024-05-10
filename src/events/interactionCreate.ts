import type { CacheType, Interaction } from "discord.js";
import { commands } from "../client";

export const event = async (interaction: Interaction<CacheType>) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command)
    throw new Error("Command not found for: " + interaction.commandName);

  await command(interaction);
};
