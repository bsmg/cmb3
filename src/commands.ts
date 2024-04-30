import { commands as clientCommands } from "./client";

import { REST } from "@discordjs/rest";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { Configuration } from "./config";
import { Routes } from "discord.js";

export async function registerCommands()
{
	clientCommands.clear();
	
	const rest = new REST().setToken(Configuration.config.token);

	const commandDirs = join(__dirname, "commands");
	const categoryDirs = readdirSync(commandDirs).filter(x => statSync(join(commandDirs, x)).isDirectory());
	const commands = [];

	for (const category of categoryDirs)
	{
		const files = readdirSync(join(commandDirs, category)).filter(x => x.endsWith(".ts"));

		for (const file of files)
		{
			const { command, execute } = require(`./commands/${category}/${file}`);

			// https://discord.com/developers/applications/{botid}/bot
			if (category === "admin")
				command.setDefaultMemberPermissions(16); // Manage Channels

			commands.push(command);
			clientCommands.set(command.name, execute);
		}
	}
	
	await rest.put(Routes.applicationCommands(Configuration.config.clientId), { body: commands });
}