import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  UseDisclosureReturn,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
interface Props {
  removeHandler: (() => void) | undefined;
  disclosure: UseDisclosureReturn;
}
export function RemoveDialog({ removeHandler, disclosure }: Props) {
  const cancelRef = React.useRef<any>();

  return (
    <AlertDialog
      isOpen={disclosure.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={disclosure.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Modal
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={disclosure.onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={disclosure.onClose} ml={3}>
              Delete Settings
            </Button>
            <Button colorScheme="red" onClick={disclosure.onClose} ml={3}>
              Delete Element
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
