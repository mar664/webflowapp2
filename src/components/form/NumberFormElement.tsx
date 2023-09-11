import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

interface FormProps {
  error: any;
  name: string;
  label: string;
  onValueChange: (value: number) => void;
  initialValue: number;
}

function NumberFormElement({
  error,
  name,
  label,
  onValueChange,
  initialValue,
}: FormProps) {
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      onValueChange(value);
    },
    // delay in ms
    1000,
  );

  return (
    <FormControl isInvalid={!!error} padding={"2"}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <NumberInput
        size="xs"
        maxW={16}
        id={name}
        onChange={(valueAsString, valueAsNumber) => debounced(valueAsNumber)}
        defaultValue={initialValue}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default NumberFormElement;
