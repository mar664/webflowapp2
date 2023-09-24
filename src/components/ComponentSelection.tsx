import { Box, Button, Flex } from "@chakra-ui/react";
import { type RemoveHandler } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  elementType: string;
  newHandler: () => void;
  icon: any;
  index: number;
  disabled: boolean;
}

function ComponentSelection({
  elementType,
  newHandler,
  icon,
  index,
  disabled,
}: Props) {
  return (
    <Flex
      aria-disabled={disabled}
      position={"relative"}
      flexDir={"column"}
      onClick={newHandler}
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
      borderColor={"border.panelColor"}
      color={"rgb(235, 235, 235)"}
      opacity={disabled ? "0.5" : "1"}
      _hover={{
        backgroundColor: "rgb(77, 77, 77)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <Button
        position={"absolute"}
        right={"0.25rem"}
        top={"0.25rem"}
        size={"xs"}
        color={"white"}
        opacity={"0.6"}
        backgroundColor={"rgb(43, 43, 43)"}
        _hover={{ opacity: 1 }}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        ?
      </Button>
      <Box margin={"auto"} fontSize={"2rem"} padding={"0.5rem"}>
        <FontAwesomeIcon icon={icon} fontSize={"2rem"} />
      </Box>
      <Box textAlign={"center"} fontFamily={"0.8rem"}>
        {elementType}
      </Box>
    </Flex>
  );
}

export default ComponentSelection;
