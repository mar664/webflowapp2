import { CompatibleElement } from "./CompatibleElement";

export class ModalCompatibleElement extends CompatibleElement {
  constructor(element: AnyElement) {
    super(element);
  }

  static fromElement(element: AnyElement) {
    if (!ModalCompatibleElement.isCompatible(element)) {
      return null;
    }
    return new ModalCompatibleElement(element);
  }

  static async getSelected() {
    const selectedElement = await webflow.getSelectedElement();
    if (selectedElement) {
      return ModalCompatibleElement.fromElement(selectedElement);
    }
    return null;
  }

  static isCompatible(element: AnyElement) {
    if (!CompatibleElement.isCompatible(element)) {
      return false;
    }
    return true;
  }
}
