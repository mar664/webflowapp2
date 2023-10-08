import { Paths } from "../paths";
import { HelpModal } from "./HelpModal";
import { AiOutlineHtml5 } from "react-icons/ai";
import UtilitySelection from "./UtilitySelection";

interface Props {
  index: number;
  disabled: boolean;
}

function HTMLToWebflow({ index, disabled }: Props) {
  return (
    <UtilitySelection
      elementType={"HTML Import"}
      path={Paths.htmlToWebflow}
      icon={AiOutlineHtml5}
      index={index}
      disabled={disabled}
      showHelp={({ isOpen, onClose }) => (
        <HelpModal title={"HTML Import Help"} isOpen={isOpen} onClose={onClose}>
          Allows import of html into webflow as DOM elements. Classes can be
          created if they do not already exist.
        </HelpModal>
      )}
    />
  );
}

export default HTMLToWebflow;
