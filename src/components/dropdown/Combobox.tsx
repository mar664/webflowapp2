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
import React, { useState, useRef, useEffect } from "react";
import { Combolist, CombolistContainer, CombolistItem } from "./Combolist";
import { isInViewport } from "../../utils";
import { useCombolistPosition } from "../../hooks/combolist";
import { CombolistPosition } from "../../types";

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

  const { position, positionByRef, combolistRef, isShown } =
    useCombolistPosition({ isOpen, positionType: CombolistPosition.Above });

  return (
    <>
      <GridItem display={"flex"} alignItems={"center"}>
        <FormLabel {...getLabelProps()}>
          <Tooltip label={helpText}>{label}</Tooltip>
        </FormLabel>
      </GridItem>
      <GridItem
        colSpan={3}
        display="flex"
        alignItems="center"
      >
        <Button
          {...getToggleButtonProps({
            ref: positionByRef,
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
            {...position}
            size={"lg"}
            display={isShown ? undefined : "none"}
            ref={combolistRef}
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
      </GridItem>
    </>
  );
}
