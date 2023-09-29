import ComponentSelection from "./ComponentSelection";
import { NumberIncrementer } from "../models/NumberIncrementer";
import { Paths } from "../paths";
import { faArrowDown19 } from "@fortawesome/free-solid-svg-icons";

interface Props {
  index: number;
  disabled: boolean;
  editable: boolean;
}

function NumberIncrementerSelection({ index, disabled, editable }: Props) {
  return (
    <ComponentSelection
      elementType={NumberIncrementer.NAME}
      newPath={Paths.newNumberIncrementerForm}
      existingPath={Paths.numberIncrementerForm}
      icon={faArrowDown19}
      index={index}
      disabled={disabled}
      editable={editable}
    />
  );
}

export default NumberIncrementerSelection;
