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
import React, { useState, useRef } from "react";
import { Combolist, CombolistContainer, CombolistItem } from "./Combolist";
import { isInViewport } from "../../utils";

type Option = { label: string; value: string };

interface Props {
  options: Option[];
  defaultValue: Option;
  onChange: (option: Option) => void;
  label: string;
  helpText: string;
  id: string;
  disabled?: boolean;
}

function itemToString(item: Option | null) {
  return item ? item.label : "";
}

export default function Combobox({
  label,
  options,
  defaultValue,
  onChange,
  helpText,
  id,
  disabled = false,
}: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const parentRef = useRef<HTMLDivElement>(null);

  const {
    isOpen,
    selectedItem,
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
      onChange(selectedItem);
    },
    onIsOpenChange: (changes) => {
      if (changes.isOpen) {
        if (
          parentRef.current &&
          !isInViewport(parentRef.current as HTMLElement)
        ) {
          parentRef.current.scrollIntoView();
        }
      }
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
      <GridItem display={"flex"} alignItems={"center"}>
        <FormLabel {...getLabelProps()}>
          <Tooltip label={helpText}>{label}</Tooltip>
        </FormLabel>
      </GridItem>
      <GridItem colSpan={3} display="flex" alignItems="center">
        <Button
          {...getToggleButtonProps({
            ref: buttonRef,
            onClick: onOpenCombobox,
            onKeyUp: onOpenCombobox,
          })}
          variant={"select"}
          size={"sm"}
          rightIcon={<UpDownIcon />}
          disabled={disabled}
        >
          {selectedItem ? selectedItem.label : "Select"}
        </Button>
        <Portal>
          <CombolistContainer
            left={`${position.x}px`}
            top={`${position.y}px`}
            size={"lg"}
            display={isOpen ? undefined : "none"}
            ref={parentRef}
          >
            <Combolist {...getMenuProps({ ref: ulRef })}>
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
          </CombolistContainer>
        </Portal>
      </GridItem>
    </>
  );
}
