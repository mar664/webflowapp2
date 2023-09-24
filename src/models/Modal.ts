import { z } from "zod";
import { CompatibleElement } from "../elements/CompatibleElement";
import { ElementModel } from "./ElementModel";

const TriggerTypes = ["Element", "Class"] as const;
export const TriggerTypesEnum = z.enum(TriggerTypes);
export type TriggerTypesEnum = z.infer<typeof TriggerTypesEnum>;

const OpenEffectTypes = [
  "None",
  "Fade",
  "Slide From Left",
  "Slide From Right",
  "Slide From Top",
  "Slide From Bottom",
] as const;
export const OpenEffectTypesEnum = z.enum(OpenEffectTypes);
export type OpenEffectTypesEnum = z.infer<typeof OpenEffectTypesEnum>;

const CloseEffectTypes = [
  "None",
  "Fade",
  "Slide To Left",
  "Slide To Right",
  "Slide To Top",
  "Slide To Bottom",
] as const;
export const CloseEffectTypesEnum = z.enum(CloseEffectTypes);
export type CloseEffectTypesEnum = z.infer<typeof CloseEffectTypesEnum>;

function getAttributeFunc(element: CompatibleElement) {
  return (arg: string) => {
    const attributeValue = element.getAttribute(arg);
    if (attributeValue === null) {
      return undefined;
    }
    return attributeValue;
  };
}

function setAttributeFunc(element: CompatibleElement) {
  return (arg: string, value: string) => {
    element.setAttribute(arg, value);
  };
}

const Boolean = z.preprocess((arg) => {
  return arg !== undefined && arg !== null && (arg === "false" || !arg)
    ? false
    : true;
}, z.boolean().default(true));

export const ModalOptions = z.object({
  openTriggerType: TriggerTypesEnum.default(TriggerTypesEnum.enum.Element),
  openTriggerValue: z.preprocess((arg) => {
    if (typeof arg === "string") {
      return arg;
    }
    return undefined;
  }, z.string().optional()),
  openEffectType: OpenEffectTypesEnum.default(OpenEffectTypesEnum.enum.Fade),
  openDuration: z.coerce.number().min(0).default(1000),
  closeTriggerType: TriggerTypesEnum.default(TriggerTypesEnum.enum.Element),
  closeTriggerValue: z.preprocess((arg) => {
    if (typeof arg === "string") {
      return arg;
    }
    return undefined;
  }, z.string().optional()),
  closeEffectType: CloseEffectTypesEnum.default(CloseEffectTypesEnum.enum.Fade),
  closeDuration: z.coerce.number().min(0).default(1000),
  closeOnClickOverlay: Boolean,
});
export type ModalOptions = z.infer<typeof ModalOptions>;

export const NewModalOptions = z.object({
  createHeader: Boolean,
  createBody: Boolean,
  createClose: Boolean,
  createFooter: Boolean,
  createClasses: Boolean,
  useCustomPrefix: Boolean.default(false),
  classPrefix: z.string().default("MR Modal"),
});
export type NewModalOptions = z.infer<typeof NewModalOptions>;

export class Modal extends ElementModel {
  // set default values for incrementer
  static readonly NAME = "Modal";
  static DISPLAY_TYPE = "flex";
  static DATA_ATTRIBUTE_BASE = "data-mr-modal";
  static DATA_ATTRIBUTE_OPEN = `${Modal.DATA_ATTRIBUTE_BASE}-open`;
  static DATA_ATTRIBUTE_CLOSE = `${Modal.DATA_ATTRIBUTE_BASE}-close`;
  static DATA_ATTRIBUTE_OPEN_TRIGGER_TYPE = `${Modal.DATA_ATTRIBUTE_OPEN}-trigger-type`;
  static DATA_ATTRIBUTE_CLOSE_TRIGGER_TYPE = `${Modal.DATA_ATTRIBUTE_CLOSE}-trigger-type`;
  static DATA_ATTRIBUTE_OPEN_TRIGGER = `${Modal.DATA_ATTRIBUTE_OPEN}-trigger`;
  static DATA_ATTRIBUTE_CLOSE_TRIGGER = `${Modal.DATA_ATTRIBUTE_CLOSE}-trigger`;
  static DATA_ATTRIBUTE_OPEN_EFFECT = `${Modal.DATA_ATTRIBUTE_OPEN}-effect`;
  static DATA_ATTRIBUTE_CLOSE_EFFECT = `${Modal.DATA_ATTRIBUTE_CLOSE}-effect`;
  static DATA_ATTRIBUTE_OPEN_DURATION = `${Modal.DATA_ATTRIBUTE_OPEN}-duration`;
  static DATA_ATTRIBUTE_CLOSE_DURATION = `${Modal.DATA_ATTRIBUTE_CLOSE}-duration`;
  static DATA_ATTRIBUTE_OVERLAY = `${Modal.DATA_ATTRIBUTE_BASE}-overlay`;

  static DATA_ATTRIBUTE_CLOSE_ON_CLICK_OVERLAY = `${Modal.DATA_ATTRIBUTE_BASE}-close-on-click-overlay`;

  static SOURCE_URL = "https://mar664.github.io/scripts/modal-v1.js";

  // apply the number incremeter to a dom element
  static async update(element: CompatibleElement, options: ModalOptions) {
    const parsedOptions = ModalOptions.parse(options);
    console.log(parsedOptions);
    const setAttribute = setAttributeFunc(element);
    setAttribute(
      Modal.DATA_ATTRIBUTE_OPEN_DURATION,
      parsedOptions.openDuration.toString(),
    );
    setAttribute(
      Modal.DATA_ATTRIBUTE_CLOSE_DURATION,
      parsedOptions.closeDuration.toString(),
    );
    setAttribute(
      Modal.DATA_ATTRIBUTE_OPEN_EFFECT,
      parsedOptions.openEffectType.toString(),
    );
    setAttribute(
      Modal.DATA_ATTRIBUTE_CLOSE_EFFECT,
      parsedOptions.closeEffectType.toString(),
    );
    setAttribute(
      Modal.DATA_ATTRIBUTE_OPEN_TRIGGER_TYPE,
      parsedOptions.openTriggerType.toString(),
    );
    setAttribute(
      Modal.DATA_ATTRIBUTE_CLOSE_TRIGGER_TYPE,
      parsedOptions.closeTriggerType.toString(),
    );
    if (parsedOptions.openTriggerValue) {
      setAttribute(
        Modal.DATA_ATTRIBUTE_OPEN_TRIGGER,
        parsedOptions.openTriggerValue.toString(),
      );
    } else {
      element.removeAttribute(Modal.DATA_ATTRIBUTE_OPEN_TRIGGER);
    }
    if (parsedOptions.closeTriggerValue) {
      setAttribute(
        Modal.DATA_ATTRIBUTE_CLOSE_TRIGGER,
        parsedOptions.closeTriggerValue.toString(),
      );
    } else {
      element.removeAttribute(Modal.DATA_ATTRIBUTE_CLOSE_TRIGGER);
    }
    setAttribute(
      Modal.DATA_ATTRIBUTE_CLOSE_ON_CLICK_OVERLAY,
      parsedOptions.closeOnClickOverlay.toString(),
    );
    await element.save();
  }

  static isAlready(element: CompatibleElement) {
    return !!element.getAttribute(Modal.DATA_ATTRIBUTE_BASE);
  }

  // apply the number incremeter to a dom element
  static apply(element: DOMElement) {
    element.setAttribute(Modal.DATA_ATTRIBUTE_BASE, element.id);
  }

  static parse(element: CompatibleElement) {
    const getAttribute = getAttributeFunc(element);

    // at the moment just use default values
    return ModalOptions.parse({
      openDuration: getAttribute(Modal.DATA_ATTRIBUTE_OPEN_DURATION),
      closeDuration: getAttribute(Modal.DATA_ATTRIBUTE_CLOSE_DURATION),
      openTriggerType: getAttribute(Modal.DATA_ATTRIBUTE_OPEN_TRIGGER_TYPE),
      closeTriggerType: getAttribute(Modal.DATA_ATTRIBUTE_CLOSE_TRIGGER_TYPE),
      openTriggerValue: getAttribute(Modal.DATA_ATTRIBUTE_OPEN_TRIGGER),
      closeTriggerValue: getAttribute(Modal.DATA_ATTRIBUTE_CLOSE_TRIGGER),
      openEffectType: getAttribute(Modal.DATA_ATTRIBUTE_OPEN_EFFECT),
      closeEffectType: getAttribute(Modal.DATA_ATTRIBUTE_CLOSE_EFFECT),
      closeOnClickOverlay: getAttribute(
        Modal.DATA_ATTRIBUTE_CLOSE_ON_CLICK_OVERLAY,
      ),
    });
  }

  // remove modal from dom element by removing attributes or the complete element and children
  static async remove(element: CompatibleElement, removeElement = false) {
    if (removeElement) {
      await element.detach();
      await element.destroy();
    } else {
      element.removeAttribute(Modal.DATA_ATTRIBUTE_BASE);
      element.removeAttribute(Modal.DATA_ATTRIBUTE_OPEN_EFFECT);
      element.removeAttribute(Modal.DATA_ATTRIBUTE_CLOSE_EFFECT);
      element.removeAttribute(Modal.DATA_ATTRIBUTE_OPEN_TRIGGER_TYPE);
      element.removeAttribute(Modal.DATA_ATTRIBUTE_CLOSE_TRIGGER_TYPE);
      element.removeAttribute(Modal.DATA_ATTRIBUTE_OPEN_TRIGGER);
      element.removeAttribute(Modal.DATA_ATTRIBUTE_CLOSE_TRIGGER);
      element.removeAttribute(Modal.DATA_ATTRIBUTE_OPEN_DURATION);
      element.removeAttribute(Modal.DATA_ATTRIBUTE_CLOSE_DURATION);
      element.removeAttribute(Modal.DATA_ATTRIBUTE_CLOSE_ON_CLICK_OVERLAY);
      await element.save();
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
