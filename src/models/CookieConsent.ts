import { z } from "zod";
import { CompatibleElement } from "../elements/CompatibleElement";
import { ElementModel } from "./ElementModel";

const Position = ["Top", "Bottom"] as const;
export const PositionEnum = z.enum(Position);
export type PositionEnum = z.infer<typeof PositionEnum>;

const OpenEffectTypes = ["None", "Fade", "Scale"] as const;
export const OpenEffectTypesEnum = z.enum(OpenEffectTypes);
export type OpenEffectTypesEnum = z.infer<typeof OpenEffectTypesEnum>;

const CloseEffectTypes = ["None", "Fade", "Scale"] as const;
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

export const CookieConsentOptions = z.object({
  openEffectType: OpenEffectTypesEnum.default(OpenEffectTypesEnum.enum.Fade),
  openDuration: z.coerce.number().min(0).default(1000),
  closeEffectType: CloseEffectTypesEnum.default(CloseEffectTypesEnum.enum.Fade),
  closeDuration: z.coerce.number().min(0).default(1000),
  cookieExpiry: z.coerce.number().positive().default(30),
  cookieName: z.string().default("mr-cookie-consent"),
  position: z.string().default(PositionEnum.enum.Top),
});
export type CookieConsentOptions = z.infer<typeof CookieConsentOptions>;

export const NewCookieConsentOptions = z.object({
  createHeader: Boolean,
  createBody: Boolean,
  createClose: Boolean,
  createFooter: Boolean,
  createAboutCookiesLink: Boolean,
  createAllowAllButton: Boolean,
  createDenyButton: Boolean,
  createClasses: Boolean,
  useCustomPrefix: Boolean.default(false),
  classPrefix: z.string().default("MR Cookie Consent"),
});
export type NewCookieConsentOptions = z.infer<typeof NewCookieConsentOptions>;

export class CookieConsent extends ElementModel {
  // set default values for incrementer
  static readonly NAME = "Cookie Consent";
  static DATA_ATTRIBUTE_BASE = "data-mr-cookie-consent";
  static DATA_ATTRIBUTE_OPEN = `${CookieConsent.DATA_ATTRIBUTE_BASE}-open`;
  static DATA_ATTRIBUTE_CLOSE = `${CookieConsent.DATA_ATTRIBUTE_BASE}-close`;
  static DATA_ATTRIBUTE_OPEN_EFFECT = `${CookieConsent.DATA_ATTRIBUTE_OPEN}-effect`;
  static DATA_ATTRIBUTE_CLOSE_EFFECT = `${CookieConsent.DATA_ATTRIBUTE_CLOSE}-effect`;
  static DATA_ATTRIBUTE_OPEN_DURATION = `${CookieConsent.DATA_ATTRIBUTE_OPEN}-duration`;
  static DATA_ATTRIBUTE_CLOSE_DURATION = `${CookieConsent.DATA_ATTRIBUTE_CLOSE}-duration`;
  static DATA_ATTRIBUTE_COOKIE_NAME = `${CookieConsent.DATA_ATTRIBUTE_BASE}-cookie-name`;
  static DATA_ATTRIBUTE_COOKIE_EXPIRY = `${CookieConsent.DATA_ATTRIBUTE_BASE}-cookie-expiry`;
  static DATA_ATTRIBUTE_POSITION = `${CookieConsent.DATA_ATTRIBUTE_BASE}-position`;
  static DATA_ATTRIBUTE_ALLOW_ALL = `${CookieConsent.DATA_ATTRIBUTE_BASE}-allow-all`;
  static DATA_ATTRIBUTE_DENY = `${CookieConsent.DATA_ATTRIBUTE_BASE}-deny`;

  static SOURCE_URL = "https://mar664.github.io/scripts/cookie-consent-v1.js";

  // apply the number incremeter to a dom element
  static async update(
    element: CompatibleElement,
    options: CookieConsentOptions,
  ) {
    const parsedOptions = CookieConsentOptions.parse(options);
    console.log(parsedOptions);
    const setAttribute = setAttributeFunc(element);
    setAttribute(
      CookieConsent.DATA_ATTRIBUTE_OPEN_DURATION,
      parsedOptions.openDuration.toString(),
    );
    setAttribute(
      CookieConsent.DATA_ATTRIBUTE_CLOSE_DURATION,
      parsedOptions.closeDuration.toString(),
    );
    setAttribute(
      CookieConsent.DATA_ATTRIBUTE_OPEN_EFFECT,
      parsedOptions.openEffectType.toString(),
    );
    setAttribute(
      CookieConsent.DATA_ATTRIBUTE_CLOSE_EFFECT,
      parsedOptions.closeEffectType.toString(),
    );
    setAttribute(
      CookieConsent.DATA_ATTRIBUTE_POSITION,
      parsedOptions.position.toString(),
    );
    setAttribute(
      CookieConsent.DATA_ATTRIBUTE_COOKIE_EXPIRY,
      parsedOptions.cookieExpiry.toString(),
    );
    setAttribute(
      CookieConsent.DATA_ATTRIBUTE_COOKIE_NAME,
      parsedOptions.cookieName.toString(),
    );
    await element.save();
  }

  static isAlready(element: CompatibleElement) {
    return !!element.getAttribute(CookieConsent.DATA_ATTRIBUTE_BASE);
  }

  // apply the number incremeter to a dom element
  static async apply(element: CompatibleElement) {
    element.setAttribute(CookieConsent.DATA_ATTRIBUTE_BASE, element.id);
  }

  static parse(element: CompatibleElement) {
    const getAttribute = getAttributeFunc(element);

    // at the moment just use default values
    return CookieConsentOptions.parse({
      openDuration: getAttribute(CookieConsent.DATA_ATTRIBUTE_OPEN_DURATION),
      closeDuration: getAttribute(CookieConsent.DATA_ATTRIBUTE_CLOSE_DURATION),
      openEffectType: getAttribute(CookieConsent.DATA_ATTRIBUTE_OPEN_EFFECT),
      closeEffectType: getAttribute(CookieConsent.DATA_ATTRIBUTE_CLOSE_EFFECT),
      position: getAttribute(CookieConsent.DATA_ATTRIBUTE_POSITION),
      cookieName: getAttribute(CookieConsent.DATA_ATTRIBUTE_COOKIE_NAME),
      cookieExpiry: getAttribute(CookieConsent.DATA_ATTRIBUTE_COOKIE_EXPIRY),
    });
  }

  // remove modal from dom element by removing attributes or the complete element and children
  static async remove(element: CompatibleElement, removeElement = false) {
    if (removeElement) {
      await element.detach();
      await element.destroy();
    } else {
      element.removeAttribute(CookieConsent.DATA_ATTRIBUTE_BASE);
      element.removeAttribute(CookieConsent.DATA_ATTRIBUTE_OPEN_EFFECT);
      element.removeAttribute(CookieConsent.DATA_ATTRIBUTE_CLOSE_EFFECT);
      element.removeAttribute(CookieConsent.DATA_ATTRIBUTE_OPEN_DURATION);
      element.removeAttribute(CookieConsent.DATA_ATTRIBUTE_CLOSE_DURATION);
      element.removeAttribute(CookieConsent.DATA_ATTRIBUTE_POSITION);
      element.removeAttribute(CookieConsent.DATA_ATTRIBUTE_COOKIE_NAME);
      element.removeAttribute(CookieConsent.DATA_ATTRIBUTE_COOKIE_EXPIRY);
      await element.save();
    }
  }

  static async insertScriptInBody() {
    const allElements = await webflow.getAllElements();
    const body = allElements[0];

    const scriptElem = webflow.createDOM("script");

    scriptElem.setAttribute("src", CookieConsent.SOURCE_URL);

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
        t.getAttribute("src") === CookieConsent.SOURCE_URL,
    );

    if (scriptExisting.length === 1) {
      const script = scriptExisting[0];
      await script.detach();
      await script.destroy();
    }
  }
}
