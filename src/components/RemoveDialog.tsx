import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Stack,
  UseDisclosureReturn,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
        <AlertDialogContent>
          <AlertDialogHeader>
            <Box>Delete {elementType}</Box>
            <AlertDialogCloseButton
              size={"sm"}
              aria-label="toggle visibility"
              variant={"headerIcon"}
            />
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure want to delete {elementType}?
          </AlertDialogBody>

          <AlertDialogFooter justifyContent={"center"}>
            <Stack flexDir={"row"} gap={"2"}>
              <Button ref={cancelRef} onClick={disclosure.onClose} size={"sm"}>
                Cancel
              </Button>
              <Tooltip hasArrow label="Delete the attributes set">
                <Button
                  variant={"warning"}
                  onClick={async () => {
                    (await removeHandler(false)) && disclosure.onClose();
                  }}
                  size={"sm"}
                  leftIcon={<FontAwesomeIcon icon={faTrash} />}
                >
                  Settings
                </Button>
              </Tooltip>

              <Tooltip
                hasArrow
                label="Delete the attributes set and the element from the webflow designer"
              >
                <Button
                  variant="warning"
                  onClick={async () => {
                    (await removeHandler(true)) && disclosure.onClose();
                  }}
                  size={"sm"}
                  leftIcon={<FontAwesomeIcon icon={faTrash} />}
                >
                  Element
                </Button>
              </Tooltip>
            </Stack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
