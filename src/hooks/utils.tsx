import React, { useEffect, useRef } from "react";
import {
  useIsSelectingElement,
  useSelectedElement,
} from "../contexts/AppContext";
import { CompatibleElement } from "../elements/CompatibleElement";
import { Paths } from "../paths";
import { useNavigate } from "react-router-dom";
import { getAllChildren } from "../utils";

export const useDidMountEffect = (func: any, deps: any[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export const useSelectedElementChangeRedirect = (
  element: CompatibleElement,
) => {
  const navigate = useNavigate();

  const isSelectingElement = useIsSelectingElement();

  const { selectedElement } = useSelectedElement();

  useDidMountEffect(() => {
    // if another element is clicked redirect to root unless an element is being selected to choose an element value
    if (
      !isSelectingElement &&
      element &&
      selectedElement &&
      selectedElement.id !== element.id &&
      !getAllChildren(element.element).includes(selectedElement.id)
    ) {
      console.log("redirecting");
      navigate(Paths.app, { replace: true });
    }
  }, [isSelectingElement, selectedElement]);
};
