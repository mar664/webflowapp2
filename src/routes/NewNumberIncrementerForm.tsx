import React, { useEffect } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useIsPageLoading } from "../contexts/AppContext";
import { uuidv4 } from "../utils";
import { NumberIncrementerCompatibleElement } from "../elements/NumberIncrementerCompatibleElement";
import { NumberIncrementer } from "../models/NumberIncrementer";
import { Paths } from "../paths";
import { useSelectedElementOfType } from "../hooks/selectedElement";

function NewNumberIncrementerForm() {
  const navigate = useNavigate();
  const { setIsPageLoading } = useIsPageLoading();

  const selectedNumberIncrementerElement = useSelectedElementOfType(
    NumberIncrementerCompatibleElement,
  ) as NumberIncrementerCompatibleElement;

  useEffect(() => {
    setIsPageLoading(true);
    (async () => {
      if (selectedNumberIncrementerElement) {
        const id = uuidv4();

        const numberIncrementElement = webflow.createDOM("div");
        NumberIncrementer.apply(numberIncrementElement);
        selectedNumberIncrementerElement.setChildren(
          selectedNumberIncrementerElement
            .getChildren()
            .concat(numberIncrementElement),
        );
        await selectedNumberIncrementerElement.save();
        console.log(
          "created number incrementer with id",
          numberIncrementElement.id,
        );
        navigate(
          generatePath(Paths.numberIncrementerForm, {
            elementId: numberIncrementElement.id,
            isNew: "true",
          }),
        );
        setTimeout(() => setIsPageLoading(false), 500);
      }
    })();
  }, []);

  return <></>;
}

export default NewNumberIncrementerForm;
