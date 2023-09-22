import { useNavigate } from "react-router-dom";
import { CompatibleElement } from "../elements/CompatibleElement";
import { useElementRemoval, useElementVisibility } from "../hooks/element";
import ComponentSelection from "./ComponentSelection";
import { RemoveHandler } from "../types";
import { CookieConsent } from "../models/CookieConsent";

interface Props {
  isAlready: boolean;
  currentElement: CompatibleElement;
}

function CookieConsentSelection({ isAlready, currentElement }: Props) {
  const navigate = useNavigate();

  const visibility = useElementVisibility(currentElement, CookieConsent);
  const removal = useElementRemoval(currentElement, CookieConsent);

  return (
    <ComponentSelection
      elementType={CookieConsent.NAME}
      isAlready={isAlready}
      visibility={visibility}
      removeHandler={removal?.remove as RemoveHandler}
      newHandler={() => navigate(`/new_cookie_consent_form`, { replace: true })}
      existingHandler={() =>
        navigate(`/cookie_consent_form`, { replace: true })
      }
    />
  );
}

export default CookieConsentSelection;
