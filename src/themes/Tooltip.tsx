import { defineStyle, defineStyleConfig, cssVar } from "@chakra-ui/react";
const $arrowBg = cssVar("popper-arrow-bg");

const tooltipBase = defineStyle({});

const tooltipDefault = defineStyle({
  backgroundColor: "#2e2e2e",
  [$arrowBg.variable]: "#2e2e2e",
  color: "#bdbdbd",
  borderColor: "tooltip.borderColor",
  borderRadius: "tooltip.borderRadius",
  fontSize: "11px",
  maxWidth: "90vw",
  marginLeft: "4",
  marginRight: "4",
  fontWeight: "400",
  filter:
    "drop-shadow(rgba(0, 0, 0, 0.6) 0px 0.5px 0px) drop-shadow(rgba(0, 0, 0, 0.18) 0px 2px 6px) drop-shadow(rgba(0, 0, 0, 0.12) 0px 4px 8px) drop-shadow(rgba(0, 0, 0, 0.08) 0px 8px 16px) drop-shadow(rgba(0, 0, 0, 0.06) 0px 12px 25px)",
});

export const tooltipTheme = defineStyleConfig({
  baseStyle: tooltipBase,
  variants: { default: tooltipDefault },
  defaultProps: {
    size: undefined,
    variant: "default",
  },
});
