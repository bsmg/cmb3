import { client } from "./client";

import { readdirSync } from "fs";
import { join } from "path";


export function registerEvents()
{
    const eventsDir = join(__dirname, "events");

    const eventFiles = readdirSync(eventsDir).filter(x => x.endsWith(".ts"));

    for (const eventFile of eventFiles)
    {
        const { event } = require(`./events/${eventFile}`);
        client.on(eventFile.replace(".ts", ""), event);

        console.log(`Attached event to ${eventFile}`)
    }
}