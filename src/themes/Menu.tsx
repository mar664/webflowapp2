import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  list: {
    // this will style the MenuList component
    fontSize: "11px",
    color: "rgb(217, 217, 217)",
    backgroundColor: "rgb(77, 77, 77)",
    borderColor: "rgb(54, 54, 54)",
    borderRadius: "3px",
    borderWidth: "1px",
    borderStyle: "solid",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 10px",
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    color: "rgb(235, 235, 235)",
    backgroundColor: "rgb(77, 77, 77)",
    _focus: {
      bg: "rgb(94, 94, 94)",
    },
  },
});
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });
