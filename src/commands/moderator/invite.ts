/* eslint-disable unicorn/consistent-function-scoping */
import * as process from "node:process";
import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { Constants } from "../../constants";
import type { ICommand } from "../../interfaces/command";
// import { PostgresManager } from "../../managers/postgres";

export default class Invite implements ICommand {
  public readonly builder = new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Interact with the invite filter.")
    .setDMPermission(false)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Add a server id to the whitelist.")
        .addStringOption((option) =>
          option
            .setName("id")
            .setDescription("The server id to be added to the whitelist.")
            .setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Remove a server id from the whitelist.")
        .addStringOption((option) =>
          option
            .setName("id")
            .setDescription("The server id to be removed from the whitelist.")
            .setRequired(true),
        ),
    );

  public readonly roleIds = [
    Constants.adminId,
    Constants.moderatorId,
    process.env.TestRoleId as string,
  ];

  public async execute(interaction: CommandInteraction<CacheType>) {
    const options = interaction.options as CommandInteractionOptionResolver;

    switch (options.getSubcommand()) {
      case "add":
      // PostgresManager.instance.pool.query(``)
    }
  }
}
