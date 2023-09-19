import { FormControl, FormLabel, Spinner, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, SingleValue } from "react-select/dist/declarations/src";
import { IStyleItem } from "../../hooks/styles";
import { removeChars } from "../../utils";
import { useStyles } from "../../contexts/AppContext";

interface FormProps {
  setSelectedClass: any;
  defaultValue: string | undefined;
  id: string;
}

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
    newValue: SingleValue<IStyleItem>,
    actionMeta: ActionMeta<IStyleItem>,
  ) => {
    if (newValue) {
      console.log(newValue);
      setSelectedClass(newValue.value);
      setValue(newValue);
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

  if (isLoading) return <Spinner />;

  return (
    <FormControl margin={"2"}>
      <FormLabel htmlFor={id} mb="0">
        <Tooltip
          label="The effect to use when displaying the modal"
          fontSize="md"
        >
          Select class
        </Tooltip>
      </FormLabel>
      <CreatableSelect
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={handleSelectedItemsChange}
        onCreateOption={handleCreate}
        options={styles}
        value={value}
        id={id}
      />
    </FormControl>
  );
}

export default ClassTriggerElement;
