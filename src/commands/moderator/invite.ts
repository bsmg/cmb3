/* eslint-disable unicorn/consistent-function-scoping */
import { EmbedBuilder } from "@discordjs/builders";
import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { Constants } from "../../constants";
import { getGuildFromCode } from "../../helpers/invite";
import type { ICommand } from "../../interfaces/command";
import { PrismaManager } from "../../managers/prisma";

export default class Invite implements ICommand {
  public readonly builder = new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Interact with the invite filter.")
    .setDMPermission(false)
    .addSubcommandGroup((subcommandGroup) =>
      subcommandGroup
        .setName("add")
        .setDescription("Add a guild to the whitelist.")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("code")
            .setDescription(
              "Add guild from invite code, returns simple information about the guild.",
            )
            .addStringOption((option) =>
              option
                .setName("content")
                .setDescription(
                  "The guild invite code to be added to the whitelist.",
                )
                .setRequired(true),
            ),
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("id")
            .setDescription(
              "Add guild from invite code, unable to return guild information.",
            )
            .addStringOption((option) =>
              option
                .setName("content")
                .setDescription("The guild id to be added to the whitelist.")
                .setRequired(true),
            ),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Remove a guild id from the whitelist.")
        .addStringOption((option) =>
          option
            .setName("content")
            .setDescription("The guild id to be removed from the whitelist.")
            .setRequired(true),
        ),
    );

  public readonly roleIds = [Constants.adminId, Constants.moderatorId];

  public async execute(interaction: CommandInteraction<CacheType>) {
    const options = interaction.options as CommandInteractionOptionResolver;
    const subcommand = options.getSubcommand();
    const content = options.getString("content") as string;

    if (subcommand === "remove") {
      const guild = await PrismaManager.client.guildWhitelist.delete({
        where: {
          id: content,
        },
      });

      await interaction.reply({
        content: "Deleted guild from whitelist.",
        embeds: [
          this.createGuildEmbed(
            guild.name,
            guild.id,
            guild.description,
            guild.expiryTime,
            guild.code,
            guild.icon,
          ),
        ],
      });

      return;
    }

    if (subcommand === "code") {
      const guildInfo = await getGuildFromCode(content);

      if (!guildInfo) {
        await interaction.reply({
          content: `Unable to get guild information from code: \`${content}\``,
          ephemeral: true,
        });

        return;
      }

      const existingGuild =
        await PrismaManager.client.guildWhitelist.findUnique({
          where: {
            id: guildInfo.id,
          },
        });

      if (existingGuild) {
        await interaction.reply({
          content: `Existing guild found for id: \`${guildInfo.id}\``,
          embeds: [
            this.createGuildEmbed(
              existingGuild.name,
              existingGuild.id,
              existingGuild.description,
              existingGuild.expiryTime,
              existingGuild.code,
              existingGuild.icon,
            ),
          ],
          ephemeral: true,
        });

        return;
      }

      const guild = await PrismaManager.client.guildWhitelist.create({
        data: {
          id: guildInfo.id,
          name: guildInfo.name,
          description: guildInfo.description,
          expiryTime: guildInfo.expiresAt,
          icon: guildInfo.icon,
          code: content,
        },
      });

      await interaction.reply({
        content: `Added guild to whitelist using code \`${content}\``,
        embeds: [
          this.createGuildEmbed(
            guild.name,
            guild.id,
            guild.description,
            guild.expiryTime,
            guild.code,
            guild.icon,
          ),
        ],
      });

      return;
    }

    if (subcommand === "id") {
      const existingGuild =
        await PrismaManager.client.guildWhitelist.findUnique({
          where: {
            id: content,
          },
        });

      if (existingGuild) {
        await interaction.reply({
          content: `Existing guild found for id \`${content}\``,
          embeds: [
            this.createGuildEmbed(
              existingGuild.name,
              content,
              existingGuild.description,
              existingGuild.expiryTime,
              existingGuild.code,
              existingGuild.icon,
            ),
          ],
          ephemeral: true,
        });

        return;
      }

      await PrismaManager.client.guildWhitelist.create({
        data: {
          id: content,
        },
      });

      await interaction.reply({
        content: `Added guild to whitelist using id \`${content}\``,
        embeds: [this.createGuildEmbed(null, content, null, null, null, null)],
      });
    }
  }

  private createGuildEmbed(
    name: string | null,
    id: string,
    description: string | null,
    expiresAt: string | null,
    code: string | null,
    icon: string | null,
  ) {
    return new EmbedBuilder()
      .setTitle(name ?? "No Name Found")
      .setColor(0x00ff00)
      .setThumbnail(icon ? Constants.guildIcon(id, icon) : null)
      .addFields(
        {
          name: "ID",
          value: "`" + id + "`",
          inline: false,
        },
        {
          name: "Description",
          value: description ?? "No description",
          inline: false,
        },
        {
          name: "Expires",
          value: expiresAt ? `<t:${Date.parse(expiresAt) / 1_000}>` : "Never",
          inline: false,
        },
        {
          name: "Invite",
          value: code ? `https://discord.gg/${code}` : "No code",
        },
      );
  }
}
