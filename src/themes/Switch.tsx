import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  thumb: {
    bg: "white",
  },
  track: {
    bg: "switch.track.background",
    _checked: {
      bg: "switch.track.checked.background",
    },
  },
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });
