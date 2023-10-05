import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useIsPageLoading } from "../contexts/AppContext";
import {
  Accordion,
  Tooltip,
  FormLabel,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import {
  CloseEffectTypesEnum,
  Modal,
  ModalOptions,
  OpenEffectTypesEnum,
  TriggerTypesEnum,
} from "../models/Modal";
import NumberFormElement from "../components/form/NumberFormElement";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalTriggerSelection from "../components/form/ModalTriggerSelection";
import { ModalCompatibleElement } from "../elements/ModalCompatibleElement";
import Header from "../components/Header";
import { useElementRemoval, useElementVisibility } from "../hooks/element";
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
import { useSelectedElementChangeRedirect } from "../hooks/utils";
import { CopyScriptToClipboard } from "../components/CopyScriptToClipboard";
import { InsertScript } from "../components/InsertScript";
import { HelpModal } from "../components/HelpModal";

export const loader = loaderFactory(ModalCompatibleElement);

type loaderData = Awaited<ReturnType<typeof loader>>;

function ModalForm() {
  const { setIsPageLoading } = useIsPageLoading();

  const { element: modalElement } = useLoaderData() as loaderData as {
    element: ModalCompatibleElement;
  };

  const visibility = useElementVisibility(modalElement, Modal);
  const removal = useElementRemoval(modalElement, Modal);

  useSelectedElementChangeRedirect(modalElement);

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isLoading, errors },
  } = useForm<ModalOptions>({
    defaultValues: fetchDefaultFormValues<ModalOptions>(
      modalElement,
      Modal,
      ModalOptions,
    ),
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

  useEffect(() => {
    setIsPageLoading(isLoading);
  }, [isLoading]);

  if (isLoading) return null;

  if (modalElement === null) {
    console.error("Modal element not found");
    return null;
  }
  return (
    <>
      <Header
        heading="Editing Modal"
        visibilityActions={visibility}
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
            <AccordionHeading
              headingText="Opening Modal"
              showHelp={({ isOpen, onClose }) => (
                <HelpModal
                  title={"Opening Modal Help"}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  Information about how to set settings for opening the modal
                </HelpModal>
              )}
            />
            <AccordionPanel>
              <Grid
                templateColumns="60px 1fr 60px 1fr"
                gap={"8px"}
                padding={"8px"}
              >
                <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
                  <FormLabel htmlFor="open-modal-trigger" mb="0">
                    <Tooltip
                      hasArrow
                      label="Element or class to trigger the modal opening"
                    >
                      Trigger
                    </Tooltip>
                  </FormLabel>
                </GridItem>
                <GridItem colSpan={3} display="flex" alignItems="center">
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
                        <Radio key={value} value={value} fontSize={"12px"}>
                          {value}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </GridItem>
                <GridItem
                  w="100%"
                  colSpan={4}
                  display="flex"
                  alignItems="center"
                >
                  <Stack direction="row" alignItems={"center"} width={"100%"}>
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
                      TriggerTypesEnum.Enum.Element &&
                      watch("openTriggerValue") !== undefined && (
                        <Tag>
                          <TagLabel>#{watch("openTriggerValue")}</TagLabel>
                          <TagCloseButton
                            onClick={() =>
                              setValue("openTriggerValue", undefined)
                            }
                          />
                        </Tag>
                      )}
                  </Stack>
                </GridItem>
                <Combobox
                  id="open-effect"
                  label="Effect"
                  helpText="The effect to use when displaying the modal"
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
                <NumberFormElement
                  error={errors.openDuration?.message}
                  name="openDuration"
                  label="Duration"
                  initialValue={getValues().openDuration}
                  onValueChange={(value) =>
                    setValue("openDuration", TimeUnits.parse(value))
                  }
                  helpText="Duration to show the modal"
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
            <AccordionHeading headingText="Closing Modal" />
            <AccordionPanel>
              <Grid
                gap={"8px"}
                padding={"8px"}
                templateColumns="60px 1fr 60px 1fr"
              >
                <GridItem display="flex" alignItems="center">
                  <FormLabel htmlFor="close-modal-trigger" mb="0">
                    <Tooltip
                      hasArrow
                      label="Element or class to trigger the modal closing"
                    >
                      Trigger
                    </Tooltip>
                  </FormLabel>
                </GridItem>
                <GridItem colSpan={3} display="flex" alignItems="center">
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
                <GridItem
                  w="100%"
                  colSpan={4}
                  display="flex"
                  alignItems="center"
                >
                  <Stack direction="row" width={"100%"} alignItems="center">
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
                      TriggerTypesEnum.Enum.Element &&
                      watch("closeTriggerValue") !== undefined && (
                        <Tag>
                          <TagLabel>#{watch("closeTriggerValue")}</TagLabel>
                          <TagCloseButton
                            onClick={() =>
                              setValue("closeTriggerValue", undefined)
                            }
                          />
                        </Tag>
                      )}
                  </Stack>
                </GridItem>

                <Combobox
                  id="close-effect"
                  label="Effect"
                  helpText="The effect to use when hiding the modal"
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
                <NumberFormElement
                  error={errors.closeDuration?.message}
                  name="closeDuration"
                  label="Duration"
                  initialValue={getValues().closeDuration}
                  onValueChange={(value) =>
                    setValue("closeDuration", TimeUnits.parse(value))
                  }
                  helpText="Duration to hide the modal"
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
                <GridItem
                  w="100%"
                  colSpan={4}
                  display="flex"
                  alignItems="center"
                >
                  <FormLabel htmlFor="close-on-click-overlay" mb="0">
                    <Tooltip
                      hasArrow
                      label="Toggles whether to close the modal when overlay is clicked"
                    >
                      Close modal on click overlay
                    </Tooltip>
                  </FormLabel>
                  <Switch
                    id="close-on-click-overlay"
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
                  <InsertScript
                    alreadyInserted={getValues().scriptInserted}
                    ElementType={Modal}
                  />
                </GridItem>
                <GridItem w="100%" colSpan={2}>
                  <CopyScriptToClipboard ElementType={Modal} />
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
