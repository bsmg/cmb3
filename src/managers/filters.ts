import type { Message } from "discord.js";
import type { IFilter } from "../interfaces/filter";

export class FilterManager {
  private static _instance: FilterManager;
  private _filters: IFilter[] = [];

  public static get instance() {
    if (!this._instance) this._instance = new FilterManager();
    return this._instance;
  }

  public registerFilter(filter: IFilter) {
    console.log(`Registering filter "${filter.name}"`);

    if (this._filters.some((x) => x.name === filter.name)) {
      console.log(`Filter already found for "${filter.name}", ignoring.`);
    }

    this._filters.push(filter);
    this._filters.sort((a, b) => b.priority - a.priority);
  }

  public async setupFilters() {
    this._filters = [];
  }

  public async runFilters(message: Message<boolean>) {
    const filterPromises = this._filters.map(async (filter) => {
      await filter.execute(message);
    });

    await Promise.all(filterPromises);
  }
}
