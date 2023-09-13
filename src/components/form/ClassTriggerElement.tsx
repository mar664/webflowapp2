import { FormControl, FormLabel, Spinner, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as _ from "lodash";
import Select from "react-select";
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
  const [styles, setStyles] = useState<IStyleItem[]>([]);

  useEffect(() => {
    (async () => {
      setStyles(
        _.uniqWith(
          (await webflow.getAllStyles()).map((v) => ({
            value: `CLASS-${removeChars(v.getName())}`,
            label: v.getName(),
          })),
          (s1, s2) => s1.label === s2.label,
        ).sort((s1, s2) => (s1.label > s2.label ? 1 : -1)),
      );
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
      <Select
        options={styles}
        onChange={handleSelectedItemsChange}
        id={id}
        defaultValue={styles.find((s) => s.value === defaultValue)}
      />
    </FormControl>
  );
}

export default ClassTriggerElement;
