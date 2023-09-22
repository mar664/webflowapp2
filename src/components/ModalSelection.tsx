import { useNavigate } from "react-router-dom";
import { CompatibleElement } from "../elements/CompatibleElement";
import { useElementRemoval, useElementVisibility } from "../hooks/element";
import ComponentSelection from "./ComponentSelection";
import { RemoveHandler } from "../types";
import { Modal } from "../models/Modal";

interface Props {
  isAlready: boolean;
  currentElement: CompatibleElement;
}

function ModalSelection({ isAlready, currentElement }: Props) {
  const navigate = useNavigate();

  const visibility = useElementVisibility(currentElement, Modal);
  const removal = useElementRemoval(currentElement, Modal);

  return (
    <ComponentSelection
      elementType={Modal.name}
      isAlready={isAlready}
      visibility={visibility}
      removeHandler={removal?.remove as RemoveHandler}
      newHandler={() => navigate(`/new_modal_form`, { replace: true })}
      existingHandler={() => navigate(`/modal_form`, { replace: true })}
    />
  );
}

export default ModalSelection;
