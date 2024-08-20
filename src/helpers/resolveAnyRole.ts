import type { GuildMember } from "discord.js";

export function resolveAnyRole(
  member: GuildMember,
  roleIds: string[],
): boolean {
  return member.roles.cache.hasAny(...roleIds);
}
