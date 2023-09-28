import { TimeUnitsEnum } from "./types";

export const TIME_UNITS_OPTIONS = Object.entries(TimeUnitsEnum.enum).map(
  ([key, value]) => ({ value, label: key }),
);

console.log(TIME_UNITS_OPTIONS);
