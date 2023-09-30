import React, { useEffect, useCallback } from "react";
import { CompatibleElement } from "../elements/CompatibleElement";
import { isElementHidden as isElementHiddenFunc } from "../utils";
import { useToast } from "@chakra-ui/react";
import {
  useIsElementHidden,
  useIsPageLoading,
  useSetSelectedElement,
} from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { RemoveHandler, VisibilityHandler } from "../types";
import { ElementModel } from "../models/ElementModel";
import { Paths } from "../paths";

export const useElementVisibility = (
  currentElement: CompatibleElement | null,
  ElementType: typeof ElementModel,
): VisibilityHandler | undefined => {
  const { isElementHidden, setIsElementHidden } = useIsElementHidden();

  useEffect(() => {
    if (currentElement && !(`${currentElement.id}` in isElementHidden)) {
      console.log("setting inital is hidden value");
      setIsElementHidden((prev) => ({
        ...prev,
        [`${currentElement.id}`]: isElementHiddenFunc(
          currentElement,
          ElementType,
        ),
      }));
    }
  }, []);

  useEffect(() => {
    console.log(isElementHidden, "isHidden");
  }, [isElementHidden]);

  if (!currentElement) {
    throw Error("HEre");
  }

  const styleElement =
    currentElement.element.children && currentElement.element.getChildren()[0];

  const hide = useCallback(
    async (force = false) => {
      console.log("attempting to hide");
      if (
        !styleElement ||
        styleElement.type !== "DOM" ||
        styleElement.getTag() !== "style"
      ) {
        throw new Error("Style element missing");
      }
      if (!isElementHidden[`${currentElement.id}`] || force) {
        styleElement.setTextContent(
          `*[${ElementType.DATA_ATTRIBUTE_BASE}='${currentElement.id}']{
              display: none;
            }`,
        );
        styleElement.removeAttribute(ElementType.DATA_ATTRIBUTE_VISIBLE);

        await styleElement.save();
        console.log(`Setting ${currentElement.id} hidden`);
        setIsElementHidden((prev) => ({
          ...prev,
          [`${currentElement.id}`]: true,
        }));
      } else {
        console.log("Can't hide already hidden", isElementHidden);
      }
    },
    [isElementHidden],
  );

  const show = useCallback(
    async (force = false) => {
      if (
        !styleElement ||
        styleElement.type !== "DOM" ||
        styleElement.getTag() !== "style"
      ) {
        throw new Error("Style element missing");
      }
      if (isElementHidden[`${currentElement.id}`] || force) {
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
        console.log(`Setting ${currentElement.id} visible`);

        setIsElementHidden((prev) => ({
          ...prev,
          [`${currentElement.id}`]: false,
        }));
      } else {
        console.log("Can't show already visible");
      }
    },
    [isElementHidden],
  );

  const toggleVisibility = useCallback(async () => {
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
  }, [isElementHidden]);

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
  const setSelectedElement = useSetSelectedElement();
  const toast = useToast();
  const navigate = useNavigate();

  if (!currentElement) {
    return;
  }

  const remove: RemoveHandler = async (removeElement = false) => {
    await ElementType.remove(currentElement, removeElement);
    setSelectedElement(await webflow.getSelectedElement());
    toast({
      title: `${ElementType.NAME} removed`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    navigate(Paths.app, { replace: true });
    return true;
  };
  return { remove };
};
