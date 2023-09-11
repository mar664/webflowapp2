import { z } from "zod";

export const NumberIncrementerOptions = z
  .object({
    incrementStart: z.number().min(0),
    incrementEnd: z.number().min(0),
    percentageVisible: z.number().min(0).max(100),
    duration: z.number().min(0),
  })
  .refine((data) => data.incrementEnd > data.incrementStart, {
    message: "Increment end must be larger than increment start",
    path: ["incrementEnd"], // path of error
  });

export type NumberIncrementerOptions = z.infer<typeof NumberIncrementerOptions>;

export class NumberIncrementer {
  // set default values for incrementer
  static DATA_ATTRIBUTE_BASE = "data-mr-number-incrementer";
  static DATA_ATTRIBUTE_INCREMENT_START = `${NumberIncrementer.DATA_ATTRIBUTE_BASE}-start`;
  static DATA_ATTRIBUTE_INCREMENT_END = `${NumberIncrementer.DATA_ATTRIBUTE_BASE}-end`;
  static DATA_ATTRIBUTE_PERCENTAGE_VISIBLE = `${NumberIncrementer.DATA_ATTRIBUTE_BASE}-percentage-visible`;
  static DATA_ATTRIBUTE_INCREMENT_DURATION = `${NumberIncrementer.DATA_ATTRIBUTE_BASE}-duration`;

  static DEFAULT_INCREMENT_START = 0;
  static DEFAULT_INCREMENT_END = 100;
  static DEFAULT_INCREMENT_DURATION = 1000; // duration in ms
  static DEFAULT_UPDATE_INTERVAL = 100; // duration in ms
  static DEFAULT_PERCENTAGE_VISIBLE = 25;

  static SOURCE_URL = "http://localhost:1337/number-incrementer.js";

  // apply the number incremeter to a dom element
  static async update(element: AnyElement, options: NumberIncrementerOptions) {
    const parsedOptions = NumberIncrementerOptions.parse(options);
    console.log(parsedOptions);
    if (element.type === "DOM") {
      element.setAttribute(
        NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_START,
        parsedOptions.incrementStart.toString(),
      );
      element.setAttribute(
        NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_END,
        parsedOptions.incrementEnd.toString(),
      );
      element.setAttribute(
        NumberIncrementer.DATA_ATTRIBUTE_PERCENTAGE_VISIBLE,
        parsedOptions.percentageVisible.toString(),
      );
      element.setAttribute(
        NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_DURATION,
        parsedOptions.duration.toString(),
      );
      await element.save();
    }
  }

  // apply the number incremeter to a dom element
  static async apply(element: AnyElement) {
    if (element.type === "DOM") {
      element.setAttribute(NumberIncrementer.DATA_ATTRIBUTE_BASE, "true");
      await element.save();
    }
  }

  // remove number incrementer from dom element by removing attributes
  static async remove(element: AnyElement) {
    if (element.type === "DOM") {
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

  static isAlready(element: AnyElement) {
    if (element.type === "DOM") {
      return !!element.getAttribute(NumberIncrementer.DATA_ATTRIBUTE_BASE);
    }
    return false;
  }

  static parse(element: AnyElement) {
    if (element && element.type === "DOM") {
      return {
        incrementStart:
          parseInt(
            element.getAttribute(
              NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_START,
            ) as string,
          ) || NumberIncrementer.DEFAULT_INCREMENT_START,
        incrementEnd:
          parseInt(
            element.getAttribute(
              NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_END,
            ) as string,
          ) || NumberIncrementer.DEFAULT_INCREMENT_END,
        percentageVisible:
          parseInt(
            element.getAttribute(
              NumberIncrementer.DATA_ATTRIBUTE_PERCENTAGE_VISIBLE,
            ) as string,
          ) || NumberIncrementer.DEFAULT_PERCENTAGE_VISIBLE,
        duration:
          parseInt(
            element.getAttribute(
              NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_DURATION,
            ) as string,
          ) || NumberIncrementer.DEFAULT_INCREMENT_DURATION,
      };
    }
  }

  static async insertScriptInBody() {
    const allElements = await webflow.getAllElements();
    const body = allElements[0];

    const scriptElem = webflow.createDOM("script");

    scriptElem.setAttribute("src", NumberIncrementer.SOURCE_URL);

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
        t.getAttribute("src") === NumberIncrementer.SOURCE_URL,
    );

    if (scriptExisting.length === 1) {
      const script = scriptExisting[0];
      await script.detach();
      await script.destroy();
    }
  }
}
