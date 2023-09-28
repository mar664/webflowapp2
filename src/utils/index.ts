import { CompatibleElement } from "../elements/CompatibleElement";
import { ElementModel } from "../models/ElementModel";
import {
  TimeUnits,
  days,
  hours,
  milliseconds,
  minutes,
  months,
  seconds,
  years,
} from "../types";

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
      return { value: Number.parseInt(isMinutes.data.slice(0, -2)), unit: "m" };
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
        value: Number.parseInt(isMonths.data.slice(0, -3)),
        unit: "mth",
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
