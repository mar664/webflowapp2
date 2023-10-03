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
    bg: "inputField.background",
    borderColor: "inputField.borderColor",
    color: "inputField.color",
    fontSize: "inputField.fontSize",
    _focus: { boxShadow: "inputField._focus.boxShadow" },
    _placeholder: {
      color: "#696969",
    },
  },
  element: {
    width: "auto",
    color: "rgb(171,171,171)",
    borderRadius: "none",
    height: "calc(100% - 2px)",
    paddingInlineStart: "3px",
    paddingInlineEnd: "3px",
    minWidth: "10px",
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
    _placeholder: { fontSize: "11px", color: "rgb(117, 117, 117)" },
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
