import {
  Box,
  Button,
  VisuallyHidden,
  Icon,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { useSelectedElement } from "../contexts/AppContext";
import { useNavigate, generatePath } from "react-router-dom";

interface Props {
  elementType: string;
  newPath: string;
  existingPath: string;
  icon: any;
  index: number;
  disabled: boolean;
  editable: boolean;
  showHelp: ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => React.ReactNode;
}

function ComponentSelection({
  elementType,
  newPath,
  existingPath,
  icon,
  index,
  disabled,
  editable,
  showHelp,
}: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen: openModal, onClose } = useDisclosure();

  const [isHoveredOrFocused, setIsHoveredOrFocused] = useState(false);
  const onEnterComponent = () => setIsHoveredOrFocused(true);
  const onLeaveComponent = () => setIsHoveredOrFocused(false);
  const { selectedElement } = useSelectedElement();

  const clickHandler = (path: string) => {
    navigate(
      generatePath(path, {
        elementId: selectedElement?.id,
        isNew: "false",
      }),
      { replace: true },
    );
  };

  return (
    <>
      <Link
        tabIndex={0}
        display="flex"
        onMouseEnter={onEnterComponent}
        onMouseLeave={onLeaveComponent}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            if (!disabled && selectedElement) {
              if (editable) {
                clickHandler(existingPath);
              } else {
                clickHandler(newPath);
              }
            }
          }
        }}
        aria-disabled={disabled}
        position={"relative"}
        flexDir={"column"}
        onClick={
          !disabled && selectedElement
            ? () => {
                editable ? clickHandler(existingPath) : clickHandler(newPath);
              }
            : undefined
        }
        flexBasis={"33.3333%"}
        alignItems={"center"}
        flexGrow={0}
        flexShrink={1}
        paddingBottom={"2"}
        paddingTop={"1"}
        gap={"0.5rem"}
        borderLeftWidth={index % 3 === 0 ? "1px" : 0}
        borderLeftStyle={"solid"}
        borderRightWidth={"1px"}
        borderRightStyle={"solid"}
        borderBottomWidth={"1px"}
        borderBottomStyle={"solid"}
        borderColor={"transparent"}
        color={"#bdbdbd"}
        opacity={disabled ? "0.5" : "1"}
        _hover={{
          backgroundColor: "#383838",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        _focus={{
          boxShadow: "rgb(36, 150, 255) 0px 0px 0px 1px",
        }}
        _focusVisible={{
          boxShadow: "rgb(36, 150, 255) 0px 0px 0px 1px",
        }}
        fontSize={"14px"}
      >
        <Icon
          as={EditIcon}
          display={editable ? "block" : "none"}
          position={"absolute"}
          right={"0.25rem"}
          left={"0.25rem"}
          aria-label="Edit icon"
        />
        {isHoveredOrFocused && (
          <Button
            position={"absolute"}
            right={"3px"}
            top={"3px"}
            height={"16px"}
            width={"16px"}
            color={"white"}
            opacity={"0.6"}
            backgroundColor={"#1e1e1e"}
            _hover={{ opacity: 1 }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              openModal();
            }}
            cursor={"help"}
            variant={"help"}
          >
            ?
          </Button>
        )}
        <VisuallyHidden>
          <Button
            position={"absolute"}
            right={"0.25rem"}
            top={"0.25rem"}
            size={"xs"}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              openModal();
            }}
          >
            ?
          </Button>
        </VisuallyHidden>
        <Box margin={"auto"} fontSize={"2rem"} padding={"0.5rem"}>
          <FontAwesomeIcon icon={icon} fontSize={"2rem"} color="white" />
        </Box>
        <Box textAlign={"center"} fontFamily={"0.8rem"}>
          {elementType}
        </Box>
      </Link>
      {showHelp({ isOpen, onClose })}
    </>
  );
}

export default ComponentSelection;
