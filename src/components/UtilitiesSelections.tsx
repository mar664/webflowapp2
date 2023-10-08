import { Flex } from "@chakra-ui/react";
import HTMLToWebflow from "./HTMLToWebflow";

function UtilitiesSelections() {
  return (
    <Flex
      flexDir={"row"}
      wrap={"wrap"}
      alignItems={"stretch"}
      margin={"1px"}
      background={"rgb(30, 30, 30)"}
    >
      <HTMLToWebflow index={0} disabled={false} />
    </Flex>
  );
}

export default UtilitiesSelections;
