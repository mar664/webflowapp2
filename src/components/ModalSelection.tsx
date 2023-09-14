import React from "react";
import { Button, ButtonGroup, IconButton, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSetPrevElementId } from "../contexts/AppContext";
import { Modal } from "../elements/Modal";
import { CompatibleElement } from "../elements/CompatibleElement";

interface Props {
  isAlready: boolean;
}

function ModalSelection({ isAlready }: Props) {
  const navigate = useNavigate();
  const setPrevElement = useSetPrevElementId();
  const toast = useToast();

  const removeModal = async () => {
    const selectedElement = await CompatibleElement.getSelected();
    if (selectedElement) {
      // reset the prev element value so that selected element callback fires
      setPrevElement(null);
      await Modal.remove(selectedElement);

      toast({
        title: "Modal removed",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <ButtonGroup variant="outline" spacing="6" margin={4}>
      <Button
        onClick={() => {
          console.log("redirect to modal form");
          navigate(`/modal_form/${isAlready}`);
        }}
      >
        {isAlready ? "Edit Modal" : "Transform into a Modal"}
      </Button>
      {isAlready ? (
        <IconButton
          onClick={removeModal}
          colorScheme="red"
          icon={<FontAwesomeIcon icon={faTrashCan} />}
          aria-label="Remove number incrementer"
        />
      ) : null}
    </ButtonGroup>
  );
}

export default ModalSelection;
