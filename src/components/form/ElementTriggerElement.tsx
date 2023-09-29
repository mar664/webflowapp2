import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  useIsSelectingElement,
  useSelectedElement,
  useSetIsSelectingElement,
  useSetSelectedElement,
} from "../../contexts/AppContext";
import { ModalCompatibleElement } from "../../elements/ModalCompatibleElement";
import { CompatibleElement } from "../../elements/CompatibleElement";
import { useElementVisibility } from "../../hooks/element";
import { Modal } from "../../models/Modal";
import { HiOutlineCursorArrowRipple } from "react-icons/hi2";

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

  const { selectedElement } = useSelectedElement();
  const setGlobalSelectedElement = useSetSelectedElement();

  useEffect(() => {
    // listens for change in element when selecting the original modal element again
    if (isSelectingElement && !selectionFinished) {
      setCanConfirmSelection(
        !!(selectedElement && selectedElement.id !== modalElement.id),
      );
    }
  }, [selectedElement, isSelectingElement, selectionFinished]);

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
    const id = selectedElement?.id.replace("-", "").substring(0, 8) as string;
    setSelectedElement(id);

    selectedElement?.setAttribute("data-mr-modal-id", id);
    await selectedElement?.save();
    setSelectionFinished(true);
    modal.onClose();
    setGlobalSelectedElement(modalElement.element);
    setIsSelectingElement(false);
    setSelectionFinished(false);
  };

  return (
    <>
      <Button
        onClick={selectElement}
        size={"sm"}
        variant={"enable"}
        leftIcon={<HiOutlineCursorArrowRipple />}
      >
        Target element
      </Button>

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={modal.onClose}
        isOpen={modal.isOpen}
        isCentered
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Select target element</AlertDialogHeader>
          <AlertDialogCloseButton size={"sm"} variant={"headerIcon"} />
          <AlertDialogBody>
            Please select an element in webflow and then click to confirm the
            selection
          </AlertDialogBody>
          <AlertDialogFooter>
            <Stack flexDir={"row"} gap={"2"}>
              <Button ref={cancelRef} onClick={modal.onClose} size={"sm"}>
                Cancel
              </Button>
              <Button
                variant="enable"
                onClick={setSelection}
                isDisabled={!canConfirmSelection}
                size={"sm"}
              >
                Confirm
              </Button>
            </Stack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ElementTriggerElement;
