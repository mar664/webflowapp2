import React, { useEffect, useState } from "react";
import { useSelectedElement } from "../contexts/AppContext";
import {
  Tab,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { CompatibleElement } from "../elements/CompatibleElement";
import _ from "lodash";
import { CompatibleComponents } from "../types";
import ElementSelections from "../components/ElementSelections";
import { INIT_COMPATIBLE_COMPONENTS } from "../constants";
import { componentsCompatible } from "../utils";
import { NumberIncrementer } from "../models/NumberIncrementer";
import { Modal } from "../models/Modal";
import { CookieConsent } from "../models/CookieConsent";
import { Paths } from "../paths";
import { useNavigate, generatePath, useParams } from "react-router-dom";
import UtilitiesSelections from "../components/UtilitiesSelections";

function App() {
  const { isFromBack } = useParams();
  const [fromBack, setFromBack] = useState(!!isFromBack);

  const { selectedElement } = useSelectedElement();

  const [compatibleComponents, setCompatibleComponents] =
    useState<CompatibleComponents>(INIT_COMPATIBLE_COMPONENTS);

  const navigate = useNavigate();

  const isAlready = (element: CompatibleElement) => {
    const isNumberIncrementer = NumberIncrementer.isAlready(element);
    const isModal = Modal.isAlready(element);
    const isCookieConsent = CookieConsent.isAlready(element);

    if (!fromBack) {
      if (isNumberIncrementer) {
        navigate(
          generatePath(Paths.numberIncrementerForm, {
            elementId: element.id,
            isNew: "false",
          }),
        );
      }

      if (isModal) {
        navigate(
          generatePath(Paths.modalForm, {
            elementId: element.id,
            isNew: "false",
          }),
        );
      }

      if (isCookieConsent) {
        navigate(
          generatePath(Paths.cookieConsentForm, {
            elementId: element.id,
            isNew: "false",
          }),
        );
      }
    }
    return { isNumberIncrementer, isModal, isCookieConsent };
  };

  useEffect(() => {
    if (selectedElement) {
      const compatibleElement = CompatibleElement.fromElement(selectedElement);

      if (compatibleElement) {
        const already = isAlready(compatibleElement);
        if (already) {
          // get any components which are applicable to the selected element
          setCompatibleComponents(
            componentsCompatible(already, compatibleElement),
          );
        }
      } else {
        // reset compatible components state
        setCompatibleComponents(INIT_COMPATIBLE_COMPONENTS);
      }
      setFromBack(false);
    }
  }, [selectedElement]);

  useEffect(() => {
    (async () => await webflow.setExtensionSize("comfortable"))();
  }, []);

  return (
    <Tabs isLazy>
      <TabList>
        <Tab>Elements</Tab>
        <Tab>Utilities</Tab>
      </TabList>
      <TabPanels>
        {/* initially mounted */}
        <TabPanel>
          <ElementSelections elements={compatibleComponents} />
        </TabPanel>
        {/* initially not mounted */}
        <TabPanel>
          <UtilitiesSelections />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
