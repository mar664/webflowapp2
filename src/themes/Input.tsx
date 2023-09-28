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
  element: { height: "100%", width: "auto" },
});

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { default: defaultStyle },
  defaultProps: {
    size: undefined,
    variant: "default",
  },
});
