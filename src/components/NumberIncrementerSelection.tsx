import { useNavigate } from "react-router-dom";
import { CompatibleElement } from "../elements/CompatibleElement";
import { useElementRemoval } from "../hooks/element";
import ComponentSelection from "./ComponentSelection";
import { NumberIncrementer } from "../models/NumberIncrementer";
import { RemoveHandler } from "../types";

interface Props {
  isAlready: boolean;
  currentElement: CompatibleElement;
}

function NumberIncrementerSelection({ isAlready, currentElement }: Props) {
  const navigate = useNavigate();

  const removal = useElementRemoval(currentElement, NumberIncrementer);

  return (
    <ComponentSelection
      elementType={NumberIncrementer.NAME}
      isAlready={isAlready}
      removeHandler={removal?.remove as RemoveHandler}
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
