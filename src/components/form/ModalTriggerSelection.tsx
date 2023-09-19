import { TriggerTypesEnum } from "../../elements/Modal";
import { ModalCompatibleElement } from "../../elements/ModalCompatibleElement";
import ClassTriggerElement from "./ClassTriggerElement";
import ElementTriggerElement from "./ElementTriggerElement";

interface FormProps {
  trigger: TriggerTypesEnum;
  setSelectedValue: any;
  modalElement: ModalCompatibleElement;
  defaultValue?: string;
  id: string;
  hideOnModalOpen?: boolean;
  showOnModalOpen?: boolean;
}

function ModalTriggerSelection({
  trigger,
  setSelectedValue,
  modalElement,
  defaultValue,
  id,
  hideOnModalOpen,
  showOnModalOpen,
}: FormProps) {
  console.log(trigger);
  switch (trigger) {
    case TriggerTypesEnum.enum.Class:
      return (
        <ClassTriggerElement
          setSelectedClass={setSelectedValue}
          defaultValue={defaultValue}
          id={id}
        />
      );
    case TriggerTypesEnum.enum.Element:
      return (
        <ElementTriggerElement
          setSelectedElement={setSelectedValue}
          modalElement={modalElement}
          hideOnModalOpen={hideOnModalOpen}
          showOnModalOpen={showOnModalOpen}
        />
      );
    case undefined:
      return null;
    default:
      throw new Error("Trigger type invalid");
  }
}

export default ModalTriggerSelection;
