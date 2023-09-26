import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  MenuListProps,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  ChakraStylesConfig,
  CreatableSelect,
  chakraComponents,
} from "chakra-react-select";
import {
  ActionMeta,
  GroupBase,
  MultiValue,
  OnChangeValue,
  SelectComponentsConfig,
  SingleValue,
} from "react-select/dist/declarations/src";
import { IStyleItem } from "../../hooks/styles";
import { removeChars } from "../../utils";
import { useStyles } from "../../contexts/AppContext";
import { Tooltip } from "../Tooltip";
import { CloseIcon } from "@chakra-ui/icons";

interface FormProps {
  setSelectedClass: any;
  defaultValue: string | undefined;
  id: string;
}

const chakraStyles: ChakraStylesConfig<IStyleItem> = {
  control: (provided, state) => ({
    ...provided,
    background: "rgb(43, 43, 43)",
    borderColor: "rgb(33, 33, 33)",
    borderRadius: "2px",
    borderStyle: "solid",
    borderWidth: "1px",
    boxShadow: state.isFocused ? "rgb(36, 150, 255) 0px 0px 0px 1px" : "none",
  }),
  input: (provided, state) => ({
    ...provided,
    color: "rgb(117, 117, 117)",
    minHeight: "28px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    justifyContent: "start",
  }),
  container: (provided, state) => ({
    ...provided,
    width: "100%",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "11px",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "rgb(117, 117, 117)",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    cursor: "text",
    userSelect: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "26px",
    maxWidth: "100%",
    paddingLeft: "6px",
    paddingRight: "6px",
    borderRadius: "2px",
    height: "24px",
    background: "rgb(0, 115, 230)",
    position: "relative",
    fontSize: "11px",
    textShadow: "none",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px",
    overflow: "hidden",
    color: "rgb(255, 255, 255)",
  }),
};

const customComponents: SelectComponentsConfig<
  IStyleItem,
  false,
  GroupBase<IStyleItem>
> = {
  DropdownIndicator: ({ ...props }) => null,
  MenuList: ({ children, ...props }) => {
    let firstChild;
    console.log(children);
    if (
      children &&
      Array.isArray(children) &&
      children.length > 0 &&
      children[0].props &&
      children[0].props.data &&
      children[0].props.data.__isNew__
    ) {
      firstChild = children.shift();
    }
    console.log(firstChild);
    return (
      <chakraComponents.MenuList {...props}>
        <Box
          background={"rgb(64, 64, 64)"}
          fontWeight={"bold"}
          paddingLeft={"6px"}
          paddingTop={"4px"}
          paddingBottom={"4px"}
        >
          New Class
        </Box>
        {firstChild ? (
          firstChild
        ) : (
          <Box paddingLeft={"6px"} paddingTop={"4px"} paddingBottom={"4px"}>
            Type to create a new class
          </Box>
        )}

        {children && Array.isArray(children) && children.length > 0 ? (
          <>
            <Box
              background={"rgb(64, 64, 64)"}
              fontWeight={"bold"}
              paddingLeft={"6px"}
              paddingTop={"4px"}
              paddingBottom={"4px"}
            >
              Existing Classes
            </Box>
            {children}
          </>
        ) : null}
      </chakraComponents.MenuList>
    );
  },
};

function ClassTriggerElement({
  setSelectedClass,
  defaultValue,
  id,
}: FormProps) {
  const { styles, setStyles, isLoading, setIsLoading, update } = useStyles();
  const [value, setValue] = useState<IStyleItem | undefined>(
    styles.find((o) => o.value === defaultValue),
  );

  const handleSelectedItemsChange = (
    newValue: SingleValue<IStyleItem> | MultiValue<IStyleItem>,
    actionMeta: ActionMeta<IStyleItem>,
  ) => {
    console.log(newValue, actionMeta);
    if (
      newValue &&
      typeof newValue === "object" &&
      "value" in newValue &&
      "label" in newValue
    ) {
      console.log(newValue);
      setSelectedClass(newValue.value);
      setValue(newValue);
    }
    if (actionMeta.action === "clear") {
      setSelectedClass(undefined);
      setValue(undefined);
    }
  };

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    (async () => {
      const newStyle = webflow.createStyle(inputValue);
      await newStyle.save();

      const newOption = {
        value: `.${removeChars(inputValue)}`,
        label: inputValue,
      };

      setStyles((prev) =>
        [...prev, newOption].sort((s1, s2) =>
          s1.label.toLowerCase() > s2.label.toLowerCase() ? 1 : -1,
        ),
      );
      setValue(newOption);
      setSelectedClass(newOption.value);
      setIsLoading(false);
    })();
  };

  return (
    <FormControl>
      <FormLabel htmlFor={id} mb="1">
        <Tooltip label="The class to open the modal on click" fontSize="md">
          Style selector
        </Tooltip>
      </FormLabel>
      <CreatableSelect
        placeholder="Select a class or type new class"
        isLoading={isLoading}
        onChange={handleSelectedItemsChange}
        onCreateOption={handleCreate}
        options={styles}
        value={value}
        id={id}
        chakraStyles={chakraStyles}
        components={customComponents}
        menuPortalTarget={document.body}
        isClearable={true}
        variant="default"
        createOptionPosition="first"
      />
    </FormControl>
  );
}

export default ClassTriggerElement;
