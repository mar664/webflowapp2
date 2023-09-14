import React, { useEffect, useState } from "react";
import NumberIncrementerSelection from "./components/NumberIncrementerSelection";
import { NumberIncrementer } from "./elements/NumberIncrementer";
import {
  usePrevElementIdValue,
  useSetPrevElementId,
} from "./contexts/AppContext";
import { Flex, Heading } from "@chakra-ui/react";
import ModalSelection from "./components/ModalSelection";
import { Modal } from "./elements/Modal";
import { CompatibleElement } from "./elements/CompatibleElement";

interface CompatibleComponents {
  numberIncrementer: {
    isAlready: boolean;
    applicable: boolean;
  };
  modal: {
    isAlready: boolean;
    applicable: boolean;
  };
}

const INIT_COMPATIBLE_COMPONENTS: CompatibleComponents = {
  numberIncrementer: {
    isAlready: false,
    applicable: false,
  },
  modal: {
    isAlready: false,
    applicable: false,
  },
};

function componentsCompatible(element: CompatibleElement) {
  // clone initial object
  const compatible = { ...INIT_COMPATIBLE_COMPONENTS };

  compatible.numberIncrementer = {
    isAlready: NumberIncrementer.isAlready(element),
    applicable: true,
  };
  compatible.modal = {
    isAlready: Modal.isAlready(element),
    applicable: true,
  };
  return compatible;
}

function App() {
  const prevElementId = usePrevElementIdValue();
  const setPrevElementId = useSetPrevElementId();

  const [compatibleComponents, setCompatibleComponents] =
    useState<CompatibleComponents>(INIT_COMPATIBLE_COMPONENTS);

  useEffect(() => {
    console.log("loaded");
    const selectedElementCallback = (element: AnyElement | null) => {
      console.log(element, prevElementId);
      if (element) {
        const compatibleElement = CompatibleElement.fromElement(element);
        // if element callback triggered by save on element discard
        if (element.id === prevElementId) {
          return;
        }
        if (compatibleElement) {
          // get any components which are applicable to the selected element
          setCompatibleComponents(componentsCompatible(compatibleElement));
        } else {
          // reset compatible components state
          setCompatibleComponents(INIT_COMPATIBLE_COMPONENTS);
        }
        setPrevElementId(element.id);
      }
    };

    const unsubscribeSelectedElement = webflow.subscribe(
      "selectedelement",
      selectedElementCallback,
    );

    return () => {
      console.log("unloaded");
      unsubscribeSelectedElement();
    };
  }, [prevElementId]);

  return (
    <Flex align="center" justify="center" flexDirection={"column"}>
      <Heading as="h1" size={"md"}>
        Please select a component
      </Heading>

      {
        // Iterate through all compatible components with the selected element
        Object.entries(compatibleComponents)
          .filter(([key, value]) => value.applicable)
          .map(([key, value]) => {
            switch (key) {
              case "numberIncrementer":
                return (
                  <NumberIncrementerSelection isAlready={value.isAlready} />
                );
              case "modal":
                return <ModalSelection isAlready={value.isAlready} />;
              default:
                throw new Error("key not found");
            }
          })
      }
    </Flex>
  );
}

export default App;
