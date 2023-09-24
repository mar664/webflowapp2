import { NumberIncrementer } from "../models/NumberIncrementer";
import { CompatibleElement } from "./CompatibleElement";

export class NumberIncrementerCompatibleElement
  extends CompatibleElement
  implements Children
{
  readonly children = true;

  constructor(element: AnyElement) {
    super(element);
  }

  getChildren() {
    if (this.element.children) {
      return this.element.getChildren();
    }
    throw new Error("Children should exist");
  }

  setChildren(children: Array<AnyElement>) {
    if (this.element.children) {
      return this.element.setChildren(children);
    }
    throw new Error("Children should be settable");
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
      // modal can only be applied to a compatible element that can have children
    } else if (compatibleElement.element.children) {
      return true;
    }
    return false;
  }
}
