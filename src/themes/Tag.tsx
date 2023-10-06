import { tagAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const baseStyle = definePartsStyle({});

const defaultStyle = definePartsStyle({
  container: {
    cursor: "text",
    userSelect: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "26px",
    maxWidth: "100%",
    paddingLeft: "6px",
    paddingRight: "6px",
    paddingTop: "0",
    paddingBottom: "0",
    borderRadius: "4px",
    background: "#006acc",
    position: "relative",
    fontSize: "11px",
    textShadow: "none",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px",
    overflow: "hidden",
    color: "rgb(255, 255, 255)",
    minHeight: "unset",
    height: "24px",
  },
});

const optionStyle = definePartsStyle({
  container: {
    cursor: "text",
    userSelect: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "0px",
    maxWidth: "100%",
    paddingLeft: "4px",
    paddingRight: "4px",
    paddingTop: "3px",
    paddingBottom: "3px",
    borderRadius: "4px",
    background: "#006acc",
    position: "relative",
    fontSize: "11.5px",
    fontWeight: "400",
    textShadow: "none",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px",
    overflow: "hidden",
    color: "rgb(255, 255, 255)",
    minHeight: "unset",
    height: "16px",
  },
});

export const tagTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { default: defaultStyle, option: optionStyle },
  defaultProps: {
    size: undefined,
    variant: "default",
  },
});
