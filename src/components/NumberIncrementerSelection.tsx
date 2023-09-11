import React from "react";
import { Button, ButtonGroup, IconButton, useToast } from "@chakra-ui/react";
import { NumberIncrementer } from "../elements/NumberIncrementer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSetPrevElementId } from "../contexts/AppContext";

interface Props {
  isAlready: boolean;
}

function NumberIncrementerSelection({ isAlready }: Props) {
  const navigate = useNavigate();
  const setPrevElement = useSetPrevElementId();
  const toast = useToast();

  const removeNumberIncrementer = async () => {
    const selectedElement = await webflow.getSelectedElement();
    if (selectedElement) {
      // reset the prev element value so that selected element callback fires
      setPrevElement(null);
      await NumberIncrementer.remove(selectedElement);

      toast({
        title: "Number incrementer removed",
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
          console.log("redirect to number incrementer form");
          navigate(`/number_incrementer_form/${isAlready}`);
        }}
      >
        {isAlready
          ? "Edit Number Incrementer"
          : "Transform into a Number Incrementer"}
      </Button>
      {isAlready ? (
        <IconButton
          onClick={removeNumberIncrementer}
          colorScheme="red"
          icon={<FontAwesomeIcon icon={faTrashCan} />}
          aria-label="Remove number incrementer"
        />
      ) : null}
    </ButtonGroup>
  );
}

export default NumberIncrementerSelection;
