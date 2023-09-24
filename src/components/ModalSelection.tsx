import { useNavigate } from "react-router-dom";
import ComponentSelection from "./ComponentSelection";
import { Modal } from "../models/Modal";
import { Paths } from "../paths";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

interface Props {
  index: number;
  disabled: boolean;
}

function ModalSelection({ index, disabled }: Props) {
  const navigate = useNavigate();

  return (
    <ComponentSelection
      elementType={Modal.NAME}
      newHandler={() => navigate(Paths.newModalForm, { replace: true })}
      icon={faUpRightFromSquare}
      index={index}
      disabled={disabled}
    />
  );
}

export default ModalSelection;
