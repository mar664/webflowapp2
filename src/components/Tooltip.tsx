import { TooltipProps, Tooltip as ChackraTooltip } from "@chakra-ui/react";

export function Tooltip(props: TooltipProps) {
  return (
    <ChackraTooltip
      {...props}
      margin={2}
      padding={2}
      hasArrow
      backgroundColor={"tooltip.background"}
      color={"tooltip.color"}
      borderColor={"tooltip.borderColor"}
      borderRadius={"tooltip.borderRadius"}
      fontSize={"tooltip.fontSize"}
    />
  );
}
