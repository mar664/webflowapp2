import { CompatibleElement } from "./CompatibleElement";

export class NumberIncrementerCompatibleElement extends CompatibleElement {
  constructor(element: AnyElement) {
    super(element);
  }

  static fromElement(element: AnyElement) {
    if (!NumberIncrementerCompatibleElement.isCompatible(element)) {
      return null;
    }
    return new NumberIncrementerCompatibleElement(element);
  }

  static async getSelected() {
    const selectedElement = await webflow.getSelectedElement();
    if (selectedElement) {
      return NumberIncrementerCompatibleElement.fromElement(selectedElement);
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
