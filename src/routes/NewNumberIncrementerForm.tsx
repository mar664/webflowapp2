import React, { useEffect } from "react";
import { generatePath, useLoaderData, useNavigate } from "react-router-dom";
import { useIsPageLoading } from "../contexts/AppContext";
import { uuidv4 } from "../utils";
import { NumberIncrementerCompatibleElement } from "../elements/NumberIncrementerCompatibleElement";
import { NumberIncrementer } from "../models/NumberIncrementer";
import { Paths } from "../paths";

export async function loader() {
  const selectedElement =
    await NumberIncrementerCompatibleElement.getSelected();
  return { selectedElement };
}

type loaderData = Awaited<ReturnType<typeof loader>>;

function NewNumberIncrementerForm() {
  const navigate = useNavigate();
  const { setIsPageLoading } = useIsPageLoading();
  const { selectedElement } = useLoaderData() as loaderData;

  useEffect(() => {
    setIsPageLoading(true);
    (async () => {
      if (selectedElement) {
        const id = uuidv4();

        const numberIncrementElement = webflow.createDOM("div");
        NumberIncrementer.apply(numberIncrementElement);
        selectedElement.setChildren(
          selectedElement.getChildren().concat(numberIncrementElement),
        );
        await selectedElement.save();
        console.log(
          "created number incrementer with id",
          numberIncrementElement.id,
        );
        navigate(
          generatePath(Paths.numberIncrementerForm, {
            elementId: numberIncrementElement.id,
          }),
        );
        setTimeout(() => setIsPageLoading(false), 500);
      }
    })();
  }, []);

  return <></>;
}

export default NewNumberIncrementerForm;
