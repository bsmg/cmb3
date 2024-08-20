import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
} from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { Configuration } from "../../configuration";
import { Constants } from "../../constants";
import { resolveAnyRole } from "../../helpers/resolveAnyRole";
import type { ICommand } from "../../interfaces/command";
import { ClientManager } from "../../managers/client";

export default class Avatar implements ICommand {
  public readonly builder = new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Set avatar")
    .addAttachmentOption((attachment) =>
      attachment
        .setName("image")
        .setDescription("Image to be used")
        .setRequired(true),
    )
    .setDMPermission(true);

  public async execute(interaction: CommandInteraction<CacheType>) {
    if (
      !resolveAnyRole(interaction.member as GuildMember, [Constants.adminId, Configuration.instance.testId])
    ) {
      await interaction.reply({
        content: "You don't have permission to use this command!",
        ephemeral: true,
      });
      return;
    }

    const options = interaction.options as CommandInteractionOptionResolver;
    const image = options.getAttachment("image");

    if (!image?.contentType?.startsWith("image")) {
      await interaction.reply({
        content: "Attachment provided isn't an image!",
        ephemeral: true,
      });
      return;
    }

    await interaction.deferReply({ ephemeral: false });

    await ClientManager.instance.client.user?.setAvatar(image.url);
    await interaction.followUp({ content: "Set avatar!", ephemeral: false });
  }
}
