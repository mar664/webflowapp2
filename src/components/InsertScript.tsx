import { ElementModel } from "../models/ElementModel";
import { useState } from "react";
import { Switch, FormControl, Tooltip, FormLabel } from "@chakra-ui/react";

interface Props {
  alreadyInserted: boolean;
  ElementType: typeof ElementModel;
}

export const InsertScript = ({ alreadyInserted, ElementType }: Props) => {
  const [insertScript, setInsertScript] = useState(alreadyInserted);

  const insertingScript = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInsertScript(event.target.checked);

    if (event.target.checked) {
      console.log("inserting script");
      await ElementType.insertScriptInBody(ElementType);
    } else {
      console.log("removing script");
      await ElementType.removeScriptFromBody(ElementType);
    }
  };

  return (
    <FormControl display="flex" alignItems="center" maxWidth={"full"}>
      <FormLabel htmlFor="insert-script" mb="0">
        <Tooltip
          hasArrow
          label="Toggles whether to embed the javascript code on the page"
        >
          Insert script in body?
        </Tooltip>
      </FormLabel>
      <Switch
        id="insert-script"
        onChange={insertingScript}
        isChecked={insertScript}
      />
    </FormControl>
  );
};
