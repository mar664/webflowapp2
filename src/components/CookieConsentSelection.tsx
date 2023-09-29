import { generatePath, useNavigate } from "react-router-dom";
import ComponentSelection from "./ComponentSelection";
import { CookieConsent } from "../models/CookieConsent";
import { Paths } from "../paths";
import { faCookie } from "@fortawesome/free-solid-svg-icons";

interface Props {
  index: number;
  disabled: boolean;
  editable: boolean;
}

function CookieConsentSelection({ index, disabled, editable }: Props) {
  return (
    <ComponentSelection
      elementType={CookieConsent.NAME}
      newPath={Paths.newCookieConsentForm}
      existingPath={Paths.cookieConsentForm}
      index={index}
      icon={faCookie}
      disabled={disabled}
      editable={editable}
    />
  );
}

export default CookieConsentSelection;
