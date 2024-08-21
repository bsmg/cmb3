import type { Message } from "discord.js";
import type { IFilter } from "../interfaces/filter";

export default class ImageFilter implements IFilter {
  public priority = 10;
  public name = "ImageFilter";

  public async execute(_message: Message<boolean>) {}
}
