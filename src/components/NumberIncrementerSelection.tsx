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
import ComponentSelection from "./ComponentSelection";

interface Props {
  isAlready: boolean;
  currentElement: CompatibleElement;
}

function NumberIncrementerSelection({ isAlready, currentElement }: Props) {
  const navigate = useNavigate();

  const numberIncrementerRemoval = useNumberIncrementerRemoval(currentElement);

  return (
    <ComponentSelection
      elementType={"Number Incrementer"}
      isAlready={isAlready}
      removeHandler={numberIncrementerRemoval?.remove as RemoveHandler}
      newHandler={() =>
        navigate(`/number_incrementer_form/${isAlready}`, { replace: true })
      }
      existingHandler={() =>
        navigate(`/number_incrementer_form/${isAlready}`, { replace: true })
      }
    />
  );
}

export default NumberIncrementerSelection;
