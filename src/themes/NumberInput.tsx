import { numberInputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(numberInputAnatomy.keys);

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

export const numberInputTheme = defineMultiStyleConfig({ baseStyle });
