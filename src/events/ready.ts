import type { Client } from "discord.js";

export const event = (client: Client<true>) => {
  console.log(`Logged into ${client.user.username} (${client.user.id})`);
};
