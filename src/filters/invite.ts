import type { GuildMember, Message } from "discord.js";
import { Constants } from "../constants";
import { getGuildFromCode } from "../helpers/invite";
import { memberHasAnyRole } from "../helpers/roles";
import type { IFilter } from "../interfaces/filter";
import { PrismaManager } from "../managers/prisma";

export default class InviteFilter implements IFilter {
  public readonly priority = 0;
  public readonly name = "InviteFilter";
  private readonly regex = /discord\.(?:gg|com\/invite)\/[\w-]+/gi;

  public async execute(message: Message<boolean>) {
    const memberHasRole = memberHasAnyRole(message.member as GuildMember, [
      Constants.adminId,
      Constants.staffId,
    ]);
    if (memberHasRole) return;

    const regexMatches = this.regex.exec(message.content);

    if (regexMatches === null) return;

    const results = regexMatches.map(async (value) => {
      const code = value.slice(value.lastIndexOf("/") + 1);

      const guildInfo = await getGuildFromCode(code);

      if (!guildInfo) {
        await message.delete();
        // add logging to channel
        return;
      }

      const guild = await PrismaManager.client.guildWhitelist.findUnique({
        where: {
          id: guildInfo.id,
        },
      });

      if (!guild) {
        await message.delete();
        // log to channel
      }
    });

    await Promise.all(results);
  }
}
