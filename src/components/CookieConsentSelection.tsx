import { generatePath, useNavigate } from "react-router-dom";
import { CompatibleElement } from "../elements/CompatibleElement";
import { useElementRemoval, useElementVisibility } from "../hooks/element";
import ComponentSelection from "./ComponentSelection";
import { RemoveHandler } from "../types";
import { CookieConsent } from "../models/CookieConsent";
import { Paths } from "../paths";
import { faCookie } from "@fortawesome/free-solid-svg-icons";

interface Props {
  index: number;
  disabled: boolean;
}

function CookieConsentSelection({ index, disabled }: Props) {
  const navigate = useNavigate();

  return (
    <ComponentSelection
      elementType={CookieConsent.NAME}
      newHandler={() =>
        navigate(Paths.newCookieConsentForm, {
          replace: true,
        })
      }
      index={index}
      icon={faCookie}
      disabled={disabled}
    />
  );
}

export default CookieConsentSelection;
