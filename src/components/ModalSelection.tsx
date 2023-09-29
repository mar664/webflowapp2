import { useNavigate, generatePath } from "react-router-dom";
import ComponentSelection from "./ComponentSelection";
import { Modal } from "../models/Modal";
import { Paths } from "../paths";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

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
    />
  );
}

export default ModalSelection;
