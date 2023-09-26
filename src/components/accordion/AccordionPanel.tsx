import { AccordionPanel as _AccordionPanel } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function AccordionPanel({ children }: Props) {
  return (
    <_AccordionPanel padding={"accordion.panel.padding"}>
      {children}
    </_AccordionPanel>
  );
}
