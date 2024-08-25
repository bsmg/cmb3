import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { Message } from "discord.js";
import type { IFilter } from "../interfaces/filter";

export class FilterManager {
  private static _instance: FilterManager;
  private _filters: IFilter[] = [];
  private readonly _filtersPath = path.join(__dirname, "..", "filters");

  public static get instance() {
    if (!this._instance) this._instance = new FilterManager();
    return this._instance;
  }

  private registerFilter(filter: IFilter) {
    console.log(`Registering filter "${filter.name}"`);

    if (this._filters.some((x) => x.name === filter.name)) {
      console.log(`Filter already found for "${filter.name}", ignoring.`);
    }

    this._filters.push(filter);
    this._filters.sort((a, b) => a.priority - b.priority);
  }

  public async setupFilters() {
    this._filters = [];

    let files = await fs.readdir(this._filtersPath, {
      withFileTypes: true,
    });

    files = files.filter((x) => x.isFile() && x.name.endsWith(".ts"));

    const filePromises = files.map(async (file) => {
      // Switched to file.path over file.parentPath temporarily. .parentPath appears to be null on linux.
      const module = await import(path.join(file.path, file.name));

      if (module.default) {
        const instance = new module.default() as IFilter;
        this.registerFilter(instance);
      }
    });

    await Promise.all(filePromises);
  }

  public async runFilters(message: Message<boolean>) {
    const filterPromises = this._filters.map(async (filter) => {
      await filter.execute(message);
    });

    await Promise.all(filterPromises);
  }
}
