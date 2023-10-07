import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({});

const defaultStyle = definePartsStyle({
  tab: {
    color: "#bdbdbd",
    _hover: { color: "#f5f5f5" },
    borderBottom: "1px solid transparent",
    _selected: {
      color: "#f5f5f5",
      borderBottom: "1px solid #ebebeb",
    },
    marginBottom: "-1px",
  },
  tablist: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.13)",
  },
  tabpanel: {
    padding: "0px",
  },
});

// export the component theme
export const tabsTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { default: defaultStyle },
  defaultProps: {
    size: undefined,
    variant: "default",
  },
});
