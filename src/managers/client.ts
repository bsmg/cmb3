import { Client, GatewayIntentBits, Partials } from "discord.js";

export class ClientManager {
  private static _instance: ClientManager;
  private readonly _client: Client;

  public constructor() {
    this._client = new Client({
      intents: [
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
      ],
      partials: [
        Partials.ThreadMember,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.Message,
        Partials.Channel,
      ],
    });
  }

  private static get instance() {
    if (!this._instance) this._instance = new ClientManager();
    return this._instance;
  }

  public static get client() {
    return this.instance._client;
  }
}
