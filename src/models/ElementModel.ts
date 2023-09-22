/* eslint-disable @typescript-eslint/no-empty-function */
import { CompatibleElement } from "../elements/CompatibleElement";

export abstract class ElementModel {
  static DATA_ATTRIBUTE_BASE = "data-base";
  static DATA_ATTRIBUTE_VISIBLE = `${ElementModel.DATA_ATTRIBUTE_BASE}-visible`;
  static DISPLAY_TYPE = "block";
  
  static async update(element: CompatibleElement, options: any) {}

  static isAlready(element: CompatibleElement) {}

  static async apply(element: CompatibleElement) {}

  static parse(element: CompatibleElement) {}

  static async remove(element: CompatibleElement, removeElement = false) {}

  static async insertScriptInBody() {}

  static async removeScriptFromBody() {}
}
