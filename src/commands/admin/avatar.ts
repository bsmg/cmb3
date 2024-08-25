import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { Constants } from "../../constants";
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

  public readonly roleIds = [Constants.adminId];

  public async execute(interaction: CommandInteraction<CacheType>) {
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

    await ClientManager.client.user?.setAvatar(image.url);
    await interaction.followUp({ content: "Set avatar!", ephemeral: false });
  }
}
