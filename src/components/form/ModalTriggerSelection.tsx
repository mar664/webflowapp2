import { TriggerTypesEnum } from "../../elements/Modal";
import ClassTriggerElement from "./ClassTriggerElement";
import ElementTriggerElement from "./ElementTriggerElement";

interface FormProps {
  trigger: TriggerTypesEnum;
  setSelectedElement: any;
  modalElement: any;
}

function ModalTriggerSelection({
  trigger,
  setSelectedElement,
  modalElement,
}: FormProps) {
  console.log(trigger);
  switch (trigger) {
    case TriggerTypesEnum.enum.Class:
      return <ClassTriggerElement />;
    case TriggerTypesEnum.enum.Element:
      return (
        <ElementTriggerElement
          setSelectedElement={setSelectedElement}
          modalElement={modalElement}
        />
      );
    case undefined:
      return null;
    default:
      throw new Error("Trigger type invalid");
  }
}

export default ModalTriggerSelection;
