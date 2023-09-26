import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const baseStyle = definePartsStyle({});

const defaultStyle = definePartsStyle({
  // define the part you're going to style
  label: {
    fontSize: "12px",
  },
});

export const radioTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { default: defaultStyle },
  defaultProps: {
    size: undefined,
    variant: "default",
  },
});
