import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  useIsSelectingElement,
  useSetIsSelectingElement,
} from "../../contexts/AppContext";
import { ModalCompatibleElement } from "../../elements/ModalCompatibleElement";
import { CompatibleElement } from "../../elements/CompatibleElement";
import { useElementVisibility } from "../../hooks/element";
import { Modal } from "../../models/Modal";

interface Props {
  setSelectedElement: any;
  modalElement: ModalCompatibleElement;
  hideOnModalOpen?: boolean;
  showOnModalOpen?: boolean;
}

function ElementTriggerElement({
  setSelectedElement,
  modalElement,
  hideOnModalOpen,
  showOnModalOpen,
}: Props) {
  const visibility = useElementVisibility(modalElement, Modal);

  const isSelectingElement = useIsSelectingElement();
  const setIsSelectingElement = useSetIsSelectingElement();
  const modal = useDisclosure();

  const cancelRef = React.useRef<any>();

  const [selectionFinished, setSelectionFinished] = useState<boolean>(false);
  const [canConfirmSelection, setCanConfirmSelection] =
    useState<boolean>(false);

  useEffect(() => {
    // listens for change in element when selecting the original modal element again
    if (isSelectingElement && !selectionFinished) {
      const selectedElementCallback = (element: AnyElement | null) => {
        setCanConfirmSelection(!!(element && element.id !== modalElement.id));
      };

      const unsubscribeSelectedElement = webflow.subscribe(
        "selectedelement",
        selectedElementCallback,
      );

      return () => {
        console.log("unloaded");
        unsubscribeSelectedElement();
      };
    }
  }, [isSelectingElement, selectionFinished]);

  const selectElement = async () => {
    setIsSelectingElement(true);

    if (hideOnModalOpen) {
      await visibility?.hide();
    }
    if (showOnModalOpen) {
      await visibility?.show();
    }
    modal.onOpen();
  };

  const setSelection = async () => {
    const selectedElement = await CompatibleElement.getSelected();
    console.log("selected element", selectedElement);
    setSelectedElement(selectedElement?.id);
    selectedElement?.setAttribute("data-mr-modal-id", selectedElement?.id);
    await selectedElement?.save();
    setSelectionFinished(true);
    modal.onClose();
    setIsSelectingElement(false);
    setSelectionFinished(false);
  };

  return (
    <>
      <Button onClick={selectElement}>
        {modal.isOpen ? "Selecting Element" : "Select an element"}
      </Button>

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={modal.onClose}
        isOpen={modal.isOpen}
        isCentered
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay />

        <AlertDialogContent margin={"2"}>
          <AlertDialogHeader>Select element</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Please select an element in webflow and then click to confirm the
            selection
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={modal.onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              ml={3}
              onClick={setSelection}
              isDisabled={!canConfirmSelection}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ElementTriggerElement;
