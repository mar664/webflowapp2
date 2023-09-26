import { CheckIcon, UpDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";

type Option = { label: string; value: string };

interface Props {
  options: Option[];
  defaultValue: Option;
  onChange: (option: Option) => void;
  id: string;
}

export default function Select({ options, defaultValue, onChange, id }: Props) {
  const [selection, setSelection] = useState(defaultValue);
  return (
    <Menu>
      <MenuButton
        as={Button}
        id={id}
        aria-haspopup="listbox"
        size={"sm"}
        rightIcon={<UpDownIcon />}
      >
        {selection.label}
      </MenuButton>
      <MenuList role="listbox">
        {options.map((option) => (
          <MenuItem
            aria-selected={selection.value === option.value}
            icon={selection.value === option.value ? <CheckIcon /> : undefined}
            role="option"
            onClick={(event) => {
              setSelection(option);
              onChange(option);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
