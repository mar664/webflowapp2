import React, { SyntheticEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler, get } from "react-hook-form";
import {
  LoaderFunctionArgs,
  ParamParseKey,
  Params,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useSetPrevElementId } from "../contexts/AppContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { CompatibleElement } from "../elements/CompatibleElement";
import { useElementRemoval } from "../hooks/element";
import Header from "../components/Header";
import NumberFormElement from "../components/form/NumberFormElement";
import {
  NumberIncrementer,
  NumberIncrementerOptions,
} from "../models/NumberIncrementer";
import { Tooltip } from "../components/Tooltip";
import { NumberIncrementerCompatibleElement } from "../elements/NumberIncrementerCompatibleElement";
import { Paths } from "../paths";

interface LoaderArgs extends LoaderFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.numberIncrementerForm>>;
}

// loads data before switching route and sets current element
// as a modal and applies modal to it if it doesn't already exist
export async function loader({ params: { elementId } }: LoaderArgs) {
  const numberIncrementerElement = (await webflow.getAllElements()).find(
    (e) => e.id === elementId,
  );
  if (!numberIncrementerElement) {
    throw new Error("Number incrementer element not found");
  }
  const compatibleNumberIncrementerElement =
    NumberIncrementerCompatibleElement.fromElement(numberIncrementerElement);
  if (compatibleNumberIncrementerElement !== null) {
    return { numberIncrementerElement: compatibleNumberIncrementerElement };
  }
  throw new Error("Compatible number incrementer element element not found");
}

type loaderData = Awaited<ReturnType<typeof loader>>;

function NumberIncrementerForm() {
  const [insertScript, setInsertScript] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const setPrevElement = useSetPrevElementId();

  const params = useParams();

  const { numberIncrementerElement } = useLoaderData() as loaderData;
  const removal = useElementRemoval(
    numberIncrementerElement,
    NumberIncrementer,
  );

  useEffect(() => {
    let firstRunElement: string | null = null;
    console.log("loaded incrementer");
    const selectedElementCallback = (element: AnyElement | null) => {
      if (element) {
        // since webflow doesn't allow selecting element the element in the first run
        // may not be that of the number incrementer element
        if (firstRunElement === null) {
          firstRunElement = element.id;
          return;
        }
        // if another element is clicked redirect to root
        if (
          numberIncrementerElement &&
          element.id !== numberIncrementerElement.id &&
          element.id !== firstRunElement
        ) {
          setPrevElement(null);
          navigate(Paths.root, { replace: true });
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

    if (numberIncrementerElement && params && params.exists) {
      const parsedElement = NumberIncrementer.parse(numberIncrementerElement);
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
    await NumberIncrementer.update(numberIncrementerElement, data);
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
      <Header heading="Incrementer Settings" removeAction={removal} />
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
        <Grid
          templateColumns="44px, 1fr, 44px, 1fr"
          gap={"8px"}
          padding={"8px"}
        >
          <NumberFormElement
            error={errors.incrementStart?.message}
            name="incrementStart"
            label="Initial"
            initialValue={getValues().incrementStart}
            onValueChange={(value) => setValue("incrementStart", value)}
            helpText="Initial value of number incrementer"
          />
          <NumberFormElement
            error={errors.incrementEnd?.message}
            name="incrementEnd"
            label="Final"
            initialValue={getValues().incrementEnd}
            onValueChange={(value) => setValue("incrementEnd", value)}
            helpText="Final value of number incrementer"
          />
          <NumberFormElement
            error={errors.duration?.message}
            name="duration"
            label="Duration"
            initialValue={getValues().duration}
            onValueChange={(value) => setValue("duration", value)}
            formatter={(val) => `${val} ms`}
            parser={(val) => parseInt(val.replace(" ms", ""))}
            helpText="Duration in milliseconds"
            min={0}
          />
          <NumberFormElement
            error={errors.percentageVisible?.message}
            name="percentageVisible"
            label="Trigger"
            initialValue={getValues().percentageVisible}
            onValueChange={(value) => setValue("percentageVisible", value)}
            formatter={(val) => `${val} %`}
            parser={(val) => parseInt(val.replace(" %", ""))}
            helpText="Increment will start when this % of element is visible in viewport"
            min={0}
            max={100}
          />
          <GridItem w="100%" colSpan={4}>
            <FormControl display="flex" alignItems="center" maxWidth={"full"}>
              <FormLabel
                htmlFor="insert-script"
                mb="0"
                fontSize={"label.fontSize"}
              >
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
                backgroundColor={"switch.background"}
              />
            </FormControl>
          </GridItem>
          <GridItem w="100%" colSpan={4}>
            <FormControl display="flex" alignItems="center" maxWidth={"full"}>
              <FormLabel
                htmlFor="copy-script"
                mb="0"
                fontSize={"label.fontSize"}
              >
                <Tooltip
                  label="Copy the javascript embed code to clipboard so it can be added to webflow"
                  fontSize="md"
                >
                  Copy script to clipboard
                </Tooltip>
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
                  aria-label="Copy to clipboard"
                  fontSize={"copyToClipboard.fontSize"}
                  backgroundColor={"button.background"}
                  borderWidth={"button.borderWidth"}
                  borderColor={"button.borderColor"}
                  borderRadius={"button.borderRadius"}
                  color={"button.color"}
                  _hover={{
                    backgroundColor: "button._hover.background",
                  }}
                  size={"sm"}
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

export default NumberIncrementerForm;
