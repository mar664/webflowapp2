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
  Spinner,
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

      return <Tag variant={"option"}>{letters}</Tag>;
    }
    return <Tag variant={"option"}>{data.label}</Tag>;
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
  onCreateOption: (
    newLabel: string,
    callback: (option: T) => void,
  ) => Promise<void> | void;
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
  const [isLoading, setIsLoading] = useState(false);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => combolistRef.current,
    estimateSize: (i) => (i === 0 || i === 1 ? 48 : 24),
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
    initialInputValue: "",
    onInputValueChange({ inputValue }) {
      debounced(inputValue?.trim());
    },
    itemToString: (item) => (item ? item.label : ""),
    onSelectedItemChange: (changes) => {
      console.log(changes);
      setInputValue("");
      if (changes.selectedItem?.__isNew__ && changes.selectedItem.canCreate) {
        setIsLoading(true);
        onCreateOption(changes.selectedItem.label, (item: T) => {
          selectItem(item);
          setIsLoading(false);
        });
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
    stateReducer: (state, actionAndChanges) => {
      const { type, changes } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
          if (
            changes.selectedItem?.__isNew__ &&
            !changes.selectedItem.canCreate
          ) {
            return { ...changes, selectedItem: value };
          }
          return changes;
        default:
          return changes;
      }
    },
  });

  const { position, positionByRef, isShown } = useCombolistPosition({
    isOpen,
    combolistRef,
  });

  const [hasFocus, setHasFocus] = useState(false);

  return (
    <Box width={"100%"}>
      <FormLabel {...getLabelProps()} fontSize={"label.fontSize"} mb={0}>
        <Tooltip hasArrow label={tooltip}>
          {label}
        </Tooltip>
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
        background="rgba(0, 0, 0, 0.15)"
        borderColor="rgba(255, 255, 255, 0.14)"
        borderRadius="4px"
        borderStyle="solid"
        borderWidth="1px"
        _focus={{ boxShadow: "rgb(36, 150, 255) 0px 0px 0px 1px" }}
        width={"100%"}
        paddingLeft={"3px"}
        paddingRight={"3px"}
        minHeight={"32px"}
        data-focus={isShown || hasFocus ? true : undefined}
        aria-busy={isLoading}
      >
        <IconButton
          icon={<FontAwesomeIcon icon={faLaptop} />}
          aria-label="open combobox"
          {...getToggleButtonProps({ ref: positionByRef })}
          variant={"leftInputElement"}
          flex={"1 1 40px"}
          background={
            selectedItem
              ? "linear-gradient(rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.1) 100%)"
              : undefined
          }
        />
        <Box
          padding={"4px"}
          width={"100%"}
          flex={selectedItem && !inputValue ? "1 1 100%" : "1 1 0%"}
          display="flex"
          aria-busy={isLoading}
        >
          {selectedItem && !selectedItem.__isNew__ && !inputValue && (
            <Tag>{selectedItem?.label}</Tag>
          )}
        </Box>
        <Input
          size="md"
          {...getInputProps({
            onFocus: () => {
              setHasFocus(true);
            },
            onBlur: () => {
              setHasFocus(false);
            },
          })}
          placeholder={isShown ? undefined : placeholder}
          variant={"styleSearch"}
          flex={selectedItem && !inputValue ? "1 1 0%" : "1 1 100%"}
        />
        {selectedItem && !isLoading && (
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
        {isLoading && <Spinner size="sm" />}
      </Box>
      <Portal>
        <CombolistContainer
          style={{
            maxHeight: `200px`,
            width: `95%`,
            overflow: "auto",
          }}
          ref={combolistRef}
          data-hidden={!isShown ? true : undefined}
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
                            data-highlighted={
                              highlightedIndex === virtualRow.index
                                ? true
                                : undefined
                            }
                          >
                            <Box as="span" marginRight={2}>
                              Create
                            </Box>
                            <Tag variant={"option"}>{items[0].label}</Tag>
                          </CombolistItem>
                        ) : (
                          <CombolistItem
                            key={items[0].value}
                            {...getItemProps({
                              index: 0,
                              item: items[0],
                            })}
                            data-highlighted={
                              highlightedIndex === virtualRow.index
                                ? true
                                : undefined
                            }
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
                          data-highlighted={
                            highlightedIndex === virtualRow.index
                              ? true
                              : undefined
                          }
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
