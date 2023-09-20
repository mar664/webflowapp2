import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Stack,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import React from "react";
interface Props {
  removeHandler: ((removeElement?: boolean) => Promise<boolean>) | undefined;
  disclosure: UseDisclosureReturn;
  elementType: string;
}
export function RemoveDialog({
  elementType,
  removeHandler,
  disclosure,
}: Props) {
  if (removeHandler === undefined) {
    throw new Error("Remove handler must be defined");
  }
  const cancelRef = React.useRef<any>();

  return (
    <AlertDialog
      isOpen={disclosure.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={disclosure.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent margin={"2"}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete {elementType}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter justifyContent={"center"}>
            <Stack flexDir={"column"} gap={"2"}>
              <Button ref={cancelRef} onClick={disclosure.onClose} size={"sm"}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  (await removeHandler(false)) && disclosure.onClose();
                }}
                size={"sm"}
              >
                Delete Settings
              </Button>
              <Button
                colorScheme="red"
                variant="solid"
                onClick={async () => {
                  (await removeHandler(true)) && disclosure.onClose();
                }}
                size={"sm"}
              >
                Delete Settings & Element
              </Button>
            </Stack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
