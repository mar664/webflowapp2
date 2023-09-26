import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    paddingInlineStart: "6px",
    background: "inputField.background",
    borderColor: "inputField.borderColor",
    color: "inputField.color",
    fontSize: "inputField.fontSize",
  },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });
