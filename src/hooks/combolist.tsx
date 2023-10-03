import { useState, useRef, useEffect } from "react";
import { isInViewport } from "../utils";
import { CombolistPosition } from "../types";

interface Props {
  isOpen: boolean;
  positionType?: CombolistPosition;
  containerRef?: React.RefObject<any>;
  positionByRef?: React.RefObject<any>;
  combolistRef?: React.RefObject<any>;
  margin?: number;
}

export const useCombolistPosition = ({
  isOpen,
  positionType = CombolistPosition.Below,
  positionByRef,
  combolistRef,
  margin = 10,
}: Props) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isShown, setIsShown] = useState(false);

  const _positionByRef = positionByRef ? positionByRef : useRef<any>(null);
  const _combolistRef = combolistRef ? combolistRef : useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      setPosition(getPosition());
    }
    setIsShown(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isShown) {
      if (
        _combolistRef.current &&
        !isInViewport(_combolistRef.current as HTMLElement)
      ) {
        _combolistRef.current.scrollIntoView();
      }
    }
  }, [isShown]);

  const getPosition = () => {
    console.log("called position");

    if (
      _positionByRef &&
      _positionByRef.current &&
      _combolistRef &&
      _combolistRef.current
    ) {
      const bodyRect = document.body.getBoundingClientRect();
      _combolistRef.current.style.display = "";
      const ulRect = _combolistRef.current.getBoundingClientRect();

      const positionByRect = _positionByRef.current.getBoundingClientRect();
      let { x, y } = positionByRect;
      if (positionType === CombolistPosition.Below) {
        y = positionByRect.bottom;
      }
      if (positionByRect.x + ulRect.width + margin > bodyRect.right) {
        x = x - (bodyRect.right - (positionByRect.x + ulRect.width + margin));
      }
      if (positionByRect.y + ulRect.height > bodyRect.bottom) {
        y = y - (bodyRect.bottom - (positionByRect.y + ulRect.height + margin));
      }
      x += window.scrollX;
      y += window.scrollY;
      return { x, y };
    }
    return { x: 0, y: 0 };
  };

  return {
    position: { left: `${position.x}px`, top: `${position.y}px` },
    positionByRef: _positionByRef,
    combolistRef: _combolistRef,
    isShown,
  };
};
