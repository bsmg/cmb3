export class Constants {
  public static readonly adminId = "442142636384714772";
  public static readonly staffId = "466449484759564309";
  public static readonly moderatorId = "442696937691676676";
  public static readonly modderId = "441806759062011905";
  public static readonly supportId = "457102942491770882";
  public static readonly mapperSupportId = "687388571815903238";
  public static readonly macrosId = "465769822802673675";

  public static guildInvite(code: string) {
    return `https://discord.com/api/invites/${code}?with_counts=true&with_expiration=true`;
  }

  public static guildIcon(id: string, icon: string) {
    return `https://cdn.discordapp.com/icons/${id}/${icon}.webp?size=64`;
  }

  public static readonly allRoles = [
    this.adminId,
    this.staffId,
    this.moderatorId,
    this.modderId,
    this.supportId,
    this.mapperSupportId,
    this.macrosId,
  ];

  public static readonly supportOnward = [
    this.adminId,
    this.staffId,
    this.moderatorId,
    this.modderId,
    this.supportId,
    this.mapperSupportId,
  ];
}
