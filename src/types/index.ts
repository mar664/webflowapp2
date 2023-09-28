import { type } from "os";
import { z } from "zod";
export type VisibilityHandler = {
  toggleVisibility: () => Promise<void>;
  isHidden: boolean;
  hide: () => Promise<void>;
  show: () => Promise<void>;
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
}

export const seconds = z.custom<`${number}s`>((val) => {
  return typeof val === "string" ? /^\d+s$/.test(val) : false;
});

export type seconds = z.infer<typeof seconds>;

export const milliseconds = z.custom<`${number}ms`>((val) => {
  return typeof val === "string" ? /^\d+ms$/.test(val) : false;
});

export type milliseconds = z.infer<typeof milliseconds>;

export const TimeUnits = z
  .union([seconds, milliseconds])
  .default(milliseconds.parse("1000ms"));

export type TimeUnits = z.infer<typeof TimeUnits>;
