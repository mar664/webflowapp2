import { CompatibleComponents, TimeUnitsEnum } from "./types";

export const TIME_UNITS_OPTIONS = Object.entries(TimeUnitsEnum.enum).map(
  ([key, value]) => ({ value, label: key }),
);

export const INIT_COMPATIBLE_COMPONENTS: CompatibleComponents = {
  numberIncrementer: {
    isAlready: false,
    isApplicable: false,
  },
  modal: {
    isAlready: false,
    isApplicable: false,
  },
  cookieConsent: {
    isAlready: false,
    isApplicable: false,
  },
};
