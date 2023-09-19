import { CompatibleElement } from "../elements/CompatibleElement";

export function removeChars(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-");
}

export function toAllStartUppercase(str: string) {
  return str
    .split(" ")
    .map((word: string) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}

export const isModalHidden = (currentElement: CompatibleElement | null) => {
  if (currentElement) {
    const modalStyleElement =
      currentElement.element.children &&
      currentElement.element.getChildren()[0];
    if (
      modalStyleElement &&
      modalStyleElement.type == "DOM" &&
      modalStyleElement.getTag() === "style"
    ) {
      return modalStyleElement.getAttribute("data-mr-modal-visible") === null;
    }
  }
  return false;
};
