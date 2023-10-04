import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({});

const defaultStyle = definePartsStyle({
  dialog: {
    marginTop: "alertDialog.margin",
    background: "alertDialog.background",
    color: "alertDialog.color",
    borderColor: "alertDialog.borderColor",
    borderRadius: "alertDialog.borderRadius",
    boxShadow: "alertDialog.boxShadow",
    maxWidth: "95%",
  },
  header: {
    fontSize: "alertDialog.header.fontSize",
    fontWeight: "alertDialog.header.fontWeight",
    borderColor: "alertDialog.header.borderColor",
    borderBottomWidth: "alertDialog.header.borderBottomWidth",
    paddingLeft: "alertDialog.header.paddingLeft",
    paddingRight: "alertDialog.header.paddingRight",
    paddingTop: "alertDialog.header.paddingTop",
    paddingBottom: "alertDialog.header.paddingBottom",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    fontSize: "alertDialog.body.fontSize",
    paddingInlineStart: "4",
    paddingInlineEnd: "4",
  },
  closeButton: {
    borderRadius: "3px",
    _hover: {
      background: "rgba(255, 255, 255, 0.1)",
    },
    _focus: {
      boxShadow: "rgb(36, 150, 255) 0px 0px 0px 1px",
    },
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    default: defaultStyle,
  },
  defaultProps: {
    variant: "default",
  },
});
