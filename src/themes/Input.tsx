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

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { default: defaultStyle },
  defaultProps: {
    size: undefined,
    variant: "default",
  },
});
