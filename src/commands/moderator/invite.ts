/* eslint-disable unicorn/consistent-function-scoping */
import * as process from "node:process";
import { EmbedBuilder } from "@discordjs/builders";
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
        .setDescription("Add a guild id to the whitelist.")
        .addStringOption((option) =>
          option
            .setName("id")
            .setDescription("The guild id to be added to the whitelist.")
            .setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Remove a guild id from the whitelist.")
        .addStringOption((option) =>
          option
            .setName("id")
            .setDescription("The guild id to be removed from the whitelist.")
            .setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("get")
        .setDescription("Gets a guild's id from an invite url")
        .addStringOption((option) =>
          option
            .setName("code")
            .setDescription("The guild invite code to get the id from.")
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
      case "get":
        await this.handleGetInvite(interaction, options);
        break;
      // id ? interaction.reply(`Guild found!`)
    }
  }

  private async handleGetInvite(
    interaction: CommandInteraction<CacheType>,
    options: CommandInteractionOptionResolver,
  ) {
    const code = options.getString("code") as string;
    const guildInfo = await this.getGuildFromCode(code);

    if (!guildInfo.guild) {
      await interaction.reply({
        content: `Failed to get guild info for \`${code}\``,
        ephemeral: true,
      });

      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(`Invite Found: ${guildInfo.guild.name}`)
      .setColor(0x00ff00)
      .addFields(
        {
          name: "Invite",
          value: `https://discord.gg/${code}`,
          inline: false
        },
        {
          name: "Expires",
          value: guildInfo.expires_at ? `<t:${Date.parse(guildInfo.expires_at) / 1_000}>` : "Never",
          inline: false
        },
        { 
          name: "ID", 
          value: guildInfo.guild.id, 
          inline: false 
        },
        {
          name: "Description",
          value: guildInfo.guild.description ?? "No description",
          inline: false,
        },
        {
          name: "Members",
          value: Number(guildInfo.approximate_member_count).toLocaleString(),
          inline: false
        }
      )
      .setThumbnail(
        Constants.guildIcon(guildInfo.guild_id, guildInfo.guild.icon),
      );

    await interaction.reply({
      embeds: [embed],
    });
  }

  private async getGuildFromCode(code: string) {
    const inviteData = await fetch(Constants.guildInvite(code));
    return JSON.parse(await inviteData.text());
  }
}
