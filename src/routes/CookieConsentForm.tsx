import React, { useEffect, useState } from "react";
import {
  LoaderFunctionArgs,
  ParamParseKey,
  Params,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useIsPageLoading,
  useIsSelectingElement,
  useSelectedElement,
  useSetPrevElementId,
} from "../contexts/AppContext";
import {
  Accordion,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Tooltip,
  Switch,
} from "@chakra-ui/react";
import NumberFormElement from "../components/form/NumberFormElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CopyToClipboard from "react-copy-to-clipboard";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faCircleExclamation,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm, get } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CookieConsentCompatibleElement } from "../elements/CookieConsentCompatibleElement";
import Header from "../components/Header";
import { useElementRemoval, useElementVisibility } from "../hooks/element";
import {
  CloseEffectTypesEnum,
  CookieConsent,
  CookieConsentOptions,
  OpenEffectTypesEnum,
  PositionEnum,
} from "../models/CookieConsent";
import { Paths } from "../paths";
import AccordionItem from "../components/accordion/AccordionItem";
import AccordionHeading from "../components/accordion/AccordionHeading";
import AccordionPanel from "../components/accordion/AccordionPanel";
import Combobox from "../components/dropdown/Combobox";
import { TIME_UNITS_OPTIONS } from "../constants";
import { loaderFactory, timeUnitToNumberValue } from "../utils";
import { TimeUnits, TimeUnitsEnum } from "../types";
import { useDidMountEffect } from "../hooks/utils";

export const loader = loaderFactory(CookieConsentCompatibleElement);

type loaderData = Awaited<ReturnType<typeof loader>>;

function CookieConsentForm() {
  const navigate = useNavigate();
  const { setIsPageLoading } = useIsPageLoading();

  const [insertScript, setInsertScript] = useState(false);
  const [copied, setCopied] = useState(false);

  const { element: cookieConsentElement } = useLoaderData() as loaderData as {
    element: CookieConsentCompatibleElement;
  };
  const visibility = useElementVisibility(cookieConsentElement, CookieConsent);
  const removal = useElementRemoval(cookieConsentElement, CookieConsent);

  const isSelectingElement = useIsSelectingElement();

  const { selectedElement } = useSelectedElement();

  useDidMountEffect(() => {
    // if another element is clicked redirect to root unless an element is being selected to choose an element value
    if (
      !isSelectingElement &&
      cookieConsentElement &&
      selectedElement &&
      selectedElement.id !== cookieConsentElement.id
    ) {
      navigate(Paths.app, { replace: true });
    }
  }, [isSelectingElement, selectedElement]);

  const fetchDefaultValues = async () => {
    const allElements = await webflow.getAllElements();
    const scriptExisting = allElements.filter(
      (t) =>
        t.type === "DOM" &&
        t.getTag() === "script" &&
        t.getAttribute("src") === CookieConsent.SOURCE_URL,
    );

    setInsertScript(scriptExisting.length !== 0);

    if (cookieConsentElement) {
      const parsedElement = CookieConsent.parse(cookieConsentElement);
      if (!parsedElement) {
        throw new Error("Error parsing cookie consent attributes");
      }
      return parsedElement;
    }

    return CookieConsentOptions.parse({});
  };

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isLoading, errors },
  } = useForm<CookieConsentOptions>({
    defaultValues: fetchDefaultValues,
    resolver: zodResolver(CookieConsentOptions),
  });

  const onSubmit: SubmitHandler<CookieConsentOptions> = async (data) => {
    console.log("Submitting", data);
    if (cookieConsentElement) {
      await CookieConsent.update(cookieConsentElement, data);
    }
  };

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  useEffect(() => {
    setIsPageLoading(isLoading);
  }, [isLoading]);

  const insertingScript = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInsertScript(event.target.checked);

    if (event.target.checked) {
      await CookieConsent.insertScriptInBody();
    } else {
      await CookieConsent.removeScriptFromBody();
    }
  };

  if (isLoading) return null;

  if (cookieConsentElement === null) {
    console.error("Cookie consent element not found");
    return null;
  }
  return (
    <>
      <Header
        heading="Editing Cookie consent"
        visibilityActions={visibility}
        removeAction={removal}
      />
      {/*
        <Box textColor={"red"}>
          <ul>
            {Object.keys(errors).map((k) => {
              if (k in errors) {
                return (
                  <li key={k}>
                    <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                    {get(errors, k)?.message}
                  </li>
                );
              }
            })}
          </ul>
        </Box>
        */}

      <form>
        <Accordion defaultIndex={[0, 1, 2, 3, 4]} allowMultiple>
          <AccordionItem>
            <AccordionHeading headingText="Positioning" />
            <AccordionPanel>
              <Grid
                templateColumns="60px 1fr 60px 1fr"
                gap={"8px"}
                padding={"8px"}
              >
                <Combobox
                  id="position"
                  label="Position"
                  helpText="The position to display the cookie consent on the screen"
                  defaultValue={{
                    label: getValues().position,
                    value: getValues().position,
                  }}
                  onChange={(val) =>
                    setValue("position", PositionEnum.parse(val.value))
                  }
                  options={PositionEnum.options.map((value) => ({
                    label: value,
                    value,
                  }))}
                />
              </Grid>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeading headingText="Opening Consent Dialog" />
            <AccordionPanel>
              <Grid
                templateColumns="60px 1fr 60px 1fr"
                gap={"8px"}
                padding={"8px"}
              >
                <Combobox
                  id="open-effect"
                  label="Effect"
                  helpText="The effect to use when displaying the cookie consent"
                  defaultValue={{
                    label: getValues().openEffectType,
                    value: getValues().openEffectType,
                  }}
                  onChange={(val) =>
                    setValue(
                      "openEffectType",
                      OpenEffectTypesEnum.parse(val.value),
                    )
                  }
                  options={OpenEffectTypesEnum.options.map((value) => ({
                    label: value,
                    value,
                  }))}
                />
                <NumberFormElement
                  error={errors.openDuration?.message}
                  name="openDuration"
                  label="Duration"
                  initialValue={getValues().openDuration}
                  onValueChange={(value) =>
                    setValue("openDuration", TimeUnits.parse(value))
                  }
                  helpText="Duration to show the cookie consent"
                  disabled={
                    watch("openEffectType") === OpenEffectTypesEnum.enum.None
                  }
                  units={{
                    options: TIME_UNITS_OPTIONS.filter((o) =>
                      [
                        TimeUnitsEnum.enum.Milliseconds,
                        TimeUnitsEnum.enum.Seconds,
                      ].includes(o.value),
                    ),
                    conversionFunc: timeUnitToNumberValue,
                  }}
                />
              </Grid>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeading headingText="Closing Consent Dialog" />
            <AccordionPanel>
              <Grid
                templateColumns="60px 1fr 60px 1fr"
                gap={"8px"}
                padding={"8px"}
              >
                <Combobox
                  id="close-effect"
                  label="Effect"
                  helpText="The effect to use when hiding the cookie consent"
                  defaultValue={{
                    label: getValues().closeEffectType,
                    value: getValues().closeEffectType,
                  }}
                  onChange={(val) =>
                    setValue(
                      "closeEffectType",
                      CloseEffectTypesEnum.parse(val.value),
                    )
                  }
                  options={CloseEffectTypesEnum.options.map((value) => ({
                    label: value,
                    value,
                  }))}
                />
                <NumberFormElement
                  error={errors.closeDuration?.message}
                  name="closeDuration"
                  label="Duration"
                  initialValue={getValues().closeDuration}
                  onValueChange={(value) =>
                    setValue("closeDuration", TimeUnits.parse(value))
                  }
                  helpText="Duration to hide the cookie consent"
                  disabled={
                    watch("closeEffectType") === OpenEffectTypesEnum.enum.None
                  }
                  units={{
                    options: TIME_UNITS_OPTIONS.filter((o) =>
                      [
                        TimeUnitsEnum.enum.Milliseconds,
                        TimeUnitsEnum.enum.Seconds,
                      ].includes(o.value),
                    ),
                    conversionFunc: timeUnitToNumberValue,
                  }}
                />
              </Grid>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeading headingText="Cookies" />
            <AccordionPanel>
              <Grid
                templateColumns="60px 1fr 60px 1fr"
                gap={"8px"}
                padding={"8px"}
              >
                <GridItem>
                  <FormLabel htmlFor="cookie-name">
                    <Tooltip label="You can use a custom cookie name">
                      Name
                    </Tooltip>
                  </FormLabel>
                </GridItem>
                <GridItem colSpan={3}>
                  <Input
                    id="cookie-name"
                    onChange={(e) => setValue("cookieName", e.target.value)}
                    placeholder={getValues().cookieName}
                    size="sm"
                  />
                </GridItem>

                <NumberFormElement
                  error={errors.cookieExpiry?.message}
                  name="cookieExpiry"
                  label="Expiry"
                  initialValue={getValues().cookieExpiry}
                  onValueChange={(value) =>
                    setValue("cookieExpiry", TimeUnits.parse(value))
                  }
                  helpText="Days to set the cookie to expire after"
                  units={{
                    options: TIME_UNITS_OPTIONS.filter((o) =>
                      [
                        TimeUnitsEnum.enum.Minutes,
                        TimeUnitsEnum.enum.Hours,
                        TimeUnitsEnum.enum.Days,
                        TimeUnitsEnum.enum.Months,
                        TimeUnitsEnum.enum.Years,
                      ].includes(o.value),
                    ),
                    conversionFunc: timeUnitToNumberValue,
                  }}
                />
              </Grid>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeading headingText="Scripts" />
            <AccordionPanel>
              <Grid gap={"8px"} padding={"8px"}>
                <GridItem w="100%" colSpan={2}>
                  <FormControl
                    display="flex"
                    alignItems="center"
                    maxWidth={"full"}
                  >
                    <FormLabel htmlFor="insert-script">
                      <Tooltip label="Toggles whether to embed the javascript code on the page">
                        Insert script in body?
                      </Tooltip>
                    </FormLabel>
                    <Switch
                      id="insert-script"
                      onChange={insertingScript}
                      isChecked={insertScript}
                    />
                  </FormControl>
                </GridItem>
                <GridItem w="100%" colSpan={2}>
                  <FormControl
                    display="flex"
                    alignItems="center"
                    maxWidth={"full"}
                  >
                    <FormLabel htmlFor="copy-script">
                      <Tooltip label="Copy the javascript embed code to clipboard so it can be added to webflow">
                        Copy script to clipboard
                      </Tooltip>
                    </FormLabel>
                    <CopyToClipboard
                      text={`<script src="${CookieConsent.SOURCE_URL}"></script>`}
                      onCopy={() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 5000);
                      }}
                    >
                      <IconButton
                        id="copy-script"
                        colorScheme="green"
                        aria-label="Copy to clipboard"
                        fontSize="20px"
                        icon={
                          <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                        }
                      />
                    </CopyToClipboard>
                  </FormControl>
                </GridItem>
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </form>
    </>
  );
}

export default CookieConsentForm;
