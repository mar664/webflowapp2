import { z } from "zod";
import { CompatibleElement } from "../elements/CompatibleElement";
import { ElementModel } from "./ElementModel";
import { TimeUnits } from "../types";

export const NumberIncrementerOptions = z
  .object({
    incrementStart: z.coerce.number().min(0).default(0),
    incrementEnd: z.coerce.number().min(0).default(100),
    percentageVisible: z.coerce.number().min(0).max(100).default(0),
    duration: TimeUnits.default("1000ms"),
    scriptInserted: z.boolean().default(false),
  })
  .refine((data) => data.incrementEnd > data.incrementStart, {
    message: "Increment end must be larger than increment start",
    path: ["incrementEnd"], // path of error
  });

export type NumberIncrementerOptions = z.infer<typeof NumberIncrementerOptions>;

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

export class NumberIncrementer extends ElementModel {
  // set default values for incrementer
  static readonly NAME = "Incrementer";
  static DATA_ATTRIBUTE_BASE = "data-mr-number-incrementer";
  static DATA_ATTRIBUTE_INCREMENT_START = `${NumberIncrementer.DATA_ATTRIBUTE_BASE}-start`;
  static DATA_ATTRIBUTE_INCREMENT_END = `${NumberIncrementer.DATA_ATTRIBUTE_BASE}-end`;
  static DATA_ATTRIBUTE_PERCENTAGE_VISIBLE = `${NumberIncrementer.DATA_ATTRIBUTE_BASE}-percentage-visible`;
  static DATA_ATTRIBUTE_INCREMENT_DURATION = `${NumberIncrementer.DATA_ATTRIBUTE_BASE}-duration`;

  static DEFAULT_INCREMENT_START = 0;
  static DEFAULT_INCREMENT_END = 100;
  static DEFAULT_INCREMENT_DURATION = "1000ms";
  static DEFAULT_UPDATE_INTERVAL = 100; // duration in ms
  static DEFAULT_PERCENTAGE_VISIBLE = 25;

  static SOURCE_URL =
    "https://mar664.github.io/scripts/number-incrementer-v1.js";

  // apply the number incremeter to a dom element
  static async update(
    element: CompatibleElement,
    options: NumberIncrementerOptions,
  ) {
    const setAttribute = setAttributeFunc(element);

    const parsedOptions = NumberIncrementerOptions.parse(options);

    setAttribute(
      NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_START,
      parsedOptions.incrementStart.toString(),
    );
    setAttribute(
      NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_END,
      parsedOptions.incrementEnd.toString(),
    );
    setAttribute(
      NumberIncrementer.DATA_ATTRIBUTE_PERCENTAGE_VISIBLE,
      parsedOptions.percentageVisible.toString(),
    );
    setAttribute(
      NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_DURATION,
      parsedOptions.duration.toString(),
    );
    await element.save();
  }

  // apply the number incremeter to a dom element
  static apply(element: DOMElement) {
    element.setAttribute(NumberIncrementer.DATA_ATTRIBUTE_BASE, "true");
  }

  // remove number incrementer from dom element by removing attributes
  static async remove(element: CompatibleElement, removeElement = false) {
    if (removeElement) {
      await element.detach();
      await element.destroy();
    } else {
      element.removeAttribute(NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_START);
      element.removeAttribute(NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_END);
      element.removeAttribute(
        NumberIncrementer.DATA_ATTRIBUTE_PERCENTAGE_VISIBLE,
      );
      element.removeAttribute(
        NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_DURATION,
      );
      element.removeAttribute(NumberIncrementer.DATA_ATTRIBUTE_BASE);
      await element.save();
    }
  }

  static isAlready(element: CompatibleElement) {
    return !!element.getAttribute(NumberIncrementer.DATA_ATTRIBUTE_BASE);
  }

  static parse(element: CompatibleElement) {
    const getAttribute = getAttributeFunc(element);

    return NumberIncrementerOptions.parse({
      incrementStart: getAttribute(
        NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_START,
      ),
      incrementEnd: getAttribute(
        NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_END,
      ),
      percentageVisible: getAttribute(
        NumberIncrementer.DATA_ATTRIBUTE_PERCENTAGE_VISIBLE,
      ),
      duration: getAttribute(
        NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_DURATION,
      ),
    });
  }
}
