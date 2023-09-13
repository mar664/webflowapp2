import { TriggerTypesEnum } from "../../elements/Modal";
import ClassTriggerElement from "./ClassTriggerElement";
import ElementTriggerElement from "./ElementTriggerElement";

interface FormProps {
  trigger: TriggerTypesEnum;
  setSelectedValue: any;
  modalElement: any;
  defaultValue?: string;
  id: string;
}

function ModalTriggerSelection({
  trigger,
  setSelectedValue,
  modalElement,
  defaultValue,
  id,
}: FormProps) {
  console.log(trigger);
  switch (trigger) {
    case TriggerTypesEnum.enum.Class:
      return (
        <ClassTriggerElement
          setSelectedClass={setSelectedValue}
          defaultValue={defaultValue ? `CLASS-${defaultValue}` : undefined}
          id={id}
        />
      );
    case TriggerTypesEnum.enum.Element:
      return (
        <ElementTriggerElement
          setSelectedElement={setSelectedValue}
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
