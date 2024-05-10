import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { client } from "./client";

export async function registerEvents() {
  const eventsDir = join(__dirname, "events");

  const eventFilesUnfiltered = await readdir(eventsDir);
  const eventFiles = eventFilesUnfiltered.filter((x) => x.endsWith(".ts"));

  await Promise.all(
    eventFiles.map(async (eventFile) => {
      const { event } = await import(`./events/${eventFile}`).catch(() => {});
      if (event) {
        client.on(eventFile.replace(".ts", ""), event);
        console.log(`Attached event to ${eventFile}`);
      }
    })
  );
}
