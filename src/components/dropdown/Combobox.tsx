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
  forwardRef,
} from "@chakra-ui/react";
import Downshift, { UseSelectStateChangeTypes, useSelect } from "downshift";
import React, { useState } from "react";
import { Tooltip } from "../Tooltip";
import { Combolist, CombolistItem } from "./Combolist";

type Option = { label: string; value: string };

interface Props {
  options: Option[];
  defaultValue: Option;
  onChange: (option: Option) => void;
  label: string;
  helpText: string;
  id: string;
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
}: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
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
    id,
  });
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const ulRef = React.useRef<HTMLUListElement>(null);

  return (
    <>
      <GridItem display={"flex"} alignItems={"center"}>
        <FormLabel {...getLabelProps()}>
          <Tooltip label={helpText} fontSize="md">
            {label}
          </Tooltip>
        </FormLabel>
      </GridItem>
      <GridItem colSpan={3} display="flex" alignItems="center">
        <Button
          {...getToggleButtonProps({
            ref: buttonRef,
            onClick: (event) => {
              const margin = 10;
              if (buttonRef && buttonRef.current && ulRef && ulRef.current) {
                const bodyRect = document.body.getBoundingClientRect();
                ulRef.current.style.display = "";
                const ulRect = ulRef.current.getBoundingClientRect();

                const buttonRect = buttonRef.current.getBoundingClientRect();
                console.log(buttonRect, ulRect, bodyRect);
                let { x, y } = buttonRect;
                if (buttonRect.x + ulRect.width + margin > bodyRect.right) {
                  x =
                    x -
                    (bodyRect.right - (buttonRect.x + ulRect.width + margin));
                }
                if (buttonRect.y + ulRect.height > bodyRect.bottom) {
                  y =
                    y -
                    (bodyRect.bottom - (buttonRect.y + ulRect.height + margin));
                }

                setPosition({ x, y });
              }
            },
          })}
          variant={"select"}
          size={"sm"}
          rightIcon={<UpDownIcon />}
        >
          {selectedItem ? selectedItem.label : "Select"}
        </Button>
        <Portal>
          <Combolist
            display={isOpen ? undefined : "none"}
            {...getMenuProps({ ref: ulRef })}
            left={`${position.x}px`}
            top={`${position.y}px`}
            size={"lg"}
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
      </GridItem>
    </>
  );
}
