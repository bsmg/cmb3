import { Configuration } from "./config";
import { client, commands } from "./client";
import { registerCommands } from "./commands";

Configuration.Init();

registerCommands();

client.on("ready", (client) => {
    console.log(`Logged into ${client.user.username} (${client.user.id})`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;

    const command = commands.get(interaction.commandName);

    if (!command)
        throw new Error("Command not found for: " + interaction.commandName);

    await command(interaction);
});

client.login(Configuration.config.token);