import * as fs from "fs";
import * as path from "path";

export class Configuration
{
    private static readonly defaultConfig = {
        token: "App token",
        logsChannel: "Spam channel ID",
        clientId: "Client ID",
        guildId: "Guild ID",
    }

    public static config = {
        token: "",
        logsChannel: "",
        clientId: "",
        guildId: ""
    }

    public static Init()
    {
        const rootPath = path.join(__dirname, "..");
        const configPath = path.join(rootPath, "config.json");
        const templateConfigPath = path.join(rootPath, "config.template.json");

        if (!fs.existsSync(configPath))
        {
            if (!fs.existsSync(templateConfigPath))
                fs.writeFileSync(templateConfigPath, JSON.stringify(Configuration.defaultConfig, null, 4));
            throw new Error("Config not found, please update the `config.template.json` and rename it to `config.json` to continue");
        }

        Configuration.config = JSON.parse(fs.readFileSync(configPath, { encoding: "ascii" } ));  

        if (typeof Configuration.config.token !== "string")
            throw new Error("Config value `token` is not of type `string`");
        if (typeof Configuration.config.logsChannel !== "string")
            throw new Error("Config value `logsChannel` is not of type `string`")
        if (typeof Configuration.config.clientId !== "string")
            throw new Error("Config value `clientId` is not of type `string`");
        if (typeof Configuration.config.guildId !== "string")
            throw new Error("Config value `guildId` is not of type `string`");
    }    
}