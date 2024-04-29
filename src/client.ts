import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";

export const client: Client = new Client({
    intents: [
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Message
    ]
})

export const commands: Collection<string, Function> = new Collection();