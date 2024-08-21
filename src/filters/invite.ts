import type { Message } from "discord.js";
import type { IFilter } from "../interfaces/filter";
// import { PrismaManager } from "../managers/prisma";

export default class InviteFilter implements IFilter {
  public priority = 0;
  public name = "InviteFilter";

  public async execute(_message: Message<boolean>) {}
}
