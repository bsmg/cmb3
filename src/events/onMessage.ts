import type { Message } from "discord.js";
import { Events } from "discord.js";
import type { IEvent } from "../interfaces/event";

export default class OnMessage implements IEvent<Events.MessageCreate> {
  public readonly eventName = Events.MessageCreate;

  public listener(message: Message<boolean>) {
    if (message.author.bot)
      // eslint-disable-next-line no-useless-return
      return;

    // console.log(message.content);
  }
}
