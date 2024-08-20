import type { Message } from "discord.js";

export interface IFilter {
  readonly priority: number;
  readonly name: string;
  execute: (message: Message<boolean>) => Promise<void>;
}
