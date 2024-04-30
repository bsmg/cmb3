import { client } from "../client";
import { Configuration } from "../config";

import { EmbedBuilder, Message, TextChannel } from "discord.js";

export const event = async (message: Message<boolean>) => {
    if (message.author.bot)
        return;


    // all filter related things

    const guild = client.guilds.cache.get(Configuration.config.guildId);
    const member = guild.members.cache.get(message.author.id);


    // me no good with regex so: https://stackoverflow.com/questions/10570286/check-if-string-contains-url-anywhere-in-string-using-javascript
    const regex = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");
    if (message.createdTimestamp < member.joinedTimestamp + 600000 && message.attachments.size > 0 || regex.test(message.content))
    {
        const response = await message.reply(`Your message has been deleted because you have tried to post a link or file within 10 minutes of joining the server. Please wait. You will be able to post <t:${((member.joinedTimestamp + 600000) / 1000).toFixed(0)}:R>`);
        message.delete();
        setTimeout(() => response.delete(), 10000);

        /*(client.channels.cache.get(Configuration.config.logsChannel) as TextChannel).send({ embeds: [
            new EmbedBuilder()
                .setTitle("New User Posted Attachment")
                .setAuthor({ name: `${message.author.username}#${message.author.discriminator} (${message.author.id})`, iconURL: message.author.avatarURL()})
        ]})*/
    }
}