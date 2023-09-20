import { NumberIncrementer } from "../models/NumberIncrementer";
import { CompatibleElement } from "./CompatibleElement";

export class NumberIncrementerCompatibleElement extends CompatibleElement {
  constructor(element: AnyElement) {
    super(element);
  }

  static fromElement(element: AnyElement) {
    const compatibleElement = CompatibleElement.fromElement(element);
    if (compatibleElement && NumberIncrementer.isAlready(compatibleElement)) {
      return new NumberIncrementerCompatibleElement(element);
    }
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

  static isCompatible(element: AnyElement | CompatibleElement) {
    const compatibleElement =
      element instanceof CompatibleElement
        ? element
        : CompatibleElement.fromElement(element);

    if (compatibleElement === null) {
      return false;
      // number incrementer can only be applied to a compatible element with no existing children
    } else if (
      compatibleElement.element.children &&
      compatibleElement.element.getChildren().length > 0 &&
      compatibleElement.element.getChildren()[0].type !== "String"
    ) {
      return false;
    }
    return true;
  }
}
