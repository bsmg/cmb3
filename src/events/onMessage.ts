import type { Message } from "discord.js";
import { Events } from "discord.js";
import type { IEvent } from "../interfaces/event";
import { FilterManager } from "../managers/filters";

export default class OnMessage implements IEvent<Events.MessageCreate> {
  public readonly eventName = Events.MessageCreate;

  public async listener(message: Message<boolean>) {
    if (message.author.bot) return;

    await FilterManager.instance.runFilters(message);
  }
}
