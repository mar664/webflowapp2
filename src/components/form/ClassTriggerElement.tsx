import { FormControl, FormLabel, Spinner, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as _ from "lodash";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, SingleValue } from "react-select/dist/declarations/src";

interface IStyleItem {
  value: string;
  label: string;
}

interface FormProps {
  setSelectedClass: any;
  defaultValue: string | undefined;
  id: string;
}

function removeChars(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-");
}

function ClassTriggerElement({
  setSelectedClass,
  defaultValue,
  id,
}: FormProps) {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [styles, setStyles] = useState<IStyleItem[]>([]);
  const [value, setValue] = useState<IStyleItem | null>();

  useEffect(() => {
    (async () => {
      const options = _.uniqWith(
        (await webflow.getAllStyles()).map((v) => ({
          value: `.${removeChars(v.getName())}`,
          label: v.getName(),
        })),
        (s1, s2) => s1.label === s2.label,
      ).sort((s1, s2) =>
        s1.label.toLowerCase() > s2.label.toLowerCase() ? 1 : -1,
      );

      setStyles(options);
      setValue(options.find((o) => o.value === defaultValue));
      setIsLoadingData(false);
    })();
  }, []);

  const handleSelectedItemsChange = (
    newValue: SingleValue<IStyleItem>,
    actionMeta: ActionMeta<IStyleItem>,
  ) => {
    if (newValue) {
      console.log(newValue);
      setSelectedClass(newValue.value);
    }
  };

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    (async () => {
      const newOption = {
        value: `.${removeChars(inputValue)}`,
        label: inputValue,
      };
      setIsLoading(false);
      setStyles((prev) =>
        [...prev, newOption].sort((s1, s2) =>
          s1.label.toLowerCase() > s2.label.toLowerCase() ? 1 : -1,
        ),
      );
      setValue(newOption);
    })();
  };

  if (isLoadingData) return <Spinner />;

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
