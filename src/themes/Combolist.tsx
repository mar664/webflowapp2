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
      fontSize: "11.5px",
      color: "rgb(245, 245, 245)",
      backgroundColor: "#383838",
      borderColor: "rgba(255, 255, 255, 0.14)",
      borderRadius: "4px",
      borderWidth: "0px",
      borderStyle: "solid",
      boxShadow:
        "rgba(0, 0, 0, 0.08) 0px 12px 24px 8px, rgba(0, 0, 0, 0.08) 0px 8px 16px 4px, rgba(0, 0, 0, 0.08) 0px 4px 8px 2px, rgba(0, 0, 0, 0.08) 0px 2px 6px 0px, rgba(0, 0, 0, 0.12) 0px -0.5px 0.5px 0px inset, rgba(255, 255, 255, 0.12) 0px 0.5px 0.5px 0px inset",
      position: "absolute",
      marginTop: "10px",
      marginBottom: "10px",
      _hidden: { display: "none" },
    },
    heading: {
      background: "rgb(64, 64, 64)",
      fontWeight: "bold",
      paddingLeft: "6px",
      paddingTop: "4px",
      paddingBottom: "4px",
      color: "#bdbdbd",
    },
    combolist: {
      flex: 1,
      overflowY: "auto",
      mt: 0,
      paddingTop: "4px",
      paddingBottom: "4px",
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
      backgroundColor: "#383838",
      /*       _selected: {
        backgroundColor: "rgb(94, 94, 94)",
        color: "rgb(235, 235, 235)",
      }, */
      _highlighted: {
        backgroundColor: "#444444",
        color: "#f5f5f5",
      },
    },
    row: { position: "absolute", top: 0, left: 0, width: "100%" },
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
