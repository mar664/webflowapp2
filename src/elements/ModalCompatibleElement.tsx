import { CompatibleElement } from "./CompatibleElement";
import { Modal } from "./Modal";

export class ModalCompatibleElement
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
    if (compatibleElement && Modal.isAlready(compatibleElement)) {
      return new ModalCompatibleElement(element);
    }
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

  static isCompatible(element: AnyElement | CompatibleElement) {
    const compatibleElement =
      element instanceof CompatibleElement
        ? element
        : CompatibleElement.fromElement(element);

    if (compatibleElement === null) {
      return false;
      // modal can only be applied to a compatible element that can have children
    } else if (!compatibleElement.element.children) {
      return false;
      // modal can only be applied to a compatible element with no existing children
    } else if (
      compatibleElement.element.children &&
      compatibleElement.element.getChildren().length > 0
    ) {
      return false;
    }
    return true;
  }
}
