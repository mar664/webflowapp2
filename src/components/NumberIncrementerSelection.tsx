import ComponentSelection from "./ComponentSelection";
import { NumberIncrementer } from "../models/NumberIncrementer";
import { Paths } from "../paths";
import { faArrowDown19 } from "@fortawesome/free-solid-svg-icons";
import { HelpModal } from "./HelpModal";

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
      showHelp={({ isOpen, onClose }) => (
        <HelpModal
          title={"Number Incrementer Help"}
          isOpen={isOpen}
          onClose={onClose}
        >
          Inserts or transforms existing element into a number incrmenter
          element. The element will count up from the start value to the final
          value over the set time interval.
        </HelpModal>
      )}
    />
  );
}

export default NumberIncrementerSelection;
