import type { Client } from "discord.js";
import { Events } from "discord.js";
import type { IEvent } from "../interfaces/event";

export default class OnReady implements IEvent<Events.ClientReady> {
  public readonly eventName = Events.ClientReady;

  public async listener(client: Client<boolean>) {
    await client.user?.setUsername("ChannelMonitorBot");
    console.log(client.user?.username);
  }
}
