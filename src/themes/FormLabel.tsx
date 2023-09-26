import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const formLabelBase = defineStyle({
  marginBottom: "0",
  fontSize: "label.fontSize",
});

export const formLabelTheme = defineStyleConfig({
  baseStyle: formLabelBase,
});
