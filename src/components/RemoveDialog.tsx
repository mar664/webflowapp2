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
} from "@chakra-ui/react";
import React from "react";
import { Tooltip } from "./Tooltip";
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
        <AlertDialogContent
          marginTop={"alertDialog.margin"}
          background={"alertDialog.background"}
          color={"alertDialog.color"}
          borderColor={"alertDialog.borderColor"}
          borderRadius={"alertDialog.borderRadius"}
          boxShadow={"alertDialog.boxShadow"}
          maxWidth={"95%"}
        >
          <AlertDialogHeader
            fontSize={"alertDialog.header.fontSize"}
            fontWeight="alertDialog.header.fontWeight"
            borderColor={"alertDialog.header.borderColor"}
            borderBottomWidth={"alertDialog.header.borderBottomWidth"}
            paddingLeft={"alertDialog.header.paddingLeft"}
            paddingRight={"alertDialog.header.paddingRight"}
            paddingTop={"alertDialog.header.paddingTop"}
            paddingBottom={"alertDialog.header.paddingBottom"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>Delete {elementType}</Box>
            <AlertDialogCloseButton
              size={"sm"}
              aria-label="toggle visibility"
              variant={"headerIcon"}
            />
          </AlertDialogHeader>

          <AlertDialogBody fontSize={"alertDialog.body.fontSize"}>
            Are you sure want to delete {elementType}?
          </AlertDialogBody>

          <AlertDialogFooter justifyContent={"center"}>
            <Stack flexDir={"row"} gap={"2"}>
              <Button ref={cancelRef} onClick={disclosure.onClose} size={"sm"}>
                Cancel
              </Button>
              <Tooltip label="Delete the attributes set" fontSize="md">
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
                label="Delete the attributes set and the element from the webflow designer"
                fontSize="md"
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
