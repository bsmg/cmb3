import * as process from "node:process";
import type { GuildMember } from "discord.js";

export function memberHasAnyRole(
  member: GuildMember,
  roles: string[],
): boolean {
  if (process.env.Debug === "true")
    roles.push(process.env.TestRoleId as string);

  return member.roles.cache.hasAny(...roles);
}
