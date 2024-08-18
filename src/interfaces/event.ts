import type { ClientEvents } from "discord.js";

export interface IEvent<Event extends keyof ClientEvents> {
  readonly eventName: Event;
  listener: (...args: ClientEvents[Event]) => void;
}
