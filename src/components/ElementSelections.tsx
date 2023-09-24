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
    <Flex flexDir={"row"} wrap={"wrap"} alignItems={"stretch"}>
      {Object.entries(elements).map(([key, value], index) => {
        switch (key) {
          case "numberIncrementer":
            return (
              <NumberIncrementerSelection
                index={index}
                disabled={!(value.isApplicable && !value.isAlready)}
              />
            );
          case "modal":
            return (
              <ModalSelection
                index={index}
                disabled={!(value.isApplicable && !value.isAlready)}
              />
            );
          case "cookieConsent":
            return (
              <CookieConsentSelection
                index={index}
                disabled={!(value.isApplicable && !value.isAlready)}
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
