import CopyToClipboard from "react-copy-to-clipboard";
import { ElementModel } from "../models/ElementModel";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { IconButton, FormControl, Tooltip, FormLabel } from "@chakra-ui/react";

interface Props {
  ElementType: typeof ElementModel;
}

export const CopyScriptToClipboard = ({ ElementType }: Props) => {
  const [copied, setCopied] = useState(false);

  return (
    <FormControl display="flex" alignItems="center" maxWidth={"full"}>
      <FormLabel htmlFor="copy-script" mb="0">
        <Tooltip
          hasArrow
          label="Copy the javascript embed code to clipboard so it can be added to webflow"
        >
          Copy script to clipboard
        </Tooltip>
      </FormLabel>
      <CopyToClipboard
        text={`<script src="${ElementType.SOURCE_URL}"></script>`}
        onCopy={() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 5000);
        }}
      >
        <IconButton
          id="copy-script"
          aria-label="Copy to clipboard"
          size={"sm"}
          icon={<FontAwesomeIcon icon={copied ? faCheck : faCopy} />}
        />
      </CopyToClipboard>
    </FormControl>
  );
};
