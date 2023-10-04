import { CheckIcon, UpDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormLabel,
  GridItem,
  Portal,
  Tooltip,
} from "@chakra-ui/react";
import { useSelect } from "downshift";
import { Combolist, CombolistContainer, CombolistItem } from "./Combolist";
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
    onHighlightedIndexChange: (changes) => {
      console.log(changes);
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
      <GridItem colSpan={3} display="flex" alignItems="center">
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
            data-hidden={!isShown ? true : undefined}
            ref={combolistRef}
          >
            <Combolist {...getMenuProps()}>
              {isOpen &&
                options.map((option, index) => (
                  <CombolistItem
                    key={index}
                    {...getItemProps({ item: option, index })}
                    data-highlighted={
                      highlightedIndex === index ? true : undefined
                    }
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
