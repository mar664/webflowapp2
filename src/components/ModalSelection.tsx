import ComponentSelection from "./ComponentSelection";
import { Modal } from "../models/Modal";
import { Paths } from "../paths";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { HelpModal } from "./HelpModal";

interface Props {
  index: number;
  disabled: boolean;
  editable: boolean;
}

function ModalSelection({ index, disabled, editable }: Props) {
  return (
    <ComponentSelection
      elementType={Modal.NAME}
      newPath={Paths.newModalForm}
      existingPath={Paths.modalForm}
      icon={faUpRightFromSquare}
      index={index}
      disabled={disabled}
      editable={editable}
      showHelp={({ isOpen, onClose }) => (
        <HelpModal title={"Modal Help"} isOpen={isOpen} onClose={onClose}>
          Inserts a modal dialog. The dialog can be triggered on click by a
          specific element or class. Open and close effects can be configured.
        </HelpModal>
      )}
    />
  );
}

export default ModalSelection;
