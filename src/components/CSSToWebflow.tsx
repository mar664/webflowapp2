import { Paths } from "../paths";
import { HelpModal } from "./HelpModal";
import { TbBrandCss3 } from "react-icons/tb";
import UtilitySelection from "./UtilitySelection";

interface Props {
  index: number;
  disabled: boolean;
}

function CSSToWebflow({ index, disabled }: Props) {
  return (
    <UtilitySelection
      elementType={"CSS Import"}
      path={Paths.cssToWebflow}
      icon={TbBrandCss3}
      index={index}
      disabled={disabled}
      showHelp={({ isOpen, onClose }) => (
        <HelpModal title={"CSS Import Help"} isOpen={isOpen} onClose={onClose}>
          Allows import of html into webflow as DOM elements. Classes can be
          created if they do not already exist.
        </HelpModal>
      )}
    />
  );
}

export default CSSToWebflow;
