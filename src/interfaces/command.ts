import type {
  CacheType,
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

export interface ICommand {
  builder:
    | SlashCommandBuilder
    | SlashCommandOptionsOnlyBuilder
    | SlashCommandSubcommandsOnlyBuilder;
  execute: (interaction: CommandInteraction<CacheType>) => Promise<void>;
}
