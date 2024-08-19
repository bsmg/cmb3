import type {
  CacheType,
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";

export interface ICommand {
  builder: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (interaction: CommandInteraction<CacheType>) => Promise<void>;
}
