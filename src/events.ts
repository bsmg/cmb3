import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { ClientEvents, Message } from "discord.js";
import { ClientManager } from "./client";
import type { IEvent } from "./interfaces/event";

export class EventManager {
  private static _instance: EventManager;
  private readonly _eventsPath = path.join(__dirname, "events");

  public registerEvent<Event extends keyof ClientEvents>(
    eventName: Event,
    listener: (...args: ClientEvents[Event]) => void,
  ) {
    ClientManager.instance.client.on(eventName, listener);
  }

  public static get instance() {
    if (!this._instance) this._instance = new EventManager();
    return this._instance;
  }

  public async setupEventsAsync() {
    let eventFiles = await fs.readdir(this._eventsPath, {
      withFileTypes: true,
    });

    eventFiles = eventFiles.filter((x) => x.isFile() && x.name.endsWith(".ts"));

    const eventPromises = eventFiles.map(async (file) => {
      const module = await import(path.join(this._eventsPath, file.name));

      if (module.default) {
        const instance = new module.default() as IEvent<keyof ClientEvents>;
        this.registerEvent(instance.eventName, instance.listener);
      }
    });

    await Promise.all(eventPromises);
  }

  public testEvent(message: Message<boolean>) {
    console.log(message.content);
  }
}
