import * as process from "node:process";
import { Pool } from "pg";

export class PostgresManager {
  private static _instance: PostgresManager;
  private _pool: Pool | null = null;

  /* private async ensureTableExists(tableName: string) {
    const output = await this._pool?.query(
      `SELECT EXISTS ( WHERE table_name='$1')`,
      [tableName],
    );
    console.log(output?.rows);
  }*/

  public async setup() {
    this._pool = new Pool({
      host: process.env.DBHost,
      port: Number(process.env.DBPort),
      user: process.env.DBUser,
      password: process.env.DBPassword,
      database: process.env.Database,
    });

    await this._pool.connect();

    await this._pool.query("CREATE TABLE ServerWhitelist( id INTEGER UNIQUE )");

    /* await this.ensureTableExists("serverWhitelist");

    await this._pool.query(
      `CREATE TABLE serverWhitelist ( id INTEGER UNIQUE )`,
    );

    await this.ensureTableExists("serverWhitelist");*/
  }

  public static get instance() {
    if (!this._instance) this._instance = new PostgresManager();
    return this._instance;
  }

  public get pool(): Pool {
    return this._pool as Pool;
  }
}
