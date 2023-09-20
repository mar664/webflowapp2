import { useNavigate } from "react-router-dom";
import { CompatibleElement } from "../elements/CompatibleElement";
import { useModalRemoval, useModalVisibility } from "../hooks/modal";
import ComponentSelection from "./ComponentSelection";
import { RemoveHandler } from "../types";

interface Props {
  isAlready: boolean;
  currentElement: CompatibleElement;
}

function ModalSelection({ isAlready, currentElement }: Props) {
  const navigate = useNavigate();

  const modalVisibility = useModalVisibility(currentElement);
  const modalRemoval = useModalRemoval(currentElement);

  return (
    <ComponentSelection
      elementType={"Modal"}
      isAlready={isAlready}
      visibility={modalVisibility}
      removeHandler={modalRemoval?.remove as RemoveHandler}
      newHandler={() => navigate(`/new_modal_form`, { replace: true })}
      existingHandler={() => navigate(`/modal_form`, { replace: true })}
    />
  );
}

export default ModalSelection;
