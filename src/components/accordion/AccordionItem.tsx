import { AccordionItem as _AccordionItem } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function AccordionItem({ children }: Props) {
  return (
    <_AccordionItem
      borderTop={"none"}
      borderBottomColor={"rgba(255, 255, 255, 0.13)"}
      borderBottomWidth={"1px"}
      transition={"none"}
    >
      {children}
    </_AccordionItem>
  );
}
