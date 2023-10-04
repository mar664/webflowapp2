import { z } from "zod";
export type VisibilityHandler = {
  toggleVisibility: () => Promise<void>;
  isHidden: boolean;
  hide: (force?: boolean) => Promise<void>;
  show: (force?: boolean) => Promise<void>;
};

export type RemoveHandler = (removeElement?: boolean) => Promise<boolean>;

export interface CompatibleComponents {
  numberIncrementer: {
    isAlready: boolean;
    isApplicable: boolean;
  };
  modal: {
    isAlready: boolean;
    isApplicable: boolean;
  };
  cookieConsent: {
    isAlready: boolean;
    isApplicable: boolean;
  };
}

export interface Option {
  value: string;
  label: string;
  descripion?: string;
}

export const milliseconds = z.custom<`${number}ms`>((val) => {
  return typeof val === "string" ? /^\d+ms$/.test(val) : false;
});

export type milliseconds = z.infer<typeof milliseconds>;

export const seconds = z.custom<`${number}s`>((val) => {
  return typeof val === "string" ? /^\d+s$/.test(val) : false;
});

export type seconds = z.infer<typeof seconds>;

export const minutes = z.custom<`${number}m`>((val) => {
  return typeof val === "string" ? /^\d+m$/.test(val) : false;
});

export type minutes = z.infer<typeof minutes>;

export const hours = z.custom<`${number}ms`>((val) => {
  return typeof val === "string" ? /^\d+h$/.test(val) : false;
});

export type hours = z.infer<typeof hours>;

export const days = z.custom<`${number}d`>((val) => {
  return typeof val === "string" ? /^\d+d$/.test(val) : false;
});

export type days = z.infer<typeof days>;

export const months = z.custom<`${number}mo`>((val) => {
  return typeof val === "string" ? /^\d+mo$/.test(val) : false;
});

export type months = z.infer<typeof months>;

export const years = z.custom<`${number}y`>((val) => {
  return typeof val === "string" ? /^\d+y$/.test(val) : false;
});

export type years = z.infer<typeof years>;

export const TimeUnits = z.union([
  milliseconds,
  seconds,
  minutes,
  hours,
  days,
  months,
  years,
]);

enum TimeUnitsNativeEnum {
  Milliseconds = "ms",
  Seconds = "s",
  Minutes = "m",
  Hours = "h",
  Days = "d",
  Months = "mo",
  Years = "y",
}

export const TimeUnitsEnum = z.nativeEnum(TimeUnitsNativeEnum);
export type TimeUnitsEnum = z.infer<typeof TimeUnitsEnum>; // Fruits

export type TimeUnits = z.infer<typeof TimeUnits>;

export enum CombolistPosition {
  Above,
  Below,
}
