import { numberInputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(numberInputAnatomy.keys);

const baseStyle = definePartsStyle({});

const defaultStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    paddingInlineStart: "6px",
    paddingInlineEnd: "0",
    bg: "rgba(0, 0, 0, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.14)",
    borderRadius: "4px",
    borderWidth: "1px",
    color: "#f5f5f5",
    fontSize: "inputField.fontSize",
    height: "24px",
    boxShadow:
      "rgba(0, 0, 0, 0.13) 0px 1px 1px -1px inset, rgba(0, 0, 0, 0.17) 0px 3px 3px -3px inset, rgba(0, 0, 0, 0.17) 0px 4px 4px -4px inset, rgba(0, 0, 0, 0.17) 0px 8px 8px -8px inset, rgba(0, 0, 0, 0.13) 0px 12px 12px -12px inset, rgba(0, 0, 0, 0.13) 0px 16px 16px -16px inset",
    _focus: { boxShadow: "inputField._focus.boxShadow" },
  },
});

export const numberInputTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { default: defaultStyle },
  defaultProps: {
    size: undefined,
    variant: "default",
  },
});
