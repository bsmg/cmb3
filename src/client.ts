import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";

export const client: Client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds
    ],
    partials: [
        Partials.GuildMember,
        Partials.Message
    ]
})

export const commands: Collection<string, Function> = new Collection();