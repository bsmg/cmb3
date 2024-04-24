import { Configuration } from "./config";
import { client } from "./client";

Configuration.Init();

client.on("ready", (client) => {
    console.log(`Logged into ${client.user.username} (${client.user.id})`);
});

client.login(Configuration.config.token);