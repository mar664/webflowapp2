import React, { useEffect, useState } from "react";
import { CompatibleElement } from "../elements/CompatibleElement";
import { isModalHidden as isModalHiddenFunc } from "../utils";
import { Modal } from "../elements/Modal";
import { useToast } from "@chakra-ui/react";
import {
  useIsPageLoading,
  useModalHidden,
  useSetPrevElementId,
} from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { VisibilityHandler } from "../types";
import { RemoveHandler } from "./numberIncrementer";

export const useModalVisibility = (
  currentElement: CompatibleElement | null,
): VisibilityHandler | undefined => {
  const { setIsPageLoading } = useIsPageLoading();

  const _isModalHidden = React.useMemo(
    () => isModalHiddenFunc(currentElement),
    [currentElement],
  );
  const { isModalHidden, setIsModalHidden } = useModalHidden();
  if (!currentElement) {
    return;
  }
  useEffect(() => {
    setIsModalHidden(_isModalHidden);
  }, [currentElement]);

  const hide = async () => {
    const modalStyleElement =
      currentElement.element.children &&
      currentElement.element.getChildren()[0];
    if (
      modalStyleElement &&
      modalStyleElement.type == "DOM" &&
      modalStyleElement.getTag() === "style"
    ) {
      if (!isModalHidden) {
        modalStyleElement.setTextContent(
          `*[data-mr-modal='${currentElement.id}']{
              display: none;
            }`,
        );
        modalStyleElement.removeAttribute("data-mr-modal-visible");

        await modalStyleElement.save();

        setIsModalHidden(true);
      }
    }
  };

  const show = async () => {
    const modalStyleElement =
      currentElement.element.children &&
      currentElement.element.getChildren()[0];
    if (
      modalStyleElement &&
      modalStyleElement.type == "DOM" &&
      modalStyleElement.getTag() === "style"
    ) {
      if (isModalHidden) {
        modalStyleElement.setTextContent(
          `
          html.wf-design-mode *[data-mr-modal='${currentElement?.id}']{
            display: flex;
          }
          html:not(.wf-design-mode) *[data-mr-modal='${currentElement?.id}']{
            display: none;
          }`,
        );
        modalStyleElement.setAttribute("data-mr-modal-visible", "true");
        await modalStyleElement.save();
        setIsModalHidden(false);
      }
    }
  };

  const toggleVisibility = async () => {
    const modalStyleElement =
      currentElement.element.children &&
      currentElement.element.getChildren()[0];
    if (
      modalStyleElement &&
      modalStyleElement.type == "DOM" &&
      modalStyleElement.getTag() === "style"
    ) {
      if (isModalHidden) {
        modalStyleElement.setTextContent(
          `
          html.wf-design-mode *[data-mr-modal='${currentElement?.id}']{
            display: flex;
          }
          html:not(.wf-design-mode) *[data-mr-modal='${currentElement?.id}']{
            display: none;
          }`,
        );
        modalStyleElement.setAttribute("data-mr-modal-visible", "true");
        await modalStyleElement.save();
        setIsModalHidden(false);
      } else {
        modalStyleElement.setTextContent(
          `*[data-mr-modal='${currentElement.id}']{
              display: none;
            }`,
        );
        modalStyleElement.removeAttribute("data-mr-modal-visible");

        await modalStyleElement.save();

        setIsModalHidden(true);
      }
    }
  };

  return { toggleVisibility, isHidden: isModalHidden, hide, show };
};

export const useModalRemoval = (currentElement: CompatibleElement | null) => {
  const setPrevElement = useSetPrevElementId();
  const toast = useToast();
  const navigate = useNavigate();

  if (!currentElement) {
    return;
  }

  const remove: RemoveHandler = async (removeElement = false) => {
    // reset the prev element value so that selected element callback fires
    setPrevElement(null);
    await Modal.remove(currentElement, removeElement);

    toast({
      title: "Modal removed",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    navigate("/app", { replace: true });
    return true;
  };
  return { remove };
};
