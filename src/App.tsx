import React, { useEffect, useState } from "react";
import NumberIncrementerSelection from "./components/NumberIncrementerSelection";
import {
  usePrevElementIdValue,
  useSetPrevElementId,
} from "./contexts/AppContext";
import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import ModalSelection from "./components/ModalSelection";
import { Modal } from "./models/Modal";
import { CompatibleElement } from "./elements/CompatibleElement";
import { ModalCompatibleElement } from "./elements/ModalCompatibleElement";
import { NumberIncrementerCompatibleElement } from "./elements/NumberIncrementerCompatibleElement";
import _ from "lodash";
import { NumberIncrementer } from "./models/NumberIncrementer";
import { CookieConsent } from "./models/CookieConsent";
import { CookieConsentCompatibleElement } from "./elements/CookieConsentCompatibleElement";
import { CompatibleComponents } from "./types";
import ElementSelections from "./components/ElementSelections";

const INIT_COMPATIBLE_COMPONENTS: CompatibleComponents = {
  numberIncrementer: {
    isAlready: false,
    isApplicable: false,
  },
  modal: {
    isAlready: false,
    isApplicable: false,
  },
  cookieConsent: {
    isAlready: false,
    isApplicable: false,
  },
};

function componentsCompatible(element: CompatibleElement) {
  console.log("compatible element", element);
  // clone initial object
  const compatible = { ...INIT_COMPATIBLE_COMPONENTS };

  const isNumberIncrementer = NumberIncrementer.isAlready(element);
  const isModal = Modal.isAlready(element);
  const isCookieConsent = CookieConsent.isAlready(element);

  compatible.numberIncrementer = {
    isAlready: isNumberIncrementer,
    isApplicable:
      isModal || isCookieConsent
        ? false
        : NumberIncrementerCompatibleElement.isCompatible(element), // an element can only be of one type
  };

  compatible.modal = {
    isAlready: isModal,
    isApplicable:
      isNumberIncrementer || isCookieConsent
        ? false
        : ModalCompatibleElement.isCompatible(element), // an element can only be of one type
  };

  compatible.cookieConsent = {
    isAlready: isCookieConsent,
    isApplicable:
      isNumberIncrementer || isModal
        ? false
        : CookieConsentCompatibleElement.isCompatible(element), // an element can only be of one type
  };

  console.log(compatible);

  return compatible;
}

function App() {
  const prevElementId = usePrevElementIdValue();
  // #todo: change this callback
  const resetSelectedElementCallback = useSetPrevElementId();
  const [currentElement, setCurrentElement] = useState<
    CompatibleElement | undefined
  >();
  const [compatibleComponents, setCompatibleComponents] =
    useState<CompatibleComponents>(INIT_COMPATIBLE_COMPONENTS);

  useEffect(() => {
    console.log("load selected element callback");
    let prevElementId: string | null = null;
    const selectedElementCallback = (element: AnyElement | null) => {
      if (element) {
        const compatibleElement = CompatibleElement.fromElement(element);
        console.log(
          "selected element:",
          element,
          "previous id",
          prevElementId,
          "is a compatible element",
          compatibleElement !== null,
        );

        // if element callback triggered by save on element discard or duplicate event
        if (element.id === prevElementId) {
          return;
        }
        if (compatibleElement) {
          setCurrentElement(compatibleElement);
          // get any components which are applicable to the selected element
          setCompatibleComponents(componentsCompatible(compatibleElement));
        } else {
          // reset compatible components state
          setCompatibleComponents(INIT_COMPATIBLE_COMPONENTS);
        }
        prevElementId = element.id;
      }
    };

    const unsubscribeSelectedElement = webflow.subscribe(
      "selectedelement",
      selectedElementCallback,
    );

    return () => {
      console.log("unload selected element callback");
      unsubscribeSelectedElement();
    };
  }, []);

  return (
    <Flex alignItems="stretch" justify="center" flexDirection={"column"}>
      <Heading
        as="h1"
        size={"md"}
        backgroundColor={"rgb(43, 43, 43)"}
        padding={"0.3rem"}
      >
        Elements
      </Heading>
      <ElementSelections elements={compatibleComponents} />
    </Flex>
  );
}

export default App;
