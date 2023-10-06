import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const buttonBase = defineStyle({
  _focus: {
    boxShadow: "rgb(36, 150, 255) 0px 0px 0px 1px",
  },
  _focusVisible: {
    boxShadow: "rgb(36, 150, 255) 0px 0px 0px 1px",
  },
  boxShadow:
    "rgba(0, 0, 0, 0.8) 0px 0.5px 1px, rgba(255, 255, 255, 0.12) 0px 0.5px 0.5px inset",
});

const buttonDefault = defineStyle({
  borderWidth: "button.borderWidth",
  borderColor: "button.borderColor",
  borderRadius: "button.borderRadius",
  background:
    "linear-gradient(rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.1) 100%)",
  color: "button.color",
  _hover: {
    background:
      "linear-gradient(rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.16) 100%)",
  },
});

const buttonEnable = defineStyle({
  borderWidth: "button.borderWidth",
  borderColor: "button.borderColor",
  borderRadius: "button.borderRadius",
  backgroundColor: "#006acc",
  color: "rgb(255, 255, 255)",
  _hover: {
    backgroundColor: "#187cd9",
    color: "#e0e0e0",
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

const helpButton = defineStyle({
  height: "16px",
  width: "16px",
  backgroundColor: "#1e1e1e",
  borderRadius: "3px",
  opacity: "0.6",
  _hover: {
    opacity: "1",
  },
  transition: "opacity 150ms ease 0s",
  minWidth: "unset",
  lineHeight: "16px",
  paddingInlineStart: "none",
  paddingInlineEnd: "none",
  fontSize: "10.5px",
  fontWeight: "400",
});

const iconButtonHeader = defineStyle({
  margin: "header.button.margin",
  padding: "header.button.padding",
  background:
    "linear-gradient(rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.1) 100%)",
  color: "button.color",
  borderRadius: "button.borderRadius",
  _hover: {
    background:
      "linear-gradient(rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.16) 100%)",
    color: "button._hover.color",
    borderRadius: "button._hover.borderRadius",
  },
});

const iconButtonHeaderHelp = defineStyle({
  margin: "4px",
  padding: "1px",
  backgroundColor: "header.button.background",
  color: "header.button.color",
  borderRadius: "header.button.borderRadius",
  height: "unset",
  paddingInlineStart: "0",
  paddingInlineEnd: "0",
  minWidth: "unset",
  fontSize: "inherit",
  _hover: {
    backgroundColor: "header.button._hover.background",
    color: "header.button._hover.color",
    borderRadius: "header.button._hover.borderRadius",
  },
});

const selectButton = defineStyle({
  borderWidth: "button.borderWidth",
  borderColor: "button.borderColor",
  borderRadius: "4px",
  background:
    "linear-gradient(rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.1) 100%)",

  color: "#e0e0e0",
  _hover: {
    background:
      "linear-gradient(rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.16) 100%)",
  },
  fontSize: "11px",
  width: "100%",
  textAlign: "left",
  justifyContent: "space-between",
  height: "24px",
  padding: "0px 4px 0px 8px",
  lineHeight: "unset",
  fontWeight: "400",
});

const inputElementButton = defineStyle({
  color: "#a3a3a3",
  borderRadius: "none",
  height: "100%",
  width: "100%",
  lineHeight: "9px",
  minWidth: "15px",
  fontSize: "9px",
  paddingInlineStart: "3px",
  paddingInlineEnd: "3px",
  backgroundColor: "inherit",
  _hover: {
    color: "#e0e0e0",
    background:
      "linear-gradient(rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.16) 100%)",
  },
  textTransform: "uppercase",
});

const leftInputButton = defineStyle({
  color: "rgb(255,255,255)",
  borderRadius: "2px",
  height: "24px",
  width: "35px",
  minWidth: "unset",
  fontSize: "11px",
  backgroundColor: "#006acc",
  transition: "none",
  _expanded: {
    background:
      "linear-gradient(rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.1) 100%)",
  },
  boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px",
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
    background:
      "linear-gradient(rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.16) 100%)",
  },
  boxShadow: "none",
});

export const buttonTheme = defineStyleConfig({
  baseStyle: buttonBase,
  variants: {
    default: buttonDefault,
    enable: buttonEnable,
    warning: buttonWarning,
    icon: iconButtonDefault,
    headerIcon: iconButtonHeader,
    headerHelpIcon: iconButtonHeaderHelp,
    select: selectButton,
    inputElement: inputElementButton,
    leftInputElement: leftInputButton,
    closeInputElement: closeInputButton,
    help: helpButton,
  },
  defaultProps: {
    size: "md",
    variant: "default",
  },
});
