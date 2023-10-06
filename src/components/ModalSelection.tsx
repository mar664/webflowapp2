import ComponentSelection from "./ComponentSelection";
import { Modal } from "../models/Modal";
import { Paths } from "../paths";
import { HelpModal } from "./HelpModal";
import { BsBoxArrowInUpRight } from "react-icons/bs";

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
      icon={BsBoxArrowInUpRight}
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
