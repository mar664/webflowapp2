// This function creates a set of function that helps us create multipart component styles.

import { defineStyleConfig } from "@chakra-ui/react";

const combolistItemTheme = defineStyleConfig({
  baseStyle: {},
  variants: {
    selected: {
      color: "rgb(235, 235, 235)",
      backgroundColor: "rgb(94, 94, 94)",
    },
  },
});

export { combolistItemTheme };
