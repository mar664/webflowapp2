import { buttonTheme, iconButtonBaseTheme } from "./themes/Buttons";
import { formLabelTheme } from "./themes/FormLabel";
import { inputTheme } from "./themes/Input";
import { menuTheme } from "./themes/Menu";
import { numberInputTheme } from "./themes/NumberInput";
import { radioTheme } from "./themes/Radio";
import { switchTheme } from "./themes/Switch";
import { tagTheme } from "./themes/Tag";

const colors = {
  header: {
    background: "rgb(77, 77, 77)",
    color: "rgb(235, 235, 235)",
    button: {
      color: "rgb(171, 171, 171)",
      background: "transparent",
      _hover: {
        color: "rgb(246, 246, 246)",
        background: "rgb(255, 255, 255, 0.1)",
      },
    },
  },
  border: {
    panelColor: "rgb(54, 54, 54)",
  },
  inputField: {
    background: "rgb(43, 43, 43)",
    borderColor: "rgb(33, 33, 33)",
    color: "rgb(217, 217, 217)",
  },
  select: {
    background: "rgb(77, 77, 77)",
    borderColor: "rgb(54, 54, 54)",
  },
  dropdown: {
    background: "rgb(77, 77, 77)",
    borderColor: "rgb(54, 54, 54)",
    color: "rgb(235, 235, 235)",
    _hover: { color: "rgb(217, 217, 217)" },
  },
  button: {
    borderColor: "rgb(54, 54, 54)",
    color: "rgb(235, 235, 235)",
    background: "rgb(94, 94, 94)",
    _hover: {
      background: "rgb(107, 107, 107)",
    },
  },
  tooltip: {
    borderColor: "rgb(33, 33, 33)",
    color: "rgb(54, 54, 54)",
    background: "rgb(235, 235, 235)",
  },
  switch: {
    track: {
      background: "rgb(159, 156, 156)",
      checked: { background: "rgb(0, 115, 230)" },
    },
  },
  accordion: {
    borderTopColor: "rgb(33, 33, 33)",
    borderBottomColor: "rgb(33, 33, 33)",

    heading: {
      background: "rgb(43, 43, 43)",
      borderBottomColor: "rgb(33, 33, 33)",
      color: "rgb(235, 235, 235)",
    },
  },
  alertDialog: {
    borderColor: "rgb(33, 33, 33)",
    background: "rgb(77, 77, 77)",
    color: "rgb(235, 235, 235)",
    header: {
      borderColor: "rgb(33, 33, 33)",
    },
  },
};

const fontSizes = {
  header: {
    fontSize: "20px",
  },
  inputField: {
    fontSize: "11px",
  },
  label: {
    fontSize: "11px",
  },
  tooltip: {
    fontSize: "11px",
  },
  accordion: {
    heading: {
      button: { fontSize: "12px" },
    },
  },
  alertDialog: {
    header: {
      fontSize: "14px",
    },
    body: {
      fontSize: "14px",
    },
  },
};

const fontWeights = {
  accordion: {
    heading: {
      button: { fontWeight: "600" },
    },
  },
  alertDialog: {
    header: {
      fontWeight: "600",
    },
  },
};

const space = {
  header: {
    paddingLeft: "10px",
    paddingRight: "10px",
    button: {
      margin: "3px",
      padding: "3px",
    },
  },
  accordion: {
    panel: {
      padding: "0",
    },
    heading: {
      padding: "0",
      button: {
        paddingLeft: "8px",
        text: { marginLeft: "6px" },
      },
    },
  },
  alertDialog: {
    margin: "10px",
    header: {
      paddingLeft: "16px",
      paddingRight: "16px",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
  },
};

const sizes = {
  header: {
    height: "45px",
  },
  accordion: {
    heading: {
      height: "28px",
    },
  },
};

const borders = {};

const borderWidths = {
  dropdown: { borderWidth: "1px" },
  button: {
    borderWidth: "1px",
  },
  tooltip: {
    borderWidth: "1px",
  },
  accordion: {
    heading: {
      borderBottomWidth: "1px",
    },
  },
  alertDialog: {
    borderWidth: "1px",
    header: { borderBottomWidth: "1px" },
  },
};

const borderStyles = {};

const radii = {
  header: {
    button: {
      borderRadius: "2px",
      _hover: {
        borderRadius: "2px",
      },
    },
  },
  inputField: {
    borderRadius: "2px",
  },
  select: {
    borderRadius: "3px",
  },
  dropdown: {
    borderRadius: "3px",
  },

  button: {
    borderRadius: "2px",
  },
  tooltip: {
    borderRadius: "2px",
  },
  alertDialog: {
    borderRadius: "3px",
  },
};

const shadows = {
  dropdown: { boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 10px" },
  alertDialog: { boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 15px 0px" },
  inputField: { _focus: { boxShadow: "rgb(36, 150, 255) 0px 0px 0px 1px" } },
};

const styles = {
  global: {
    html: {
      bg: "rgb(43, 43, 43)",
    },
    // styles for the `body`
    body: {
      bg: "#404040",
      color: "white",
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
    },
  },
};

export default {
  styles,
  colors,
  borders,
  space,
  sizes,
  borderWidths,
  borderStyles,
  fontSizes,
  radii,
  shadows,
  fontWeights,
  components: {
    Button: buttonTheme,
    Switch: switchTheme,
    NumberInput: numberInputTheme,
    FormLabel: formLabelTheme,
    Input: inputTheme,
    Menu: menuTheme,
    Radio: radioTheme,
    Tag: tagTheme,
  },
};
