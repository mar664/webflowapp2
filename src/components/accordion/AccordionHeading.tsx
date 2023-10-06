import { QuestionIcon } from "@chakra-ui/icons";
import {
  AccordionButton,
  IconButton,
  Box,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { AccordionIcon } from "./AccordionIcon";

interface Props {
  headingText: string;
  showHelp?: ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => React.ReactNode;
}

export default function AccordionHeading({ headingText, showHelp }: Props) {
  const { isOpen, onOpen: openModal, onClose } = useDisclosure();

  return (
    <>
      <Heading
        as="h2"
        backgroundColor={"rgb(30, 30, 30)"}
        color={"rgb(245, 245, 245)"}
        borderBottomColor={"accordion.heading.borderBottomColor"}
        borderBottomWidth={"0px"}
        padding={"accordion.heading.padding"}
        display={"flex"}
        height={"40px"}
      >
        <AccordionButton
          paddingLeft={"4px"}
          _focusVisible={{
            boxShadow: "rgb(36, 150, 255) 0px 0px 0px 1px",
          }}
          paddingInlineEnd={"2"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box
            as="span"
            flex="1"
            textAlign="left"
            marginLeft={"accordion.heading.button.text.marginLeft"}
            fontSize={"12.5px"}
            fontWeight={"600"}
          >
            {headingText}
            {showHelp && (
              <IconButton
                icon={<QuestionIcon />}
                variant={"headerHelpIcon"}
                aria-label="Help"
                size={"sm"}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  openModal();
                }}
                cursor={"help"}
              />
            )}
          </Box>
          <AccordionIcon boxSize={"16px"} />
        </AccordionButton>
      </Heading>
      {showHelp && showHelp({ isOpen, onClose })}
    </>
  );
}
