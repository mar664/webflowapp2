import {
  removeChars,
  timeUnitToNumberValue,
  toAllStartUppercase,
} from "./index";

describe("Testing utils function", () => {
  it("timeUnitToNumberValue return correct output", () => {
    expect(timeUnitToNumberValue("100s")).toEqual({ value: 100, unit: "s" });
    expect(timeUnitToNumberValue("1000s")).toEqual({ value: 1000, unit: "s" });
    expect(timeUnitToNumberValue("100ms")).toEqual({ value: 100, unit: "ms" });
    expect(timeUnitToNumberValue("1001d")).toEqual({ value: 1001, unit: "d" });
  });

  it("removeChars return correct output", () => {
    expect(removeChars("dffdfd fdfdf dfdfdf")).toEqual("dffdfd-fdfdf-dfdfdf");
    expect(removeChars("dffdf$%&d fdfdf df#$*dfdf")).toEqual(
      "dffdfd-fdfdf-dfdfdf",
    );
  });

  it("toAllStartUppercase return correct output", () => {
    expect(toAllStartUppercase("dffdfd fdfdf dfdfdf")).toEqual(
      "Dffdfd Fdfdf Dfdfdf",
    );
  });
});
