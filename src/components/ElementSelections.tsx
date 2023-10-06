import { CompatibleComponents } from "../types";
import NumberIncrementerSelection from "./NumberIncrementerSelection";
import ModalSelection from "./ModalSelection";
import CookieConsentSelection from "./CookieConsentSelection";
import { Flex } from "@chakra-ui/react";

interface Props {
  elements: CompatibleComponents;
}

function ElementSelections({ elements }: Props) {
  return (
    <Flex
      flexDir={"row"}
      wrap={"wrap"}
      alignItems={"stretch"}
      margin={"1px"}
      background={"rgb(30, 30, 30)"}
    >
      {Object.entries(elements).map(([key, value], index) => {
        const disabled = !value.isApplicable && !value.isAlready;
        const editable = value.isAlready;
        switch (key) {
          case "numberIncrementer":
            return (
              <NumberIncrementerSelection
                index={index}
                disabled={disabled}
                editable={editable}
              />
            );
          case "modal":
            return (
              <ModalSelection
                index={index}
                disabled={disabled}
                editable={editable}
              />
            );
          case "cookieConsent":
            return (
              <CookieConsentSelection
                index={index}
                disabled={disabled}
                editable={editable}
              />
            );
          default:
            throw new Error("key not found");
        }
      })}
    </Flex>
  );
}

export default ElementSelections;
