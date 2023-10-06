import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

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
    _placeholder: { fontSize: "11px", color: "#a3a3a3" },
  },
  element: {
    width: "auto",
    color: "rgb(171,171,171)",
    borderRadius: "none",
    height: "calc(100% - 2px)",
    paddingInlineStart: "3px",
    paddingInlineEnd: "3px",
    minWidth: "15px",
    fontSize: "11px",
    backgroundColor: "inherit",
  },
});

const styleSearchStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    minHeight: "28px",
    paddingLeft: "0px",
    fontSize: "11px",
    color: "rgb(217, 217, 217)",
    maxW: "full",
    height: "auto",
    background: "none",
    _placeholder: { fontSize: "11px", color: "#a3a3a3" },
  },
});

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { default: defaultStyle, styleSearch: styleSearchStyle },
  defaultProps: {
    size: undefined,
    variant: "default",
  },
});
