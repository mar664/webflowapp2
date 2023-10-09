import { CompatibleElement } from "../elements/CompatibleElement";
import { CookieConsentCompatibleElement } from "../elements/CookieConsentCompatibleElement";
import { ModalCompatibleElement } from "../elements/ModalCompatibleElement";
import { NumberIncrementerCompatibleElement } from "../elements/NumberIncrementerCompatibleElement";
import { z } from "zod";
import {
  days,
  hours,
  milliseconds,
  minutes,
  months,
  seconds,
  years,
} from "../types";
import { INIT_COMPATIBLE_COMPONENTS, svgElementsMap } from "../constants";
import { ElementModel } from "../models/ElementModel";
import cssJS from "./cssJS";
import parseSides from 'parse-css-sides';

export function removeChars(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-");
}

export function toAllStartUppercase(str: string) {
  return str
    .split(" ")
    .map((word: string) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}

export const isElementHidden = (
  currentElement: CompatibleElement | null,
  ElementType: typeof ElementModel,
) => {
  if (currentElement) {
    const modalStyleElement =
      currentElement.element.children &&
      currentElement.element.getChildren()[0];
    if (
      modalStyleElement &&
      modalStyleElement.type == "DOM" &&
      modalStyleElement.getTag() === "style"
    ) {
      return (
        modalStyleElement.getAttribute(ElementType.DATA_ATTRIBUTE_VISIBLE) ===
        null
      );
    }
  }
  return false;
};

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function timeUnitToNumberValue(val: string | undefined) {
  if (val) {
    const isMilli = milliseconds.safeParse(val);
    if (isMilli.success) {
      return { value: Number.parseInt(isMilli.data.slice(0, -2)), unit: "ms" };
    }
    const isSeconds = seconds.safeParse(val);
    if (isSeconds.success) {
      return {
        value: Number.parseInt(isSeconds.data.slice(0, -1)),
        unit: "s",
      };
    }
    const isMinutes = minutes.safeParse(val);
    if (isMinutes.success) {
      return { value: Number.parseInt(isMinutes.data.slice(0, -1)), unit: "m" };
    }
    const isHours = hours.safeParse(val);
    if (isHours.success) {
      return {
        value: Number.parseInt(isHours.data.slice(0, -1)),
        unit: "h",
      };
    }
    const isDays = days.safeParse(val);
    if (isDays.success) {
      return {
        value: Number.parseInt(isDays.data.slice(0, -1)),
        unit: "d",
      };
    }
    const isMonths = months.safeParse(val);
    if (isMonths.success) {
      return {
        value: Number.parseInt(isMonths.data.slice(0, -2)),
        unit: "mo",
      };
    }
    const isYears = years.safeParse(val);
    if (isYears.success) {
      return {
        value: Number.parseInt(isYears.data.slice(0, -1)),
        unit: "y",
      };
    }
  }
  return undefined;
}

export function componentsCompatible(
  { isNumberIncrementer, isModal, isCookieConsent }: Record<string, boolean>,
  element: CompatibleElement,
) {
  // clone initial object
  const compatible = { ...INIT_COMPATIBLE_COMPONENTS };

  compatible.numberIncrementer = {
    isAlready: isNumberIncrementer,
    isApplicable:
      isModal || isCookieConsent
        ? false
        : NumberIncrementerCompatibleElement.isCompatible(element), // an element can only be of one type
  };

  compatible.modal = {
    isAlready: isModal,
    isApplicable:
      isNumberIncrementer || isCookieConsent
        ? false
        : ModalCompatibleElement.isCompatible(element), // an element can only be of one type
  };

  compatible.cookieConsent = {
    isAlready: isCookieConsent,
    isApplicable:
      isNumberIncrementer || isModal
        ? false
        : CookieConsentCompatibleElement.isCompatible(element), // an element can only be of one type
  };

  console.log(compatible);

  return compatible;
}

interface LoaderArg {
  params: { elementId: string; isNew: string };
}

export function loaderFactory(ElementType: typeof CompatibleElement) {
  return async ({ params: { elementId, isNew } }: LoaderArg) => {
    let element = null;
    if (isNew === "true") {
      element = (await webflow.getAllElements()).find(
        (e) => e.id === elementId,
      );
    } else {
      element = await webflow.getSelectedElement();
    }

    if (!element) {
      throw new Error(`${ElementType.name} element not found`);
    }
    if (element.id !== elementId) {
      throw new Error("Incorrect element");
    }
    const compatibleElement = ElementType.fromElement(element);
    if (compatibleElement !== null) {
      return { element: compatibleElement };
    }
    throw new Error(`Compatible ${ElementType.name} element not found`);
  };
}

const obj = z.object({ scriptInserted: z.boolean().default(false) });
export type Options = z.infer<typeof obj>;

const obj2 = z
  .object({ scriptInserted: z.boolean().default(false) })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .refine(() => {});
export type Options2 = z.infer<typeof obj2>;

export const fetchDefaultFormValues = <T extends Options>(
  element: CompatibleElement,
  ElementType: typeof ElementModel,
  ElementTypeOptions: typeof obj | typeof obj2,
) => {
  return async () => {
    const allElements = await webflow.getAllElements();
    const scriptExisting = allElements.filter(
      (t) =>
        t.type === "DOM" &&
        t.getTag() === "script" &&
        t.getAttribute("src") === ElementType.SOURCE_URL,
    );

    if (element) {
      const parsedElement = ElementType.parse(element) as unknown as T;
      if (!parsedElement) {
        throw new Error(`Error parsing ${ElementType.NAME} attributes`);
      }
      parsedElement.scriptInserted = scriptExisting.length !== 0;
      return parsedElement;
    }

    return ElementTypeOptions.parse({
      scriptInserted: scriptExisting.length !== 0,
    }) as T;
  };
};

export const isInViewport = (targetElement: HTMLElement) => {
  const rect = targetElement.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export function getAllChildren(element: AnyElement, output = [] as string[]) {
  if (element.children) {
    element.getChildren().forEach((c) => {
      getAllChildren(c, output);
    });
  }
  output.push(element.id);

  return output;
}

async function getValidClassName(tagName: string, i = 1): Promise<string> {
  const style = await webflow.getStyleByName(`${tagName} ${i}`);
  if (style) {
    return await getValidClassName(tagName, i + 1);
  }
  return `${tagName} ${i}`;
}

interface CssRules {
  selector: string;
  rules: { directive: string; value: string }[];
}

export async function iterateChildren(
  element: HTMLElement,
  createClasses: boolean,
  convertStylesToClass: boolean,
  parsedStyles: CssRules[] | null,
): Promise<DOMElement | DOMElement[]> {
  // get tag name and convert to correct case for svgs
  const tagName =
    element.tagName.toLowerCase() in svgElementsMap
      ? svgElementsMap[element.tagName.toLowerCase()]
      : element.tagName.toLowerCase() === "body"
      ? "body"
      : element.tagName.toLowerCase();

  if (!tagName) {
    throw new Error(`Tagname ${element.tagName.toLowerCase()} is not valid`);
  }

  const webflowElement = webflow.createDOM(tagName);

  for (const attr of Array.from(element.attributes)) {
    if (attr.name.toLowerCase() === "style" && convertStylesToClass) {
      const newStyle = webflow.createStyle(await getValidClassName(tagName));
      // convert styles tag to a class
      const resultMap: PropertyMap = {};
      attr.value
        .split(";")
        .filter((v) => v !== "")
        .forEach((v) => {
          const [name, val] = v.split(":");
          resultMap[name.trim() as StyleProperty] = val.trim();
        });
      newStyle.setProperties(resultMap);
      await newStyle.save();
      webflowElement.setStyles([
        ...(await webflowElement.getStyles()),
        newStyle,
      ]);
    } else if (attr.name.toLowerCase() === "class" && createClasses) {
      for (const className of Array.from(element.classList)) {
        const classExists = await webflow.getStyleByName(className);
        if (!classExists) {
          const resultMap: PropertyMap = {};
          const newStyle = webflow.createStyle(className);
          parsedStyles?.forEach((style) => {
            if (style?.selector === `.${className}`) {
              style.rules.forEach((rule) => {
                resultMap[rule.directive as StyleProperty] = rule.value;
              });
            }
          });
          newStyle.setProperties(resultMap);
          await newStyle.save();
          webflowElement.setStyles([
            ...(await webflowElement.getStyles()),
            newStyle,
          ]);
        } else {
          webflowElement.setStyles([
            ...(await webflowElement.getStyles()),
            classExists,
          ]);
        }
      }
    } else {
      webflowElement.setAttribute(attr.name, attr.value);
    }
  }

  const webflowChildren: DOMElement[] = [];
  const children = element.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    webflowChildren.push(
      (await iterateChildren(
        child as HTMLElement,
        createClasses,
        convertStylesToClass,
        parsedStyles,
      )) as DOMElement,
    );
  }

  if (tagName !== "body") webflowElement.setChildren(webflowChildren);

  if (!children.length) {
    webflowElement.setTextContent(element.textContent as string);
  }

  return tagName === "body" ? webflowChildren : webflowElement;
}

export async function convertHTMLToWebflowElements(
  text: string,
  createClasses = true,
  convertStylesToClass = true,
) {
  const parser = new DOMParser();

  const doc = parser.parseFromString(text, "text/html");

  const cssParser = new cssJS();
  const style = doc.head.querySelector("style");
  if (style && style.textContent) {
    const css = cssParser.parseCSS(style.textContent);
    return iterateChildren(doc.body, createClasses, convertStylesToClass, css);
  }

  return iterateChildren(doc.body, createClasses, convertStylesToClass, null);
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
const border = require("css-border-property");

export async function convertCSSToWebflowStyles(CSS: string) {
  const cssParser = new cssJS();
  const css: CssRules[] = cssParser.parseCSS(CSS);
  console.log(css);

  css.forEach(async (style) => {
    const pattern = /^\.([0-9\-a-zA-Z_]+)$/;
    const matches = style.selector.match(pattern);
    if (matches) {
      console.log(matches);
      const existingStyle = await webflow.getStyleByName(matches[1]);
      if (!existingStyle) {
        const resultMap: PropertyMap = {};

        const newStyle = webflow.createStyle(matches[1]);
        style.rules.forEach((rule) => {
          if (rule.directive === "border") {
            border.parse(rule.value).forEach((b:{property:string; value: string}) => {
              ["top", "bottom", "left", "right"].forEach((side) => {
                resultMap[
                  b.property.replace(
                    "border",
                    `border-${side}`,
                  ) as StyleProperty
                ] = b.value;
              });
            });
          } else if(rule.directive === "margin"  || rule.directive === "padding") {
            Object.entries(parseSides(rule.value)).forEach(([k,v])=>{
              if(k==="important") return
              resultMap[`${rule.directive}-${k}`as StyleProperty
              ] = v;
            });

          } else {
            resultMap[rule.directive as StyleProperty] = rule.value;
          }
        });
        newStyle.setProperties(resultMap);
        await newStyle.save();
      }
    }
  });
}
