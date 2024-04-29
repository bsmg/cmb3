import { CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";

// TODO: Replace with DB
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export const command = new SlashCommandBuilder()
    .setName("autoposter")
    .setDescription("Manage the autoposter instances")

    .addSubcommand(input => 
        input.setName("add")
            .setDescription("Add a new autoposter")
            .addStringOption(input => 
                input.setName("name")
                    .setDescription("Name of the autoposter instance")
                    .setRequired(true)
            )
    ) // Add an autoposter
    .addSubcommand(input => 
        input.setName("kill")
            .setDescription("Deletes an autoposter instance")
            .addStringOption(input =>
                input.setName("name")
                    .setDescription("Name of the autoposter instance")
                    .setRequired(true)
            )
    ) // Kill an autoposter
    .addSubcommand(input => 
        input.setName("enable")
            .setDescription("Enable an autoposter instance")
            .addStringOption(input => 
                input.setName("name")
                    .setDescription("Name of the autoposter instance")
                    .setRequired(true)
            )
    ) // Enable an autoposter
    .addSubcommand(input => 
        input.setName("disable")
            .setDescription("Disable an autoposter instance")
            .addStringOption(input => 
                input.setName("name")
                    .setDescription("Name of the autoposter instance")
                    .setRequired(true)
            )
    ) // Disable an autoposter

    .addSubcommand(input => 
        input.setName("ls")
            .setDescription("Lists all autoposter instances")
    ) // List all autoposters
// TODO: add extra subcommands as found here: https://docs.google.com/document/d/1JlltQ0Gms1gRDwS3MWq8IywrRt5m0BaWtvnEuD0ZM7s/edit#heading=h.qk36rrk2q6ga

export async function execute(interaction: CommandInteraction) { // Need to figure out why interaction.reply here causes an undefined error, as opposed to file://./ping.ts
    switch ((interaction.options as CommandInteractionOptionResolver).getSubcommand())
    {
        case "add":
            await add(interaction);
            break;
        case "kill":
            await kill(interaction);
            break;
        case "enable":
            await enable(interaction);
            break;
        case "disable":
            await disable(interaction);
            break;
        case "ls":
            await list(interaction);
            break;
    }    
}

// TODO: define functions with json data temporarily until databasing available
async function add(interaction: CommandInteraction)
{
    
}

async function kill(interaction: CommandInteraction)
{
    
}

async function enable(interaction: CommandInteraction)
{

}

async function disable(interaction: CommandInteraction)
{
    
}

async function list(interaction: CommandInteraction)
{

}