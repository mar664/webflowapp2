interface Attributable {
  readonly attributes: true;
  getAttribute(name: string): null | string;
  setAttribute(name: string, value: string): undefined;
  removeAttribute(name: string): undefined;
}

export class CompatibleElement
  implements Attributable, Configurable, Styles, Children
{
  element;
  readonly id: ElementId;
  readonly configurable = true;
  readonly styles = true;
  readonly attributes = true;
  readonly children = true;
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

  save() {
    if (this.element.configurable) {
      return this.element.save();
    }
    throw new Error("Should be able to save");
  }

  static fromElement(element: AnyElement) {
    if (
      (!element.customAttributes && element.type !== "DOM") ||
      !element.styles ||
      !element.configurable ||
      !element.children
    ) {
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
}
