import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface FormProps {
  error: string | undefined;
  name: string;
  label: string;
  helpText: string;
  min?: number;
  max?: number;
  onValueChange: (value: number) => void;
  initialValue: number;
  formatter?: (val: number) => string;
  parser?: (val: string) => number;
}

function NumberFormElement({
  error,
  name,
  label,
  onValueChange,
  initialValue,
  helpText,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  formatter = (val) => val.toString(),
  parser = (val) => parseInt(val),
}: FormProps) {
  const [value, setValue] = useState(initialValue);
  // use debounced callback to delay calling for onChange so that it doesn't keep triggering save of form data
  const debounced = useDebouncedCallback((value) => {
    onValueChange(value);
  }, 1000);
  console.log("inital value is", value);
  return (
    <FormControl isInvalid={!!error} padding={"2"}>
      <FormLabel htmlFor={name}>
        <Tooltip label={helpText} fontSize="md">
          {label}
        </Tooltip>
      </FormLabel>
      <NumberInput
        size="sm"
        maxW={"full"}
        id={name}
        onChange={(valueAsString, valueAsNumber) => {
          setValue(parser(valueAsString));
          debounced(parser(valueAsString));
        }}
        value={formatter(value)}
        min={min}
        max={max}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}

export default NumberFormElement;
