import { TriangleDownIcon, QuestionIcon } from "@chakra-ui/icons";
import { AccordionButton, IconButton, Box, Heading } from "@chakra-ui/react";

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
      display={"flex"}
    >
      <AccordionButton
        paddingLeft={"accordion.heading.button.paddingLeft"}
        _focusVisible={{
          boxShadow: "rgb(36, 150, 255) 0px 0px 0px 1px",
        }}
      >
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
      <IconButton
        icon={<QuestionIcon />}
        variant={"headerIcon"}
        aria-label="Help"
        size={"sm"}
      />
    </Heading>
  );
}
