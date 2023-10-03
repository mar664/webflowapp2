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
import { useCombolistPosition } from "../../hooks/combolist";
import { CombolistPosition } from "../../types";

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

  const { position, combolistRef, positionByRef, isShown } =
    useCombolistPosition({ isOpen, positionType: CombolistPosition.Above });

  return (
    <Box>
      <Button
        {...getToggleButtonProps({
          ref: positionByRef,
        })}
        variant={"inputElement"}
        size={"sm"}
        isDisabled={disabled}
      >
        {selectedItem && selectedItem.value}
      </Button>
      <Portal>
        <CombolistContainer
          {...position}
          display={isShown ? undefined : "none"}
          ref={combolistRef}
          size={"sm"}
        >
          <Combolist {...getMenuProps()}>
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
    </Box>
  );
}
