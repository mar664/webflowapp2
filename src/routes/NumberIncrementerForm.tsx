import { useEffect, useState } from "react";
import { useForm, SubmitHandler, get } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import { useIsPageLoading } from "../contexts/AppContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Accordion, Box, Grid, GridItem } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useElementRemoval } from "../hooks/element";
import Header from "../components/Header";
import NumberFormElement from "../components/form/NumberFormElement";
import {
  NumberIncrementer,
  NumberIncrementerOptions,
} from "../models/NumberIncrementer";
import { NumberIncrementerCompatibleElement } from "../elements/NumberIncrementerCompatibleElement";
import AccordionHeading from "../components/accordion/AccordionHeading";
import AccordionItem from "../components/accordion/AccordionItem";
import AccordionPanel from "../components/accordion/AccordionPanel";
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

export const loader = loaderFactory(NumberIncrementerCompatibleElement);

type loaderData = Awaited<ReturnType<typeof loader>>;

function NumberIncrementerForm() {
  const { setIsPageLoading } = useIsPageLoading();

  const params = useParams();

  const { element: numberIncrementerElement } =
    useLoaderData() as loaderData as {
      element: NumberIncrementerCompatibleElement;
    };

  const removal = useElementRemoval(
    numberIncrementerElement,
    NumberIncrementer,
  );

  useSelectedElementChangeRedirect(numberIncrementerElement);

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isLoading, errors },
  } = useForm<NumberIncrementerOptions>({
    defaultValues: fetchDefaultFormValues<NumberIncrementerOptions>(
      numberIncrementerElement,
      NumberIncrementer,
      NumberIncrementerOptions,
    ),
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

  useEffect(() => {
    setIsPageLoading(isLoading);
  }, [isLoading]);

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
        <Accordion defaultIndex={[0, 1]} allowMultiple>
          <AccordionItem>
            <AccordionHeading headingText="Values" />
            <AccordionPanel>
              <Grid
                templateColumns="44px 1fr 44px 1fr"
                gap={"8px"}
                padding={"8px"}
              >
                <NumberFormElement
                  error={errors.incrementStart?.message}
                  name="incrementStart"
                  label="Initial"
                  initialValue={getValues().incrementStart}
                  onValueChange={(value) =>
                    setValue("incrementStart", value as number)
                  }
                  helpText="Initial value of number incrementer"
                />
                <NumberFormElement
                  error={errors.incrementEnd?.message}
                  name="incrementEnd"
                  label="Final"
                  initialValue={getValues().incrementEnd}
                  onValueChange={(value) =>
                    setValue("incrementEnd", value as number)
                  }
                  helpText="Final value of number incrementer"
                />
                <NumberFormElement
                  error={errors.duration?.message}
                  name="duration"
                  label="Duration"
                  initialValue={getValues().duration}
                  onValueChange={(value) =>
                    setValue("duration", TimeUnits.parse(value))
                  }
                  helpText="Duration in milliseconds"
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
                <NumberFormElement
                  error={errors.percentageVisible?.message}
                  name="percentageVisible"
                  label="Trigger"
                  initialValue={getValues().percentageVisible}
                  onValueChange={(value) =>
                    setValue("percentageVisible", value as number)
                  }
                  helpText="Increment will start when this % of element is visible in viewport"
                  min={0}
                  max={100}
                  units={"%"}
                />
              </Grid>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeading headingText="Scripts" />
            <AccordionPanel>
              <Grid
                templateColumns="44px, 1fr, 44px, 1fr"
                gap={"8px"}
                padding={"8px"}
              >
                <GridItem w="100%" colSpan={4}>
                  <InsertScript
                    alreadyInserted={getValues().scriptInserted}
                    ElementType={NumberIncrementer}
                  />
                </GridItem>
                <GridItem w="100%" colSpan={4}>
                  <CopyScriptToClipboard ElementType={NumberIncrementer} />
                </GridItem>
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </form>
    </>
  );
}

export default NumberIncrementerForm;
