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
import {
  fetchDefaultFormValues,
  loaderFactory,
  timeUnitToNumberValue,
} from "../utils";
import { TimeUnits, TimeUnitsEnum } from "../types";
import {
  useDidMountEffect,
  useSelectedElementChangeRedirect,
} from "../hooks/utils";
import { CopyScriptToClipboard } from "../components/CopyScriptToClipboard";
import { InsertScript } from "../components/InsertScript";

export const loader = loaderFactory(CookieConsentCompatibleElement);

type loaderData = Awaited<ReturnType<typeof loader>>;

function CookieConsentForm() {
  const { setIsPageLoading } = useIsPageLoading();

  const { element: cookieConsentElement } = useLoaderData() as loaderData as {
    element: CookieConsentCompatibleElement;
  };
  const visibility = useElementVisibility(cookieConsentElement, CookieConsent);
  const removal = useElementRemoval(cookieConsentElement, CookieConsent);

  useSelectedElementChangeRedirect(cookieConsentElement);

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isLoading, errors },
  } = useForm<CookieConsentOptions>({
    defaultValues: fetchDefaultFormValues<CookieConsentOptions>(
      cookieConsentElement,
      CookieConsent,
      CookieConsentOptions,
    ),
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
                  min={0}
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
                  min={0}
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
                    <Tooltip hasArrow label="You can use a custom cookie name">
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
                  min={0}
                  helpText="Time period before cookie set expires"
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
                  <InsertScript
                    alreadyInserted={getValues().scriptInserted}
                    ElementType={CookieConsent}
                  />
                </GridItem>
                <GridItem w="100%" colSpan={2}>
                  <CopyScriptToClipboard ElementType={CookieConsent} />
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
