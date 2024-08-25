import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { Constants } from "../constants";
import type { ICommand } from "../interfaces/command";

export default class Pick implements ICommand {
  public readonly builder = new SlashCommandBuilder()
    .setName("pick")
    .setDescription('Picks a random option from list separated by ""`')
    .addStringOption((input) =>
      input
        .setName("options")
        .setDescription("The options to be selected from")
        .setRequired(true),
    )
    .setDMPermission(true);

  public readonly roleIds = [...Constants.allRoles];

  public async execute(interaction: CommandInteraction<CacheType>) {
    const optionsStr = (
      interaction.options as CommandInteractionOptionResolver
    ).getString("options");

    if (!optionsStr) {
      await interaction.reply("No options provided");
      return;
    }

    const options = optionsStr.split("|");
    const choice = Math.floor(Math.random() * options.length);

    await interaction.reply(options[choice]);
  }
}
