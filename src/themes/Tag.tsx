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
    paddingLeft: "3px",
    paddingRight: "3px",
    paddingTop: "3px",
    paddingBottom: "3px",
    borderRadius: "2px",
    background: "rgb(0, 115, 230)",
    position: "relative",
    fontSize: "11px",
    textShadow: "none",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px",
    overflow: "hidden",
    color: "rgb(255, 255, 255)",
  },
});

export const tagTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { default: defaultStyle },
  defaultProps: {
    size: undefined,
    variant: "default",
  },
});
