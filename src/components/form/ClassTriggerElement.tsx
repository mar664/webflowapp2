import { useState } from "react";
import { IStyleItem } from "../../hooks/styles";
import { removeChars } from "../../utils";
import { useStyles } from "../../contexts/AppContext";
import { ComboSearchBox } from "../dropdown/ComboSearchBox";
import { Option } from "../../types";

interface FormProps {
  setSelectedClass: any;
  defaultValue: string | undefined;
  id: string;
}

const filterStyle = (item: IStyleItem, inputValue: string) => {
  return item.label.toLowerCase().includes(inputValue);
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

  const handleSelectedItemChange = (
    newValue: IStyleItem | null | undefined,
  ) => {
    if (
      newValue &&
      typeof newValue === "object" &&
      "value" in newValue &&
      "label" in newValue &&
      !newValue.__isNew__
    ) {
      setSelectedClass(newValue.value);
      setValue(newValue);
    } else if (
      (newValue && newValue?.__isNew__) ||
      newValue === undefined ||
      newValue === null
    ) {
      setSelectedClass(undefined);
      setValue(undefined);
    }
  };

  const handleCreate = (
    newLabel: string,
    callback: (option: Option) => void,
  ) => {
    setIsLoading(true);
    (async () => {
      const newStyle = webflow.createStyle(newLabel);
      await newStyle.save();

      const newOption = {
        value: `.${removeChars(newLabel)}`,
        label: newLabel,
      };

      setStyles((prev) =>
        [...prev, newOption].sort((s1, s2) =>
          s1.label.toLowerCase() > s2.label.toLowerCase() ? 1 : -1,
        ),
      );
      setValue(newOption);
      setSelectedClass(newOption.value);
      callback(newOption);
      setIsLoading(false);
    })();
  };

  return (
    <ComboSearchBox
      placeholder="Select a class or type new class"
      options={styles}
      value={value}
      onCreateOption={handleCreate}
      handleSelectedItemChange={handleSelectedItemChange}
      handleFilter={filterStyle}
      id={id}
      label={"Style selector"}
      tooltip={"Select a style"}
    />
  );
}

export default ClassTriggerElement;
