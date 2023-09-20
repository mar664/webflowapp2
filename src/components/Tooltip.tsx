import { TooltipProps, Tooltip as ChackraTooltip } from "@chakra-ui/react";

export function Tooltip(props: TooltipProps) {
  return <ChackraTooltip {...props} margin={"2"} />;
}
