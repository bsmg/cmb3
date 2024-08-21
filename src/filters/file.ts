import type { Message } from "discord.js";
import type { IFilter } from "../interfaces/filter";

export default class FileFilter implements IFilter {
  public priority = 5;
  public name = "FileFilter";

  public async execute(_message: Message<boolean>) {}
}
