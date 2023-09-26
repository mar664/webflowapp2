import { AccordionItem as _AccordionItem } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function AccordionItem({ children }: Props) {
  return (
    <_AccordionItem
      borderTopColor={"accordion.borderTopColor"}
      borderBottomColor={"accordion.borderBottomColor"}
      transition={"none"}
    >
      {children}
    </_AccordionItem>
  );
}
