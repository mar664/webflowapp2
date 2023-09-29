import { useState, useEffect } from "react";

export const useSelectedElement = () => {
  const [selectedElement, setSelectedElement] = useState<AnyElement | null>();

  useEffect(() => {
    console.log("subscribe selected element callback");
    let prevElement: AnyElement | null = null;
    const selectedElementCallback = (element: AnyElement | null) => {
      if (prevElement && element && prevElement.id !== element.id) {
        setSelectedElement(element);
      }
      prevElement = element;
    };

    const unsubscribeSelectedElement = webflow.subscribe(
      "selectedelement",
      selectedElementCallback,
    );

    return () => {
      console.log("unsubscribe selected element callback");
      unsubscribeSelectedElement();
    };
  }, []);

  return { selectedElement, setSelectedElement };
};

import { Paths } from "../paths";
import { CompatibleElement } from "../elements/CompatibleElement";
import { useNavigate, useParams } from "react-router-dom";
import { useSelectedElement as useSelectedElementHook } from "../contexts/AppContext";

// get compatible element type and redirect if selected element changes
export const useSelectedElementOfType = (
  ElementType: typeof CompatibleElement,
) => {
  const navigate = useNavigate();
  const { elementId } = useParams();

  const { selectedElement } = useSelectedElementHook();
  if (!selectedElement) {
    throw new Error(`Selected ${ElementType.name} element doesn't exist`);
  }
  if (elementId && elementId !== selectedElement.id) {
    navigate(Paths.app, { replace: true });
  }
  const selectedTypeElement = ElementType.fromElement(selectedElement);

  if (!selectedTypeElement) {
    throw new Error(`Selected ${ElementType.name}  element doesn't exist`);
  }

  return selectedTypeElement;
};
