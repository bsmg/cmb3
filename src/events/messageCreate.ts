import { setTimeout } from "node:timers";
import type { Message } from "discord.js";
import { EmbedBuilder, TextChannel } from "discord.js";
import { client } from "../client";
import { Configuration } from "../config";

export const event = async (message: Message<boolean>) => {
  if (message.author.bot) return;

  // all filter related things

  const guild = client.guilds.cache.get(Configuration.config.guildId);
  const member = guild?.members.cache.get(message.author.id);

  if (guild === null || member === null)
    throw new Error("Guild or member is null");

  // me no good with regex so: https://stackoverflow.com/questions/10570286/check-if-string-contains-url-anywhere-in-string-using-javascript
  const regex =
    /([\dA-Za-z]+:\/\/)?(\w+:\w+@)?([\d.A-Za-z-]+\.[A-Za-z]{2,4})(:\d+)?([^ ])+/;
  if (
    (message.createdTimestamp < member?.joinedTimestamp + 600_000 &&
      message.attachments.size > 0) ||
    regex.test(message.content)
  ) {
    const response = await message.reply(
      `Your message has been deleted because you have tried to post a link or file within 10 minutes of joining the server. Please wait. You will be able to post <t:${((member.joinedTimestamp + 600_000) / 1_000).toFixed(0)}:R>`,
    );
    await message.delete();
    setTimeout(async () => response.delete(), 10_000);

    /* (client.channels.cache.get(Configuration.config.logsChannel) as TextChannel).send({ embeds: [
            new EmbedBuilder()
                .setTitle("New User Posted Attachment")
                .setAuthor({ name: `${message.author.username}#${message.author.discriminator} (${message.author.id})`, iconURL: message.author.avatarURL()})
        ]})*/
  }
};
