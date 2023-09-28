import {
  Box,
  Button,
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
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import InputAddon from "../dropdown/InputAddon";
import { Option } from "../../types";

interface FormProps {
  error: string | undefined;
  name: string;
  label: string;
  helpText: string;
  min?: number;
  max?: number;
  onValueChange: (value: number | string) => void;
  initialValue: number | string;
  disabled?: boolean;
  units?:
    | {
        options: Option[];
        conversionFunc: (val: string | undefined) =>
          | {
              value: number;
              unit: string;
            }
          | undefined;
      }
    | string;
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
  disabled,
  units,
}: FormProps) {
  // Parse value e.g. 100ms to {value: 100, unit: "ms"}
  const initialParsedValue =
    units && typeof units !== "string" && typeof initialValue === "string"
      ? units.conversionFunc(initialValue)
      : undefined;

  const [value, setValue] = useState(
    initialParsedValue ? initialParsedValue.value : initialValue,
  );

  const [unit, setUnit] = useState(
    initialParsedValue ? initialParsedValue.unit : undefined,
  );

  // use debounced callback to delay calling for onChange so that it doesn't keep triggering save of form data
  const debounced = useDebouncedCallback(({ valueAsNumber, unit }) => {
    onValueChange(unit ? `${valueAsNumber}${unit}` : valueAsNumber);
  }, 1000);

  return (
    <>
      <GridItem display={"flex"} alignItems={"center"}>
        <FormLabel htmlFor={name} fontSize={"label.fontSize"} mb={0}>
          <Tooltip label={helpText}>{label}</Tooltip>
        </FormLabel>
      </GridItem>
      <GridItem>
        <InputGroup>
          <NumberInput
            allowMouseWheel
            size="sm"
            maxW={"full"}
            id={name}
            onChange={(valueAsString, valueAsNumber) => {
              setValue(valueAsNumber);
              debounced({ valueAsNumber, unit });
            }}
            value={value}
            min={min}
            max={max}
            isDisabled={disabled}
          >
            <NumberInputField />
          </NumberInput>

          {units && typeof units !== "string" && (
            <InputRightElement>
              <InputAddon
                disabled={disabled}
                defaultValue={units.options.find(
                  (o) => o.value === initialParsedValue?.unit,
                )}
                id={`${name}-units`}
                {...units}
                onChange={(option) => {
                  onValueChange(`${value}${option.value}`);
                  setUnit(option.value);
                }}
              />
            </InputRightElement>
          )}

          {units && typeof units === "string" && (
            <InputRightElement>
              <Box as="span">{units}</Box>
            </InputRightElement>
          )}
        </InputGroup>
      </GridItem>
    </>
  );
}

export default NumberFormElement;
