import { TriangleDownIcon } from "@chakra-ui/icons";
import { AccordionButton, Box, Heading } from "@chakra-ui/react";

interface Props {
  headingText: string;
}

export default function AccordionHeading({ headingText }: Props) {
  return (
    <Heading
      as="h2"
      backgroundColor={"accordion.heading.background"}
      color={"accordion.heading.color"}
      borderBottomColor={"accordion.heading.borderBottomColor"}
      borderBottomWidth={"accordion.heading.borderBottomWidth"}
      padding={"accordion.heading.padding"}
    >
      <AccordionButton paddingLeft={"accordion.heading.button.paddingLeft"}>
        <TriangleDownIcon boxSize={"9px"} />
        <Box
          as="span"
          flex="1"
          textAlign="left"
          marginLeft={"accordion.heading.button.text.marginLeft"}
          fontSize={"accordion.heading.button.fontSize"}
          fontWeight={"accordion.heading.button.fontWeight"}
        >
          {headingText}
        </Box>
      </AccordionButton>
    </Heading>
  );
}
