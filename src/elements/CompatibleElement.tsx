interface Attributable {
  readonly attributes: true;
  getAttribute(name: string): null | string;
  setAttribute(name: string, value: string): undefined;
  removeAttribute(name: string): undefined;
}

interface WebflowElement {
  detach(): Promise<undefined>;
  destroy(): Promise<undefined>;
}

export class CompatibleElement
  implements Attributable, Configurable, Styles, WebflowElement
{
  element;
  readonly id: ElementId;
  readonly configurable = true;
  readonly styles = true;
  readonly attributes = true;
  constructor(element: AnyElement) {
    this.element = element;
    this.id = this.element.id;
  }

  getAttribute(attribute: string) {
    if (this.element.customAttributes) {
      return this.element.getCustomAttribute(attribute);
    } else if (this.element.plugin === "Builtin") {
      return this.element.getAttribute(attribute);
    }
    return null;
  }

  setAttribute(attribute: string, value: string) {
    if (this.element.customAttributes) {
      return this.element.setCustomAttribute(attribute, value);
    } else if (this.element.plugin === "Builtin") {
      return this.element.setAttribute(attribute, value);
    }
  }

  removeAttribute(attribute: string) {
    if (this.element.customAttributes) {
      return this.element.removeCustomAttribute(attribute);
    } else if (this.element.plugin === "Builtin") {
      return this.element.removeAttribute(attribute);
    }
  }

  getStyles() {
    if (this.element.styles) {
      return this.element.getStyles();
    }
    throw new Error("Styles should exist");
  }

  setStyles(styles: Array<Style>) {
    if (this.element.styles) {
      return this.element.setStyles(styles);
    }
    throw new Error("Styles should exist");
  }

  async save() {
    if (this.element.configurable) {
      return this.element.save();
    }
    throw new Error("Should be able to save");
  }

  async detach() {
    return this.element.detach();
  }

  async destroy() {
    return this.element.destroy();
  }

  static fromElement(element: AnyElement) {
    if (!CompatibleElement.isCompatible(element)) {
      return null;
    }
    return new CompatibleElement(element);
  }

  static async getSelected() {
    const selectedElement = await webflow.getSelectedElement();
    if (selectedElement) {
      return CompatibleElement.fromElement(selectedElement);
    }
    return null;
  }

  static isCompatible(element: AnyElement) {
    if (
      (!element.customAttributes && element.plugin === "Basic") ||
      !element.styles ||
      !element.configurable ||
      (element.plugin !== "Builtin" && element.plugin !== "Basic") ||
      (element.type === "DOM" &&
        ["script", "style"].includes(element.getTag() as string))
    ) {
      return false;
    }
    return true;
  }
}
