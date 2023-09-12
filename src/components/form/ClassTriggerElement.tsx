import {
  FormControl,
  FormLabel,
  Select,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function ClassTriggerElement() {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [styles, setStyles] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      setStyles((await webflow.getAllStyles()).map((v) => v.getName()).sort());
      setIsLoadingData(false);
    })();
  }, []);

  if (isLoadingData) return <Spinner />;
  return (
    <FormControl margin={"2"}>
      <FormLabel htmlFor="trigger-class" mb="0">
        <Tooltip
          label="The effect to use when displaying the modal"
          fontSize="md"
        >
          Select class
        </Tooltip>
      </FormLabel>
      <Select placeholder="Select class" id="trigger-class">
        {styles.map((value) => (
          <option value={value}>{value}</option>
        ))}
      </Select>
    </FormControl>
  );
}

export default ClassTriggerElement;
