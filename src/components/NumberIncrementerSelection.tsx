import { useNavigate } from "react-router-dom";
import ComponentSelection from "./ComponentSelection";
import { NumberIncrementer } from "../models/NumberIncrementer";
import { Paths } from "../paths";
import { faArrowDown19 } from "@fortawesome/free-solid-svg-icons";

interface Props {
  index: number;
  disabled: boolean;
}

function NumberIncrementerSelection({ index, disabled }: Props) {
  const navigate = useNavigate();
  console.log(disabled);

  return (
    <ComponentSelection
      elementType={NumberIncrementer.NAME}
      newHandler={() =>
        navigate(Paths.newNumberIncrementerForm, { replace: true })
      }
      icon={faArrowDown19}
      index={index}
      disabled={disabled}
    />
  );
}

export default NumberIncrementerSelection;
