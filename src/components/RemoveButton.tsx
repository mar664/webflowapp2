import { IconButton, IconButtonProps, useDisclosure } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { RemoveHandler } from "../types";
import { RemoveDialog } from "./RemoveDialog";

interface Props {
  elementType: string;
  removeHandler: RemoveHandler;
  buttonProps: IconButtonProps;
}

export function RemoveButton({
  elementType,
  removeHandler,
  buttonProps,
}: Props) {
  const disclosure = useDisclosure();

  return (
    <>
      <RemoveDialog
        elementType={elementType}
        removeHandler={removeHandler}
        disclosure={disclosure}
      />
      <IconButton
        variant={"headerIcon"}
        onClick={disclosure.onOpen}
        icon={<FontAwesomeIcon icon={faTrashCan} />}
        {...buttonProps}
      />
    </>
  );
}
