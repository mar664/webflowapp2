import { defineStyle, defineStyleConfig, cssVar } from "@chakra-ui/react";
const $arrowBg = cssVar("popper-arrow-bg");

const tooltipBase = defineStyle({});

const tooltipDefault = defineStyle({
  backgroundColor: "tooltip.background",
  [$arrowBg.variable]: "rgb(235, 235, 235)",
  color: "tooltip.color",
  borderColor: "tooltip.borderColor",
  borderRadius: "tooltip.borderRadius",
  fontSize: "11px",
  maxWidth: "90vw",
  marginLeft: "4",
  marginRight: "4",
  fontWeight: "500",
});

export const tooltipTheme = defineStyleConfig({
  baseStyle: tooltipBase,
  variants: { default: tooltipDefault },
  defaultProps: {
    size: undefined,
    variant: "default",
  },
});
