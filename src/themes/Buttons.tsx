import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const buttonBase = defineStyle({});

const buttonDefault = defineStyle({
  borderWidth: "button.borderWidth",
  borderColor: "button.borderColor",
  borderRadius: "button.borderRadius",
  backgroundColor: "button.background",
  color: "button.color",
  _hover: {
    backgroundColor: "button._hover.background",
  },
});

const buttonEnable = defineStyle({
  borderWidth: "button.borderWidth",
  borderColor: "button.borderColor",
  borderRadius: "button.borderRadius",
  backgroundColor: "rgb(0, 115, 230)",
  color: "rgb(255, 255, 255)",
  _hover: {
    backgroundColor: "rgb(0, 132, 255)",
    color: "rgb(246, 246, 246)",
  },
});

const buttonWarning = defineStyle({
  borderWidth: "button.borderWidth",
  borderColor: "button.borderColor",
  borderRadius: "button.borderRadius",
  backgroundColor: "#E53E3E",
  color: "rgb(255, 255, 255)",
  _hover: {
    backgroundColor: "#F56565",
    color: "rgb(246, 246, 246)",
  },
});

const iconButtonDefault = defineStyle({
  backgroundColor: "button.background",
  borderWidth: "button.borderWidth",
  borderColor: "button.borderColor",
  borderRadius: "button.borderRadius",
  color: "button.color",
  _hover: {
    backgroundColor: "button._hover.background",
  },
});

const iconButtonHeader = defineStyle({
  margin: "header.button.margin",
  padding: "header.button.padding",
  backgroundColor: "header.button.background",
  color: "header.button.color",
  borderRadius: "header.button.borderRadius",
  _hover: {
    backgroundColor: "header.button._hover.background",
    color: "header.button._hover.color",
    borderRadius: "header.button._hover.borderRadius",
  },
});

export const buttonTheme = defineStyleConfig({
  baseStyle: buttonBase,
  variants: {
    default: buttonDefault,
    enable: buttonEnable,
    warning: buttonWarning,
    icon: iconButtonDefault,
    headerIcon: iconButtonHeader,
  },
  defaultProps: {
    size: "md",
    variant: "default",
  },
});

const iconButtonBase = defineStyle({});

export const iconButtonBaseTheme = defineStyleConfig({
  baseStyle: iconButtonBase,
  variants: { default: iconButtonDefault, header: iconButtonHeader },
  defaultProps: {
    size: "md",
    variant: "default",
  },
});
