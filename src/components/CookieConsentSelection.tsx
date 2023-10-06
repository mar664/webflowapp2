import ComponentSelection from "./ComponentSelection";
import { CookieConsent } from "../models/CookieConsent";
import { Paths } from "../paths";
import { HelpModal } from "./HelpModal";
import { LiaCookieSolid } from "react-icons/lia";

interface Props {
  index: number;
  disabled: boolean;
  editable: boolean;
}

function CookieConsentSelection({ index, disabled, editable }: Props) {
  return (
    <>
      <ComponentSelection
        elementType={CookieConsent.NAME}
        newPath={Paths.newCookieConsentForm}
        existingPath={Paths.cookieConsentForm}
        index={index}
        icon={LiaCookieSolid}
        disabled={disabled}
        editable={editable}
        showHelp={({ isOpen, onClose }) => (
          <HelpModal
            title={"Cookie Consent Help"}
            isOpen={isOpen}
            onClose={onClose}
          >
            Inserts an element to display a cookie consent dialog. The dialog
            display on page load to users who have not already provided a
            response. The response is stored as a browser cookie.
          </HelpModal>
        )}
      />
    </>
  );
}

export default CookieConsentSelection;
