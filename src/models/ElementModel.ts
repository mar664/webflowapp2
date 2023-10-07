/* eslint-disable @typescript-eslint/no-empty-function */
import { CompatibleElement } from "../elements/CompatibleElement";

export abstract class ElementModel {
  static NAME = "Element Model";
  static DATA_ATTRIBUTE_BASE = "data-base";
  static DATA_ATTRIBUTE_VISIBLE = `${ElementModel.DATA_ATTRIBUTE_BASE}-visible`;
  static DISPLAY_TYPE = "block";
  static SOURCE_URL: string | undefined = undefined;

  static async update(element: CompatibleElement, options: any) {}

  static isAlready(element: CompatibleElement) {}

  static apply(element: DOMElement) {}

  static parse(element: CompatibleElement) {}

  static async remove(element: CompatibleElement, removeElement = false) {}

  static async insertScriptInBody(ElementType: typeof ElementModel) {
    console.log(ElementType.SOURCE_URL);
    const allElements = await webflow.getAllElements();
    const body = allElements[0];

    const scriptElem = webflow.createDOM("script");

    scriptElem.setAttribute("src", ElementType.SOURCE_URL as string);

    if (body.children) {
      const children = body.getChildren();

      // add script to body at the end
      body.setChildren(children.concat(scriptElem));

      await body.save();
    }
  }

  static async removeScriptFromBody(ElementType: typeof ElementModel) {
    const allElements = await webflow.getAllElements();
    const scriptExisting = allElements.filter(
      (t) =>
        t.type === "DOM" &&
        t.getTag() === "script" &&
        t.getAttribute("src") === ElementType.SOURCE_URL,
    );

    if (scriptExisting.length === 1) {
      const script = scriptExisting[0];
      await script.detach();
      await script.destroy();
    }
  }
}
