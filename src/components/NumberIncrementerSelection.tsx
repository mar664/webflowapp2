import React from "react";
import {
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { NumberIncrementer } from "../elements/NumberIncrementer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSetPrevElementId } from "../contexts/AppContext";
import { CompatibleElement } from "../elements/CompatibleElement";
import {
  RemoveHandler,
  useNumberIncrementerRemoval,
} from "../hooks/numberIncrementer";
import { RemoveButton } from "./RemoveButton";
import { faCog } from "@fortawesome/free-solid-svg-icons";

interface Props {
  isAlready: boolean;
  currentElement: CompatibleElement;
}

function NumberIncrementerSelection({ isAlready, currentElement }: Props) {
  const navigate = useNavigate();

  const numberIncrementerRemoval = useNumberIncrementerRemoval(currentElement);

  return (
    <ButtonGroup variant="outline" spacing="6" margin={4}>
      {!isAlready ? (
        <Button
          onClick={() =>
            navigate(`/number_incrementer_form/${isAlready}`, { replace: true })
          }
        >
          Transform into a Number Incrementer
        </Button>
      ) : (
        <Tooltip label="Edit number incrementer settings" fontSize="md">
          <Button
            onClick={() =>
              navigate(`/number_incrementer_form/${isAlready}`, {
                replace: true,
              })
            }
            rightIcon={<FontAwesomeIcon icon={faCog} />}
            variant="outline"
            aria-label="Number incrementer settings"
          >
            Edit Number Incrementer
          </Button>
        </Tooltip>
      )}
      {isAlready ? (
        <RemoveButton
          elementType={"Modal"}
          removeHandler={numberIncrementerRemoval?.remove as RemoveHandler}
          buttonProps={{
            "aria-label": "Remove number incrementer",
            colorScheme: "red",
          }}
        />
      ) : null}
    </ButtonGroup>
  );
}

export default NumberIncrementerSelection;
