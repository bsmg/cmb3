import type { GuildMember, Message } from "discord.js";
import { Constants } from "../constants";
import { memberHasAnyRole } from "../helpers/roles";
import type { IFilter } from "../interfaces/filter";

export default class FileFilter implements IFilter {
  public priority = 5;
  public name = "FileFilter";

  public async execute(message: Message<boolean>) {
    const memberHasRole = memberHasAnyRole(message.member as GuildMember, [
      Constants.adminId,
      Constants.staffId,
    ]);
    // eslint-disable-next-line no-useless-return
    if (memberHasRole) return;
  }
}
