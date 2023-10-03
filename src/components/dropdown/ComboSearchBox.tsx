import { useRef, useState, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCombobox } from "downshift";
import {
  FormLabel,
  Tooltip,
  Input,
  Portal,
  Box,
  Tag,
  Text,
  IconButton,
} from "@chakra-ui/react";
import {
  Combolist,
  CombolistContainer,
  CombolistHeading,
  CombolistItem,
  CombolistRow,
} from "./Combolist";
import { useDebouncedCallback } from "use-debounce";
import { faLaptop, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCombolistPosition } from "../../hooks/combolist";

const formatOptionLabel = (data: any, formatOptionLabelMeta: any) => {
  if (!data.__isNew__) {
    const letters = [];
    if (formatOptionLabelMeta.inputValue !== "") {
      const inputChars = formatOptionLabelMeta.inputValue
        .toLowerCase()
        .split("");

      const iterator = data.label[Symbol.iterator]();
      let theChar = iterator.next();

      while (!theChar.done) {
        if (
          inputChars.includes(theChar.value.toLowerCase()) &&
          theChar.value !== " "
        ) {
          letters.push(
            <Text as={"b"}>
              <Text as={"u"}>{theChar.value}</Text>
            </Text>,
          );
        } else {
          letters.push(
            theChar.value !== " " ? theChar.value : <span>&nbsp;</span>,
          );
        }
        theChar = iterator.next();
      }

      return <Tag>{letters}</Tag>;
    }
    return <Tag>{data.label}</Tag>;
  }
  return data.label;
};

export interface Option {
  __isNew__?: boolean;
  canCreate?: boolean;
  value: string;
  label: string;
  descripion?: string;
}

export interface ComboSearchBoxProps<T extends Option> {
  placeholder: string;
  onCreateOption: (newLabel: string) => Promise<void> | void;
  options: T[];
  value: T | undefined;
  handleSelectedItemChange: (newValue: T | null | undefined) => void;
  handleFilter: (item: T, value: string) => boolean;
  filterAsLowercase?: boolean;
  debounceTimeOut?: number;
  id: string;
  label: string;
  tooltip: string;
}

export const ComboSearchBox = <T extends Option>({
  placeholder,
  onCreateOption,
  options,
  value,
  handleSelectedItemChange,
  handleFilter,
  filterAsLowercase = true,
  debounceTimeOut = 500,
  id,
  label,
  tooltip,
}: ComboSearchBoxProps<T>) => {
  const _options = useMemo(
    () =>
      [
        {
          canCreate: false,
          value: "Create",
          label: "Create",
          __isNew__: true,
        } as T,
      ].concat(options),
    [options],
  );
  const [items, setItems] = useState(_options);
  const combolistRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => combolistRef.current,
    estimateSize: (i) => (i === 0 || i === 1 ? 54 : 30),
    overscan: 10,
  });

  const debounced = useDebouncedCallback((inputValue) => {
    console.log("debounced input value", inputValue);

    const filterInputValue = filterAsLowercase
      ? inputValue?.toLowerCase()
      : inputValue;

    console.log(filterInputValue);
    let filteredOptions = null;
    if (filterInputValue === "" || filterInputValue === undefined) {
      filteredOptions = [..._options];
    } else {
      filteredOptions = _options.filter(
        (item) => item.__isNew__ || handleFilter(item, filterInputValue),
      );
    }

    // if input value exists and is not already in styles list
    filteredOptions[0].canCreate =
      filterInputValue !== "" &&
      filterInputValue !== undefined &&
      !filteredOptions.some(
        (o) => !o.__isNew__ && o.label.toLowerCase() === filterInputValue,
      );
    filteredOptions[0].label = inputValue;

    setItems(filteredOptions);

    // Scroll to existing classes if results are found
    if (filteredOptions.length > 1) {
      try {
        rowVirtualizer.scrollToOffset(74);
      } catch (ex) {
        // do nothing
      }
    } else {
      try {
        rowVirtualizer.scrollToOffset(0);
      } catch (ex) {
        // do nothing
      }
    }
  }, debounceTimeOut);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    inputValue,
    closeMenu,
    setInputValue,
    selectItem,
    openMenu,
    toggleMenu,
  } = useCombobox({
    id,
    items,
    initialSelectedItem: value,
    onInputValueChange({ inputValue }) {
      debounced(inputValue?.trim());
    },
    itemToString: (item) => (item ? item.label : ""),
    onSelectedItemChange: (changes) => {
      console.log(changes);
      setInputValue("");
      if (changes.selectedItem?.__isNew__ && changes.selectedItem.canCreate) {
        onCreateOption(changes.selectedItem.label);
      } else {
        handleSelectedItemChange(changes.selectedItem);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onHighlightedIndexChange: ({ highlightedIndex, type }) => {
      console.log(type);
      if (
        type !== useCombobox.stateChangeTypes.ItemMouseMove &&
        type !== useCombobox.stateChangeTypes.MenuMouseLeave
      ) {
        rowVirtualizer.scrollToIndex(highlightedIndex as number);
      }
    },
  });

  const { position, positionByRef, isShown } = useCombolistPosition({
    isOpen,
    combolistRef,
  });

  return (
    <Box width={"100%"}>
      <FormLabel {...getLabelProps()} fontSize={"label.fontSize"} mb={0}>
        <Tooltip label={tooltip}>{label}</Tooltip>
      </FormLabel>
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        onClick={(event) => {
          if (!isShown) {
            openMenu();
          }
        }}
        background="rgb(43, 43, 43)"
        borderColor="rgb(33, 33, 33)"
        borderRadius="2px"
        borderStyle="solid"
        borderWidth="1px"
        _focus={{ boxShadow: "rgb(36, 150, 255) 0px 0px 0px 1px" }}
        width={"100%"}
        paddingLeft={"3px"}
        paddingRight={"3px"}
        minHeight={"32px"}
        data-focus={isShown ? true : undefined}
      >
        <IconButton
          icon={<FontAwesomeIcon icon={faLaptop} />}
          aria-label="open combobox"
          {...getToggleButtonProps({ ref: positionByRef })}
          variant={"leftInputElement"}
          flex={"1 1 40px"}
        />
        <Box
          padding={"4px"}
          width={"100%"}
          flex={selectedItem ? "1 1 100%" : "1 1 0%"}
          display="flex"
        >
          {selectedItem && <Tag>{selectedItem?.label}</Tag>}
        </Box>
        <Input
          size="md"
          {...getInputProps()}
          placeholder={isShown ? undefined : placeholder}
          variant={"styleSearch"}
          flex={selectedItem ? "1 1 0%" : "1 1 100%"}
        />
        {selectedItem && (
          <IconButton
            icon={<FontAwesomeIcon icon={faClose} />}
            aria-label="close combobox"
            onClick={() => {
              closeMenu();
              setInputValue("");
              selectItem(null);
            }}
            size={"xs"}
            variant={"closeInputElement"}
          />
        )}
      </Box>
      <Portal>
        <CombolistContainer
          style={{
            maxHeight: `200px`,
            width: `95%`,
            overflow: "auto",
          }}
          ref={combolistRef}
          display={isShown ? "block" : "none"}
          {...position}
        >
          <Combolist
            {...getMenuProps()}
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {isShown && (
              <>
                {rowVirtualizer.getVirtualItems().map((virtualRow, index) => (
                  <>
                    {virtualRow.index === 0 && items[0].__isNew__ && (
                      <CombolistRow
                        height={`${virtualRow.size}px`}
                        transform={`translateY(${virtualRow.start}px)`}
                      >
                        <CombolistHeading>New Class</CombolistHeading>
                        {items[0].canCreate ? (
                          <CombolistItem
                            key={items[0].value}
                            {...getItemProps({
                              index: 0,
                              item: items[0],
                            })}
                          >
                            <Box as="span" marginRight={2}>
                              Create
                            </Box>
                            <Tag>{items[0].label}</Tag>
                          </CombolistItem>
                        ) : (
                          <CombolistItem
                            key={items[0].value}
                            {...getItemProps({
                              index: 0,
                              item: items[0],
                            })}
                          >
                            Type to create a new class
                          </CombolistItem>
                        )}
                      </CombolistRow>
                    )}
                    {((rowVirtualizer.getVirtualItems().length > 1 &&
                      virtualRow.index > 0) ||
                      !items[0]?.__isNew__) && (
                      <CombolistRow
                        height={`${virtualRow.size}px`}
                        transform={`translateY(${virtualRow.start}px)`}
                      >
                        {virtualRow.index === 1 && (
                          <CombolistHeading>Existing Classes</CombolistHeading>
                        )}
                        <CombolistItem
                          key={items[virtualRow.index].value}
                          {...getItemProps({
                            index: virtualRow.index,
                            item: items[virtualRow.index],
                          })}
                        >
                          {formatOptionLabel(
                            {
                              __isNew__: false,
                              label: items[virtualRow.index].label,
                            },
                            { inputValue },
                          )}
                        </CombolistItem>
                      </CombolistRow>
                    )}
                  </>
                ))}
              </>
            )}
          </Combolist>
        </CombolistContainer>
      </Portal>
    </Box>
  );
};
