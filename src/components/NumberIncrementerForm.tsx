import React, { SyntheticEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  NumberIncrementer,
  NumberIncrementerOptions,
} from "../elements/NumberIncrementer";
import { useSetPrevElementId } from "../contexts/AppContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import NumberFormElement from "./form/NumberFormElement";
import { Switch } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import PercentageSliderThumbWithTooltip from "./form/PercentageSliderThumbWithTooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// loads data before switching route and sets current element as a number incrementer if not already
export async function loader() {
  const selectedElement = await webflow.getSelectedElement();
  if (selectedElement && !NumberIncrementer.isAlready(selectedElement)) {
    await NumberIncrementer.apply(selectedElement);
  }
  return { selectedElement };
}

type loaderData = Awaited<ReturnType<typeof loader>>;

function NumberIncrementerForm() {
  const toast = useToast();
  const [insertScript, setInsertScript] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const setPrevElement = useSetPrevElementId();

  const params = useParams();
  console.log(params);
  const { selectedElement } = useLoaderData() as loaderData;
  console.log(selectedElement);

  useEffect(() => {
    console.log("loaded incrementer");
    const selectedElementCallback = (element: AnyElement | null) => {
      if (element) {
        // if another element is clicked redirect to root
        if (selectedElement && element.id !== selectedElement.id) {
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
  }, []);

  const fetchDefaultValues = async () => {
    const allElements = await webflow.getAllElements();
    const scriptExisting = allElements.filter(
      (t) =>
        t.type === "DOM" &&
        t.getTag() === "script" &&
        t.getAttribute("src") === NumberIncrementer.SOURCE_URL,
    );

    setInsertScript(scriptExisting.length !== 0);

    if (selectedElement && params && params.exists) {
      const parsedElement = NumberIncrementer.parse(selectedElement);
      if (!parsedElement) {
        throw new Error("Error parsing number incrementer attributes");
      }
      return parsedElement;
    }
    return {
      incrementStart: NumberIncrementer.DEFAULT_INCREMENT_START,
      incrementEnd: NumberIncrementer.DEFAULT_INCREMENT_END,
      percentageVisible: NumberIncrementer.DEFAULT_PERCENTAGE_VISIBLE,
      duration: NumberIncrementer.DEFAULT_INCREMENT_DURATION,
    };
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isLoading, errors },
  } = useForm<NumberIncrementerOptions>({
    defaultValues: fetchDefaultValues,
    resolver: zodResolver(NumberIncrementerOptions),
  });
  const onSubmit: SubmitHandler<NumberIncrementerOptions> = async (data) => {
    console.log("Submitting");
    const selectedElement = await webflow.getSelectedElement();
    if (selectedElement) {
      await NumberIncrementer.update(selectedElement, data);
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
      await NumberIncrementer.insertScriptInBody();
    } else {
      await NumberIncrementer.removeScriptFromBody();
    }
  };

  if (isLoading) return null;

  return (
    <>
      <Heading as="h1" size={"md"}>
        Editing Number Incrementer
      </Heading>
      <form>
        <NumberFormElement
          error={errors.incrementStart?.message}
          name="incrementStart"
          label="Increment Start"
          initialValue={getValues().incrementStart}
          onValueChange={(value) => setValue("incrementStart", value)}
        />
        <NumberFormElement
          error={errors.incrementEnd?.message}
          name="incrementEnd"
          label="Increment End"
          initialValue={getValues().incrementEnd}
          onValueChange={(value) => setValue("incrementEnd", value)}
        />
        <NumberFormElement
          error={errors.duration?.message}
          name="duration"
          label="Duration"
          initialValue={getValues().duration}
          onValueChange={(value) => setValue("duration", value)}
        />
        <FormControl padding={"2"}>
          <FormLabel htmlFor="percentageVisible" mb="0">
            % Visible to Start Increment
          </FormLabel>
          <PercentageSliderThumbWithTooltip
            onValueChange={(v: number) => setValue("percentageVisible", v)}
            defaultValue={getValues().percentageVisible}
          />
        </FormControl>
        <FormControl
          display="flex"
          alignItems="center"
          margin={"2"}
          maxWidth={"full"}
        >
          <FormLabel htmlFor="insert-script" mb="0">
            Insert script in body?
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
            Copy script to clipboard
          </FormLabel>
          <CopyToClipboard
            text={`<script src="${NumberIncrementer.SOURCE_URL}"></script>`}
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

export default NumberIncrementerForm;
