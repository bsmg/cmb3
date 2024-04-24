import { GatewayIntentBits, Partials } from "discord.js";
import { Client } from "discordx";

export const client: Client = new Client({
    intents: [
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Message
    ]
})