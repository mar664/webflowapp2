import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const tooltipBase = defineStyle({});

const tooltipDefault = defineStyle({
  backgroundColor: "tooltip.background",
  color: "tooltip.color",
  borderColor: "tooltip.borderColor",
  borderRadius: "tooltip.borderRadius",
  fontSize: "tooltip.fontSize",
  maxWidth: "90vw",
  margin: "4",
});

export const tooltipTheme = defineStyleConfig({
  baseStyle: tooltipBase,
  variants: { default: tooltipDefault },
  defaultProps: {
    size: undefined,
    variant: "default",
  },
});
