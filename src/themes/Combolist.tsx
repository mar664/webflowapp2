import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

// This function creates a set of function that helps us create multipart component styles.
const helpers = createMultiStyleConfigHelpers([
  "container",
  "heading",
  "combolist",
  "item",
]);

const combolistTheme = helpers.defineMultiStyleConfig({
  baseStyle: {
    container: {
      fontSize: "11px",
      color: "rgb(217, 217, 217)",
      backgroundColor: "rgb(77, 77, 77)",
      borderColor: "rgb(54, 54, 54)",
      borderRadius: "3px",
      borderWidth: "1px",
      borderStyle: "solid",
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 10px",
      position: "absolute",
      marginTop: "10px",
      marginBottom: "10px",
    },
    heading: {
      background: "rgb(64, 64, 64)",
      fontWeight: "bold",
      paddingLeft: "6px",
      paddingTop: "4px",
      paddingBottom: "4px",
    },
    combolist: {
      flex: 1,
      overflowY: "auto",
      mt: 0,
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
      _selected: {
        backgroundColor: "rgb(94, 94, 94)",
        color: "rgb(235, 235, 235)",
      },
    },
    row: { position: "absolute", top: 0, left: 0, width: "100%" },
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
    sm: { container: { minWidth: "80px" } },
    md: { container: { minWidth: "140px" } },
    lg: { container: { minWidth: "180px" } },
  },
  defaultProps: {
    size: "lg",
  },
});

export { combolistTheme };
