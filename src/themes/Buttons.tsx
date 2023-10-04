import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const buttonBase = defineStyle({
  _focus: {
    boxShadow: "rgb(36, 150, 255) 0px 0px 0px 1px",
  },
  _focusVisible: {
    boxShadow: "rgb(36, 150, 255) 0px 0px 0px 1px",
  },
});

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

const selectButton = defineStyle({
  borderWidth: "button.borderWidth",
  borderColor: "button.borderColor",
  borderRadius: "button.borderRadius",
  backgroundColor: "button.background",
  color: "button.color",
  _hover: {
    backgroundColor: "button._hover.background",
  },
  fontSize: "11px",
  width: "100%",
  textAlign: "left",
  justifyContent: "space-between",
});

const inputElementButton = defineStyle({
  color: "rgb(171,171,171)",
  borderRadius: "none",
  height: "100%",
  width: "100%",
  minWidth: "10px",
  fontSize: "11px",
  paddingInlineStart: "2px",
  paddingInlineEnd: "2px",
  backgroundColor: "inherit",
  _hover: {
    color: "rgb(246,246,246)",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
});

const leftInputButton = defineStyle({
  color: "rgb(255,255,255)",
  borderRadius: "2px",
  height: "24px",
  width: "35px",
  minWidth: "unset",
  fontSize: "11px",
  backgroundColor: "rgb(0, 115, 230)",
  transition: "none",
  _expanded: { backgroundColor: "rgb(94, 94, 94)" },
});

const closeInputButton = defineStyle({
  borderWidth: "button.borderWidth",
  borderColor: "transparent",
  borderRadius: "button.borderRadius",
  backgroundColor: "inherit",
  color: "button.color",
  width: "20px",
  height: "20px",
  minWidth: "unset",
  _hover: {
    backgroundColor: "button._hover.background",
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
    select: selectButton,
    inputElement: inputElementButton,
    leftInputElement: leftInputButton,
    closeInputElement: closeInputButton,
  },
  defaultProps: {
    size: "md",
    variant: "default",
  },
});
