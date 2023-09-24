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
  input: {
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
  switch: { background: "rgb(94, 94, 94)" },
};

const fontSizes = {
  header: {
    fontSize: "20px",
  },
  input: {
    fontSize: "11px",
  },
  label: {
    fontSize: "11px",
  },
  tooltip: {
    fontSize: "11px",
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
};

const sizes = {
  header: {
    height: "45px",
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
  input: {
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
};

const shadows = {
  dropdown: { boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 10px" },
};

const styles = {
  global: {
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
};
