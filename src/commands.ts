import { commands as clientCommands } from "./client";

import { REST } from "@discordjs/rest";
import { readdirSync } from "fs";
import { join } from "path";
import { Configuration } from "./config";
import { Routes } from "discord.js";

export async function registerCommands()
{
	clientCommands.clear();
	
	const rest = new REST().setToken(Configuration.config.token);

	const commandFiles = readdirSync(join(__dirname, "commands")).filter(f => f.endsWith(".ts"));
	const commands = [];

	for (const file of commandFiles)
	{
		const { command, execute } = require(`./commands/${file}`);
		commands.push(command);
		clientCommands.set(command.name, execute);
	}
	
	await rest.put(Routes.applicationCommands(Configuration.config.clientId), { body: commands });
}