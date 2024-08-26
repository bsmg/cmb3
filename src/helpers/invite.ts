import { Constants } from "../constants";

export async function getGuildFromCode(code: string) {
  const inviteData = await fetch(Constants.guildInvite(code)).catch(() => null);
  const inviteText = await inviteData?.text();

  if (!inviteText) return;

  const inviteJson = JSON.parse(inviteText);

  return {
    id: inviteJson.guild_id as string,
    name: inviteJson.guild.name as string,
    description: (inviteJson.guild.description as string) ?? "No description",
    icon: inviteJson.guild.icon as string,
    currentMembers: inviteJson.approximate_member_count as number,
    expiresAt: inviteJson.expires_at as string,
  };
}
