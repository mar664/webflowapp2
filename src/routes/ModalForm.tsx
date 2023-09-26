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
  useIsSelectingElement,
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
  Radio,
  RadioGroup,
  Stack,
  Switch,
} from "@chakra-ui/react";
import {
  CloseEffectTypesEnum,
  Modal,
  ModalOptions,
  OpenEffectTypesEnum,
  TriggerTypesEnum,
} from "../models/Modal";
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
import ModalTriggerSelection from "../components/form/ModalTriggerSelection";
import { ModalCompatibleElement } from "../elements/ModalCompatibleElement";
import Header from "../components/Header";
import { useElementRemoval, useElementVisibility } from "../hooks/element";
import { Tooltip } from "../components/Tooltip";
import { Paths } from "../paths";
import AccordionItem from "../components/accordion/AccordionItem";
import AccordionHeading from "../components/accordion/AccordionHeading";
import AccordionPanel from "../components/accordion/AccordionPanel";
import Select from "../components/dropdown/Select";

interface LoaderArgs extends LoaderFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.modalForm>>;
}

// loads data before switching route and sets current element
// as a modal and applies modal to it if it doesn't already exist
export async function loader({ params: { elementId } }: LoaderArgs) {
  const modalElement = (await webflow.getAllElements()).find(
    (e) => e.id === elementId,
  );
  if (!modalElement) {
    throw new Error("Modal element not found");
  }
  const compatibleModalElement =
    ModalCompatibleElement.fromElement(modalElement);
  if (compatibleModalElement !== null) {
    return { modalElement: compatibleModalElement };
  }
  throw new Error("Compatible modal element not found");
}

type loaderData = Awaited<ReturnType<typeof loader>>;

function ModalForm() {
  const setPrevElement = useSetPrevElementId();
  const navigate = useNavigate();

  const [insertScript, setInsertScript] = useState(false);
  const [copied, setCopied] = useState(false);

  const { modalElement } = useLoaderData() as loaderData;

  const visibility = useElementVisibility(modalElement, Modal);
  const removal = useElementRemoval(modalElement, Modal);

  const isSelectingElement = useIsSelectingElement();

  useEffect(() => {
    console.log("loaded modal");
    let firstRunElement: string | null = null;
    const selectedElementCallback = (element: AnyElement | null) => {
      // skip initial run after isSelecting changes
      if (element) {
        if (firstRunElement === null) {
          firstRunElement = element.id;
          return;
        }
        // if another element is clicked redirect to root unless an element is being selected to choose an element value
        if (
          !isSelectingElement &&
          modalElement &&
          element.id !== modalElement.id &&
          element.id !== firstRunElement
        ) {
          setPrevElement(null);

          navigate(Paths.app, { replace: true });
        }
      }
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
        t.getAttribute("src") === Modal.SOURCE_URL,
    );

    setInsertScript(scriptExisting.length !== 0);

    if (modalElement) {
      const parsedElement = Modal.parse(modalElement);
      if (!parsedElement) {
        throw new Error("Error parsing modal attributes");
      }
      return parsedElement;
    }

    return ModalOptions.parse({});
  };

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isLoading, errors },
  } = useForm<ModalOptions>({
    defaultValues: fetchDefaultValues,
    resolver: zodResolver(ModalOptions),
  });

  const onSubmit: SubmitHandler<ModalOptions> = async (data) => {
    console.log("Submitting", data);
    if (modalElement) {
      await Modal.update(modalElement, data);
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
      await Modal.insertScriptInBody();
    } else {
      await Modal.removeScriptFromBody();
    }
  };

  if (isLoading) return null;

  if (modalElement === null) {
    console.error("Modal element not found");
    return null;
  }
  return (
    <>
      <Header
        heading="Editing Modal"
        visibilityAction={visibility}
        removeAction={removal}
      />
      {/*
        <Box textColor={"red"}>
          <ul>
            {watch("openTriggerValue") === undefined ? (
              <li>
                <FontAwesomeIcon icon={faCircleExclamation} />
                {" Please select a valid open trigger"}
              </li>
            ) : null}
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
        <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
          <AccordionItem>
            <AccordionHeading headingText="Opening Modal" />
            <AccordionPanel>
              <Grid
                templateColumns="44px 1fr 44px 1fr"
                gap={"8px"}
                padding={"8px"}
              >
                <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
                  <FormLabel htmlFor="open-modal-trigger" mb="0">
                    <Tooltip
                      label="Element or class to trigger the modal opening"
                      fontSize="md"
                    >
                      Open trigger
                    </Tooltip>
                  </FormLabel>
                </GridItem>
                <GridItem colSpan={3}>
                  <RadioGroup
                    id="open-modal-trigger"
                    onChange={(v: TriggerTypesEnum) => {
                      setValue("openTriggerType", v);
                      setValue("openTriggerValue", undefined);
                    }}
                    value={getValues().openTriggerType}
                  >
                    <Stack direction="row">
                      {TriggerTypesEnum.options.map((value) => (
                        <Radio key={value} value={value}>
                          {value}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </GridItem>
                <GridItem w="100%" colSpan={4}>
                  <Stack direction="row" alignItems={"flex-start"}>
                    <ModalTriggerSelection
                      modalElement={modalElement}
                      trigger={watch("openTriggerType")}
                      defaultValue={getValues().openTriggerValue}
                      setSelectedValue={(value: string) =>
                        setValue("openTriggerValue", value)
                      }
                      id="open-trigger-value"
                      hideOnModalOpen={true}
                    />
                    {watch("openTriggerType") ===
                      TriggerTypesEnum.Enum.Element && (
                      <a>{watch("openTriggerValue")}</a>
                    )}
                  </Stack>
                </GridItem>
                <GridItem>
                  <FormLabel htmlFor="display-effect">
                    <Tooltip
                      label="The effect to use when displaying the modal"
                      fontSize="md"
                    >
                      Effect
                    </Tooltip>
                  </FormLabel>{" "}
                </GridItem>
                <GridItem colSpan={3}>
                  <Select
                    id="display-effect"
                    defaultValue={{
                      label: getValues().openEffectType,
                      value: getValues().openEffectType,
                    }}
                    options={OpenEffectTypesEnum.options.map((value) => ({
                      value,
                      label: value,
                    }))}
                    onChange={(val) =>
                      setValue(
                        "openEffectType",
                        OpenEffectTypesEnum.parse(val?.value),
                      )
                    }
                  />
                </GridItem>
                <NumberFormElement
                  error={errors.openDuration?.message}
                  name="openDuration"
                  label="Duration"
                  initialValue={getValues().openDuration}
                  onValueChange={(value) => setValue("openDuration", value)}
                  helpText="Duration to show the modal"
                  formatter={(val) => `${val} ms`}
                  parser={(val) => parseInt(val.replace(" ms", ""))}
                  disabled={
                    watch("openEffectType") === OpenEffectTypesEnum.enum.None
                  }
                />
              </Grid>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeading headingText="Scripts" />
            <AccordionPanel>
              <Grid gap={"8px"} padding={"8px"}>
                <GridItem>
                  <FormLabel htmlFor="close-modal-trigger" mb="0">
                    <Tooltip
                      label="Element or class to trigger the modal closing"
                      fontSize="md"
                    >
                      Secondary trigger
                    </Tooltip>
                  </FormLabel>
                </GridItem>
                <GridItem colSpan={3}>
                  <RadioGroup
                    id="close-modal-trigger"
                    onChange={(v: TriggerTypesEnum) => {
                      setValue("closeTriggerType", v);
                      setValue("closeTriggerValue", undefined);
                    }}
                    value={getValues().closeTriggerType}
                  >
                    <Stack direction="row">
                      {TriggerTypesEnum.options.map((value) => (
                        <Radio key={value} value={value}>
                          {value}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </GridItem>
                <GridItem w="100%" colSpan={4}>
                  <Stack direction="column">
                    <ModalTriggerSelection
                      modalElement={modalElement}
                      trigger={watch("closeTriggerType")}
                      defaultValue={getValues().closeTriggerValue}
                      setSelectedValue={(value: string) =>
                        setValue("closeTriggerValue", value)
                      }
                      id="close-trigger-value"
                      showOnModalOpen={true}
                    />
                    {watch("closeTriggerType") ===
                      TriggerTypesEnum.Enum.Element && (
                      <a>{watch("closeTriggerValue")}</a>
                    )}
                  </Stack>
                </GridItem>
                <GridItem>
                  <FormLabel htmlFor="hide-effect">
                    <Tooltip
                      label="The effect to use when hiding the modal"
                      fontSize="md"
                    >
                      Hide effect
                    </Tooltip>
                  </FormLabel>
                </GridItem>
                <GridItem colSpan={3}>
                  <Select
                    id="hide-effect"
                    defaultValue={{
                      value: getValues().closeEffectType,
                      label: getValues().closeEffectType,
                    }}
                    onChange={(val) =>
                      setValue(
                        "closeEffectType",
                        CloseEffectTypesEnum.parse(val.value),
                      )
                    }
                    options={CloseEffectTypesEnum.options.map((value) => ({
                      value,
                      label: value,
                    }))}
                  />
                </GridItem>
                <NumberFormElement
                  error={errors.closeDuration?.message}
                  name="closeDuration"
                  label="Close Duration"
                  initialValue={getValues().closeDuration}
                  onValueChange={(value) => setValue("closeDuration", value)}
                  formatter={(val) => `${val} ms`}
                  parser={(val) => parseInt(val.replace(" ms", ""))}
                  helpText="Duration to hide the modal"
                  disabled={
                    watch("closeEffectType") === OpenEffectTypesEnum.enum.None
                  }
                />
                <GridItem
                  w="100%"
                  colSpan={4}
                  display="flex"
                  alignItems="center"
                >
                  <FormLabel htmlFor="close-on-click-underlay" mb="0">
                    <Tooltip
                      label="Toggles whether to close the modal when underlay is clicked"
                      fontSize="md"
                    >
                      Closes modal on click underlay
                    </Tooltip>
                  </FormLabel>
                  <Switch
                    id="close-on-click-underlay"
                    defaultChecked={getValues().closeOnClickOverlay}
                    onChange={(e) =>
                      setValue("closeOnClickOverlay", e.target.checked)
                    }
                  />
                </GridItem>
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
                      text={`<script src="${Modal.SOURCE_URL}"></script>`}
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

export default ModalForm;
