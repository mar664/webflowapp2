import { useNavigate } from "react-router-dom";
import { CompatibleElement } from "../elements/CompatibleElement";
import {
  RemoveHandler,
  useNumberIncrementerRemoval,
} from "../hooks/numberIncrementer";
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
