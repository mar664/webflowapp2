import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormLabel,
  Select,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  useIsSelectingElement,
  useSetIsSelectingElement,
} from "../../contexts/AppContext";
import e from "express";

interface Props {
  setSelectedElement: any;
  modalElement: any;
}

function ElementTriggerElement({ setSelectedElement, modalElement }: Props) {
  const isSelectingElement = useIsSelectingElement();
  const setIsSelectingElement = useSetIsSelectingElement();
  const modal1 = useDisclosure();
  const modal2 = useDisclosure();

  const cancelRef1 = React.useRef<any>();
  const cancelRef2 = React.useRef<any>();

  const [selectedModalElement, setSelectedModalElement] = useState<
    string | undefined
  >(undefined);

  const [selectionFinished, setSelectionFinished] = useState<boolean>(false);

  useEffect(() => {
    // listens for change in element when selecting the original modal element again
    if (isSelectingElement && selectionFinished) {
      const selectedElementCallback = (element: AnyElement | null) => {
        if (element) {
          setSelectedModalElement(element.id);
        }
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

  useEffect(() => {
    console.log(
      isSelectingElement,
      selectionFinished,
      selectedModalElement,
      modalElement,
    );
    // after finished selection, need user to select original modal element
    if (
      isSelectingElement &&
      selectionFinished &&
      selectedModalElement === modalElement.id
    ) {
      setIsSelectingElement(false);
      setSelectionFinished(false);
      modal2.onClose();
    }
  }, [
    isSelectingElement,
    selectionFinished,
    selectedModalElement,
    modalElement,
  ]);

  const selectElement = () => {
    setIsSelectingElement(true);
    modal1.onOpen();
  };

  const setSelection = async () => {
    const selectedElement = await webflow.getSelectedElement();
    console.log("selected element", selectedElement);
    setSelectedElement(selectedElement?.id);
    setSelectionFinished(true);
    modal1.onClose();
    modal2.onOpen();
  };

  console.log(modalElement);
  console.log(selectedModalElement);

  return (
    <>
      <Button onClick={selectElement}>
        {modal1.isOpen ? "Selecting Element" : "Select an element"}
      </Button>

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={modal1.onClose}
        isOpen={modal1.isOpen}
        isCentered
        leastDestructiveRef={cancelRef1}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Select element</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Please select an element in webflow and then click to confirm the
            selection
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef1} onClick={modal1.onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" ml={3} onClick={setSelection}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={modal2.onClose}
        isOpen={modal2.isOpen}
        isCentered
        leastDestructiveRef={cancelRef2}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Select modal element</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Please select the original modal element
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef2} onClick={modal2.onClose}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ElementTriggerElement;
