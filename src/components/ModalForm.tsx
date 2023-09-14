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
  Heading,
  IconButton,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Tooltip,
} from "@chakra-ui/react";
import {
  EffectTypesEnum,
  Modal,
  ModalOptions,
  TriggerTypesEnum,
} from "../elements/Modal";
import NumberFormElement from "./form/NumberFormElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CopyToClipboard from "react-copy-to-clipboard";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm, get } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalTriggerSelection from "./form/ModalTriggerSelection";
import { CompatibleElement } from "../elements/CompatibleElement";

// loads data before switching route and sets current element
// as a modal and applies modal to it if it doesn't already exist
export async function loader() {
  const modalElement = await CompatibleElement.getSelected();
  if (modalElement && !Modal.isAlready(modalElement)) {
    await Modal.apply(modalElement);
  }
  return { modalElement };
}

type loaderData = Awaited<ReturnType<typeof loader>>;

function ModalForm() {
  const [insertScript, setInsertScript] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const setPrevElement = useSetPrevElementId();

  const params = useParams();

  const { modalElement } = useLoaderData() as loaderData;

  const isSelectingElement = useIsSelectingElement();

  useEffect(() => {
    console.log("loaded modal");
    const selectedElementCallback = (element: AnyElement | null) => {
      if (element) {
        // if another element is clicked redirect to root unless an element is being selected to choose an element value
        if (
          !isSelectingElement &&
          modalElement &&
          element.id !== modalElement.id
        ) {
          setPrevElement(null);
          navigate("/", { replace: true });
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

    if (modalElement && params && params.exists) {
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
    const selectedElement = await CompatibleElement.getSelected();
    if (selectedElement) {
      await Modal.update(selectedElement, data);
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

  return (
    <>
      <Heading as="h1" size={"md"}>
        Editing Modal
      </Heading>
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
        <FormControl margin={"2"}>
          <FormLabel htmlFor="open-modal-trigger" mb="0">
            <Tooltip
              label="Element or class to trigger the modal opening"
              fontSize="md"
            >
              Trigger to open the modal on click
            </Tooltip>
          </FormLabel>
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
        </FormControl>
        <Stack direction="column">
          <ModalTriggerSelection
            modalElement={modalElement}
            trigger={watch("openTriggerType")}
            defaultValue={getValues().openTriggerValue}
            setSelectedValue={(value: string) =>
              setValue("openTriggerValue", value)
            }
            id="open-trigger-value"
          />
          {watch("openTriggerType") === "Element" && (
            <a>{watch("openTriggerValue")}</a>
          )}
        </Stack>
        <FormControl margin={"2"}>
          <FormLabel htmlFor="display-effect" mb="0">
            <Tooltip
              label="The effect to use when displaying the modal"
              fontSize="md"
            >
              Display effect
            </Tooltip>
          </FormLabel>
          <Select
            id="display-effect"
            defaultValue={getValues().openEffectType}
            onChange={(val) =>
              setValue(
                "openEffectType",
                EffectTypesEnum.parse(val.target.value),
              )
            }
          >
            {EffectTypesEnum.options.map((value) => (
              <option value={value}>{value}</option>
            ))}
          </Select>
        </FormControl>
        <NumberFormElement
          error={errors.openDuration?.message}
          name="openDuration"
          label="Open Duration"
          initialValue={getValues().openDuration}
          onValueChange={(value) => setValue("openDuration", value)}
          helpText="Duration to show the modal"
          formatter={(val) => `${val} ms`}
          parser={(val) => parseInt(val.replace(" ms", ""))}
        />
        <FormControl margin={"2"}>
          <FormLabel htmlFor="close-modal-trigger" mb="0">
            <Tooltip
              label="Element or class to trigger the modal closing"
              fontSize="md"
            >
              Trigger to close the modal on click
            </Tooltip>
          </FormLabel>
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
        </FormControl>
        <Stack direction="column">
          <ModalTriggerSelection
            modalElement={modalElement}
            trigger={watch("closeTriggerType")}
            defaultValue={getValues().closeTriggerValue}
            setSelectedValue={(value: string) =>
              setValue("closeTriggerValue", value)
            }
            id="close-trigger-value"
          />
          {watch("closeTriggerType") === "Element" && (
            <a>{watch("closeTriggerValue")}</a>
          )}
        </Stack>
        <FormControl margin={"2"}>
          <FormLabel htmlFor="hide-effect" mb="0">
            <Tooltip
              label="The effect to use when hiding the modal"
              fontSize="md"
            >
              Hide effect
            </Tooltip>
          </FormLabel>
          <Select
            id="hide-effect"
            defaultValue={getValues().closeEffectType}
            onChange={(val) =>
              setValue(
                "closeEffectType",
                EffectTypesEnum.parse(val.target.value),
              )
            }
          >
            {EffectTypesEnum.options.map((value) => (
              <option value={value}>{value}</option>
            ))}
          </Select>
        </FormControl>
        <NumberFormElement
          error={errors.closeDuration?.message}
          name="closeDuration"
          label="Close Duration"
          initialValue={getValues().closeDuration}
          onValueChange={(value) => setValue("closeDuration", value)}
          formatter={(val) => `${val} ms`}
          parser={(val) => parseInt(val.replace(" ms", ""))}
          helpText="Duration to hide the modal"
        />
        <FormControl
          display="flex"
          alignItems="center"
          margin={"2"}
          maxWidth={"full"}
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
            defaultChecked={getValues().closeOnClickUnderlay}
            onChange={(e) => setValue("closeOnClickUnderlay", e.target.checked)}
          />
        </FormControl>
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
              icon={<FontAwesomeIcon icon={copied ? faCheck : faCopy} />}
            />
          </CopyToClipboard>
        </FormControl>
        <ButtonGroup variant="outline" spacing="6" padding={2}>
          <Button
            onClick={(event) => {
              setPrevElement(null);
              navigate("/", { replace: true });
            }}
          >
            Back
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
}

export default ModalForm;
