import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const formLabelBase = defineStyle({
  marginBottom: "0",
  fontSize: "label.fontSize",
  _focusVisible: {
    boxShadow: "rgb(36, 150, 255) 0px 0px 0px 1px",
  },
});

export const formLabelTheme = defineStyleConfig({
  baseStyle: formLabelBase,
});
