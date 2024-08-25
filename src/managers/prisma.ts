import { PrismaClient } from "@prisma/client";

export class PrismaManager {
  private static _instance: PrismaManager;
  private readonly _client: PrismaClient;

  public constructor() {
    this._client = new PrismaClient();
  }

  private static get instance() {
    if (!this._instance) this._instance = new PrismaManager();
    return this._instance;
  }

  public static get client() {
    return this.instance._client;
  }
}
