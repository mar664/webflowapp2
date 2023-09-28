import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

// This function creates a set of function that helps us create multipart component styles.
const helpers = createMultiStyleConfigHelpers(["combolist", "item"]);

const combolistTheme = helpers.defineMultiStyleConfig({
  baseStyle: {
    combolist: {
      fontSize: "11px",
      color: "rgb(217, 217, 217)",
      backgroundColor: "rgb(77, 77, 77)",
      borderColor: "rgb(54, 54, 54)",
      borderRadius: "3px",
      borderWidth: "1px",
      borderStyle: "solid",
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 10px",
      flex: 1,
      overflowY: "auto",
      mt: 0,
      position: "absolute",
    },
    item: {
      paddingTop: "4px",
      paddingBottom: "4px",
      paddingLeft: "8px",
      paddingRight: "8px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      flexDir: "row",
      color: "rgb(235, 235, 235)",
      backgroundColor: "rgb(77, 77, 77)",
      _hover: {
        bg: "rgb(94, 94, 94)",
      },
      _focus: {
        bg: "rgb(94, 94, 94)",
      },
    },
  },
  variants: {
    selected: {
      item: {
        color: "rgb(235, 235, 235)",
        backgroundColor: "rgb(94, 94, 94)",
      },
    },
  },
  sizes: {
    sm: { item: { minWidth: "80px" } },
    md: { item: { minWidth: "140px" } },
    lg: { item: { minWidth: "180px" } },
  },
  defaultProps: {
    size: "lg",
  },
});

export { combolistTheme };
