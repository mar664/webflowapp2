import React, { useEffect, useState } from "react";
import NumberIncrementerSelection from "./components/NumberIncrementerSelection";
import { NumberIncrementer } from "./elements/NumberIncrementer";
import { useNavigate } from "react-router-dom";
import {
  usePrevElementIdValue,
  useSetPrevElementId,
} from "./contexts/AppContext";
import { Flex, Heading } from "@chakra-ui/react";

const INIT_COMPATIBLE_COMPONENTS = {
  numberIncrementer: {
    isAlready: false,
    applicable: false,
  },
};

interface CompatibleComponents {
  numberIncrementer: {
    isAlready: boolean;
    applicable: boolean;
  };
}
function componentsCompatible(element: AnyElement) {
  // clone initial object
  const compatible = { ...INIT_COMPATIBLE_COMPONENTS };

  if (element.type === "DOM") {
    compatible.numberIncrementer = {
      isAlready: NumberIncrementer.isAlready(element),
      applicable: true,
    };
  }
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
        // if element callback triggered by save on element discard
        if (element.id === prevElementId) {
          console.log("ho");
          return;
        }
        if (element.type === "DOM") {
          // get any components which are applicable to the selected element
          setCompatibleComponents(componentsCompatible(element));
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
      {Object.entries(compatibleComponents)
        .filter(([key, value]) => value.applicable)
        .map(([key, value]) => {
          switch (key) {
            case "numberIncrementer":
              return <NumberIncrementerSelection isAlready={value.isAlready} />;
            default:
              throw new Error("key not found");
          }
        })}
    </Flex>
  );
}

export default App;
