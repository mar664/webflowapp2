import React, { useEffect, useState } from "react";
import { CompatibleElement } from "../elements/CompatibleElement";
import { isElementHidden as isElementHiddenFunc } from "../utils";
import { useToast } from "@chakra-ui/react";
import {
  useIsElementHidden,
  useIsPageLoading,
  useSetPrevElementId,
} from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { RemoveHandler, VisibilityHandler } from "../types";
import { ElementModel } from "../models/ElementModel";

export const useElementVisibility = (
  currentElement: CompatibleElement | null,
  ElementType: typeof ElementModel,
): VisibilityHandler | undefined => {
  const { setIsPageLoading } = useIsPageLoading();

  const _isElementHidden = React.useMemo(
    () => isElementHiddenFunc(currentElement, ElementType),
    [currentElement],
  );

  const { isElementHidden, setIsElementHidden } = useIsElementHidden();

  useEffect(() => {
    if (currentElement) {
      setIsElementHidden({
        ...isElementHidden,
        [`${currentElement.id}`]: _isElementHidden,
      });
    }
  }, [currentElement]);

  if (!currentElement) {
    return;
  }

  const styleElement =
    currentElement.element.children && currentElement.element.getChildren()[0];

  const hide = async () => {
    if (
      !styleElement ||
      styleElement.type !== "DOM" ||
      styleElement.getTag() !== "style"
    ) {
      throw new Error("Style element missing");
    }
    if (!isElementHidden[`${currentElement.id}`]) {
      styleElement.setTextContent(
        `*[${ElementType.DATA_ATTRIBUTE_BASE}='${currentElement.id}']{
              display: none;
            }`,
      );
      styleElement.removeAttribute(ElementType.DATA_ATTRIBUTE_VISIBLE);

      await styleElement.save();

      setIsElementHidden({
        ...isElementHidden,
        [`${currentElement.id}`]: true,
      });
    }
  };

  const show = async () => {
    if (
      !styleElement ||
      styleElement.type !== "DOM" ||
      styleElement.getTag() !== "style"
    ) {
      throw new Error("Style element missing");
    }
    if (isElementHidden[`${currentElement.id}`]) {
      styleElement.setTextContent(
        `
          html.wf-design-mode *[${ElementType.DATA_ATTRIBUTE_BASE}='${currentElement?.id}']{
            display: ${ElementType.DISPLAY_TYPE};
          }
          html:not(.wf-design-mode) *[${ElementType.DATA_ATTRIBUTE_BASE}='${currentElement?.id}']{
            display: none;
          }`,
      );
      styleElement.setAttribute(ElementType.DATA_ATTRIBUTE_VISIBLE, "true");
      await styleElement.save();
      setIsElementHidden({
        ...isElementHidden,
        [`${currentElement.id}`]: false,
      });
    }
  };

  const toggleVisibility = async () => {
    if (
      !styleElement ||
      styleElement.type !== "DOM" ||
      styleElement.getTag() !== "style"
    ) {
      throw new Error("Style element missing");
    }
    if (isElementHidden[`${currentElement.id}`]) {
      await show();
    } else {
      await hide();
    }
  };

  return {
    toggleVisibility,
    isHidden: isElementHidden[`${currentElement.id}`],
    hide,
    show,
  };
};

export const useElementRemoval = (
  currentElement: CompatibleElement | null,
  ElementType: typeof ElementModel,
) => {
  const setPrevElement = useSetPrevElementId();
  const toast = useToast();
  const navigate = useNavigate();

  if (!currentElement) {
    return;
  }

  const remove: RemoveHandler = async (removeElement = false) => {
    // reset the prev element value so that selected element callback fires
    setPrevElement(null);
    await ElementType.remove(currentElement, removeElement);

    toast({
      title: `${ElementType.NAME} removed`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    navigate(0);
    return true;
  };
  return { remove };
};
