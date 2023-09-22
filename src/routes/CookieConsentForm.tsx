import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  useIsSelectingElement,
  useSetPrevElementId,
} from "../contexts/AppContext";
import {
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
  Select,
  Stack,
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
import { Tooltip } from "../components/Tooltip";
import {
  CloseEffectTypesEnum,
  CookieConsent,
  CookieConsentOptions,
  OpenEffectTypesEnum,
  PositionEnum,
} from "../models/CookieConsent";

// loads data before switching route and sets current element
// as a modal and applies modal to it if it doesn't already exist
export async function loader() {
  const cookieConsentElement =
    await CookieConsentCompatibleElement.getSelected();
  console.log(cookieConsentElement);
  return { cookieConsentElement };
}

type loaderData = Awaited<ReturnType<typeof loader>>;

function CookieConsentForm() {
  const setPrevElement = useSetPrevElementId();
  const navigate = useNavigate();

  const [insertScript, setInsertScript] = useState(false);
  const [copied, setCopied] = useState(false);

  const { cookieConsentElement } = useLoaderData() as loaderData;
  const visibility = useElementVisibility(cookieConsentElement, CookieConsent);
  const removal = useElementRemoval(cookieConsentElement, CookieConsent);

  const isSelectingElement = useIsSelectingElement();

  useEffect(() => {
    console.log("loaded cookie consent");
    let initialRun = true;
    const selectedElementCallback = (element: AnyElement | null) => {
      // skip initial run after isSelecting changes
      if (element && !initialRun) {
        // if another element is clicked redirect to root unless an element is being selected to choose an element value
        if (
          !isSelectingElement &&
          cookieConsentElement &&
          element.id !== cookieConsentElement.id
        ) {
          navigate("/app", { replace: true });
        }
      }

      initialRun = false;
    };

    const unsubscribeSelectedElement = webflow.subscribe(
      "selectedelement",
      selectedElementCallback,
    );

    return () => {
      console.log("unloaded");
      unsubscribeSelectedElement();
    };
  }, [isSelectingElement]);

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
        visibilityAction={visibility}
        removeAction={removal}
      />
      {
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
      }

      <form>
        <Grid templateColumns="repeat(2, 1fr)" gap={1}>
          <GridItem w="100%" colSpan={2}>
            <FormControl margin={"2"}>
              <FormLabel htmlFor="position">
                <Tooltip
                  label="The position to display the cookie consent on the screen"
                  fontSize="md"
                >
                  Position
                </Tooltip>
              </FormLabel>
              <Select
                size="sm"
                id="position"
                defaultValue={getValues().position}
                onChange={(val) =>
                  setValue("position", PositionEnum.parse(val.target.value))
                }
              >
                {PositionEnum.options.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem w="100%">
            <FormControl margin={"2"}>
              <FormLabel htmlFor="display-effect">
                <Tooltip
                  label="The effect to use when displaying the cookie consent"
                  fontSize="md"
                >
                  Display effect
                </Tooltip>
              </FormLabel>
              <Select
                size="sm"
                id="display-effect"
                defaultValue={getValues().openEffectType}
                onChange={(val) =>
                  setValue(
                    "openEffectType",
                    OpenEffectTypesEnum.parse(val.target.value),
                  )
                }
              >
                {OpenEffectTypesEnum.options.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem w="100%">
            <NumberFormElement
              error={errors.openDuration?.message}
              name="openDuration"
              label="Open Duration"
              initialValue={getValues().openDuration}
              onValueChange={(value) => setValue("openDuration", value)}
              helpText="Duration to show the modal"
              formatter={(val) => `${val} ms`}
              parser={(val) => parseInt(val.replace(" ms", ""))}
              disabled={
                watch("openEffectType") === OpenEffectTypesEnum.enum.None
              }
            />
          </GridItem>
          <GridItem w="100%">
            <FormControl margin={"2"}>
              <FormLabel htmlFor="hide-effect">
                <Tooltip
                  label="The effect to use when hiding the cookie consent"
                  fontSize="md"
                >
                  Hide effect
                </Tooltip>
              </FormLabel>
              <Select
                size="sm"
                id="hide-effect"
                defaultValue={getValues().closeEffectType}
                onChange={(val) =>
                  setValue(
                    "closeEffectType",
                    CloseEffectTypesEnum.parse(val.target.value),
                  )
                }
              >
                {CloseEffectTypesEnum.options.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem w="100%">
            <NumberFormElement
              error={errors.closeDuration?.message}
              name="closeDuration"
              label="Close Duration"
              initialValue={getValues().closeDuration}
              onValueChange={(value) => setValue("closeDuration", value)}
              formatter={(val) => `${val} ms`}
              parser={(val) => parseInt(val.replace(" ms", ""))}
              helpText="Duration to hide the cookie consent"
              disabled={
                watch("closeEffectType") === OpenEffectTypesEnum.enum.None
              }
            />
          </GridItem>
          <GridItem w="100%" colSpan={2}>
            <FormControl margin={"2"}>
              <FormLabel htmlFor="cookie-name" mb="0">
                <Tooltip label="You can use a custom cookie name" fontSize="md">
                  Cookie Name
                </Tooltip>
              </FormLabel>
              <Input
                id="cookie-name"
                onChange={(e) => setValue("cookieName", e.target.value)}
                placeholder={getValues().cookieName}
              />
            </FormControl>
            <NumberFormElement
              error={errors.cookieExpiry?.message}
              name="cookieExpiry"
              label="Cookie Expiry"
              initialValue={getValues().cookieExpiry}
              onValueChange={(value) => setValue("cookieExpiry", value)}
              helpText="Days to set the cookie to expire after"
              formatter={(val) => `${val} days`}
              parser={(val) => parseInt(val.replace(" days", ""))}
            />
          </GridItem>
          <GridItem w="100%" colSpan={2}>
            <FormControl
              display="flex"
              alignItems="center"
              margin={"2"}
              maxWidth={"full"}
            >
              <FormLabel htmlFor="insert-script" mb="0">
                <Tooltip
                  label="Toggles whether to embed the javascript code on the page"
                  fontSize="md"
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
          </GridItem>
          <GridItem w="100%" colSpan={2}>
            <FormControl
              display="flex"
              alignItems="center"
              margin={"2"}
              maxWidth={"full"}
            >
              <FormLabel htmlFor="copy-script" mb="0">
                <Tooltip
                  label="Copy the javascript embed code to clipboard so it can be added to webflow"
                  fontSize="md"
                >
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
                  icon={<FontAwesomeIcon icon={copied ? faCheck : faCopy} />}
                />
              </CopyToClipboard>
            </FormControl>
          </GridItem>
        </Grid>
      </form>
    </>
  );
}

export default CookieConsentForm;
