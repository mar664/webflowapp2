import { z } from "zod";
const TriggerTypes = ["Element", "Class"] as const;
export const TriggerTypesEnum = z.enum(TriggerTypes);
export type TriggerTypesEnum = z.infer<typeof TriggerTypesEnum>;

const EffectTypes = ["Fade", "Slide"] as const;
export const EffectTypesEnum = z.enum(EffectTypes);
export type EffectTypesEnum = z.infer<typeof EffectTypesEnum>;

export const ModalOptions = z.object({
  openTriggerType: TriggerTypesEnum.default("Class"),
  openTriggerValue: z.string().optional(),
  openEffectType: EffectTypesEnum.default("Fade"),
  openDuration: z.number().min(0).default(1000),
  closeTriggerType: TriggerTypesEnum.default("Class"),
  closeTriggerValue: z.string().optional(),
  closeEffectType: EffectTypesEnum.default("Fade"),
  closeDuration: z.number().min(0).default(1000),
});
export type ModalOptions = z.infer<typeof ModalOptions>;

export class Modal {
  // set default values for incrementer
  static DATA_ATTRIBUTE_BASE = "data-mr-modal";
  static DATA_ATTRIBUTE_SHOW = `${Modal.DATA_ATTRIBUTE_BASE}-show`;
  static DATA_ATTRIBUTE_HIDE = `${Modal.DATA_ATTRIBUTE_BASE}-hide`;
  static DATA_ATTRIBUTE_BG_OVERLAY = `${Modal.DATA_ATTRIBUTE_BASE}-background_overlay`;

  static SOURCE_URL = "https://mar664.github.io/scripts/modal-v1.js";

  static DEFAULT_SHOW_EFFECT = "fade";
  static DEFAULT_HIDE_EFFECT = "fade";

  static isAlready(element: AnyElement) {
    if (element.type === "DOM") {
      return !!element.getAttribute(Modal.DATA_ATTRIBUTE_BASE);
    }
    return false;
  }

  // apply the number incremeter to a dom element
  static async apply(element: AnyElement) {
    if (element.type === "DOM") {
      element.setAttribute(Modal.DATA_ATTRIBUTE_BASE, "true");
      await element.save();
    }
  }

  static parse(element: AnyElement) {
    if (element && element.type === "DOM") {
      // at the moment just use default values
      console.log(ModalOptions.parse({}));
      return ModalOptions.parse({});
    }
  }

  static async insertScriptInBody() {
    const allElements = await webflow.getAllElements();
    const body = allElements[0];

    const scriptElem = webflow.createDOM("script");

    scriptElem.setAttribute("src", Modal.SOURCE_URL);

    if (body.children) {
      const children = body.getChildren();

      // add script to body at the end
      body.setChildren(children.concat(scriptElem));

      await body.save();
    }
  }

  static async removeScriptFromBody() {
    const allElements = await webflow.getAllElements();
    const scriptExisting = allElements.filter(
      (t) =>
        t.type === "DOM" &&
        t.getTag() === "script" &&
        t.getAttribute("src") === Modal.SOURCE_URL,
    );

    if (scriptExisting.length === 1) {
      const script = scriptExisting[0];
      await script.detach();
      await script.destroy();
    }
  }
}
