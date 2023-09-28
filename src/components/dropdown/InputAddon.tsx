import { CheckIcon, UpDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  GridItem,
  Icon,
  List,
  ListIcon,
  ListItem,
  Portal,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Downshift, { UseSelectStateChangeTypes, useSelect } from "downshift";
import React, { useState } from "react";
import { Combolist, CombolistItem } from "./Combolist";

type Option = { label: string; value: string };

interface Props {
  options: Option[];
  defaultValue: Option | undefined;
  onChange: (option: Option) => void;
  id: string;
  disabled?: boolean;
}

function itemToString(item: Option | null) {
  return item ? item.label : "";
}

export default function InputAddon({
  options,
  defaultValue,
  onChange,
  id,
  disabled = false,
}: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState(defaultValue);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    itemToString,
    selectedItem: defaultValue,
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) {
        return;
      }
      setSelectedItem(selectedItem);
      onChange(selectedItem);
    },
    id,
  });
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const ulRef = React.useRef<HTMLUListElement>(null);

  const onOpenCombobox = () => {
    const margin = 10;
    if (buttonRef && buttonRef.current && ulRef && ulRef.current) {
      const bodyRect = document.body.getBoundingClientRect();
      ulRef.current.style.display = "";
      const ulRect = ulRef.current.getBoundingClientRect();

      const buttonRect = buttonRef.current.getBoundingClientRect();
      let { x, y } = buttonRect;
      if (buttonRect.x + ulRect.width + margin > bodyRect.right) {
        x = x - (bodyRect.right - (buttonRect.x + ulRect.width + margin));
      }
      if (buttonRect.y + ulRect.height > bodyRect.bottom) {
        y = y - (bodyRect.bottom - (buttonRect.y + ulRect.height + margin));
      }
      x += window.scrollX;
      y += window.scrollY;
      setPosition({ x, y });
    }
  };

  return (
    <>
      <Button
        {...getToggleButtonProps({
          ref: buttonRef,
          onClick: onOpenCombobox,
          onKeyUp: onOpenCombobox,
        })}
        variant={"inputElement"}
        size={"sm"}
        isDisabled={disabled}
      >
        {selectedItem && selectedItem.value}
      </Button>
      <Portal>
        <Combolist
          display={isOpen ? undefined : "none"}
          {...getMenuProps({ ref: ulRef })}
          left={`${position.x}px`}
          top={`${position.y}px`}
          size={"sm"}
        >
          {options.map((option, index) => (
            <CombolistItem
              {...getItemProps({ item: option, index })}
              itemIndex={index}
              highlightedIndex={highlightedIndex}
              variant={highlightedIndex === index ? "selected" : undefined}
              key={index}
              aria-selected={selectedItem?.value === option.value}
            >
              <Box margin={"3px"} width={"13px"}>
                {selectedItem?.value === option.value && <CheckIcon />}
              </Box>
              {option.label}
            </CombolistItem>
          ))}
        </Combolist>
      </Portal>
    </>
  );
}
