import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Tooltip } from "../Tooltip";

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
  disabled?: boolean;
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
  disabled,
}: FormProps) {
  const [value, setValue] = useState(initialValue);
  // use debounced callback to delay calling for onChange so that it doesn't keep triggering save of form data
  const debounced = useDebouncedCallback((value) => {
    onValueChange(value);
  }, 1000);

  return (
    <>
      <GridItem display={"flex"} alignItems={"center"}>
        <FormLabel htmlFor={name} fontSize={"label.fontSize"} mb={0}>
          <Tooltip label={helpText} fontSize="md">
            {label}
          </Tooltip>
        </FormLabel>
      </GridItem>
      <GridItem>
        <InputGroup>
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
            isDisabled={disabled}
          >
            <NumberInputField
              backgroundColor={"input.background"}
              borderColor={"input.borderColor"}
              borderRadius={"input.borderRadius"}
              color={"input.color"}
              fontSize={"input.fontSize"}
              _hover={{ borderColor: "input.borderColor" }}
            />
          </NumberInput>
        </InputGroup>
      </GridItem>
    </>
  );
}

export default NumberFormElement;
