import { useEffect, useState, useRef } from "react";
import { useIsPageLoading } from "../contexts/AppContext";
import { FormLabel, FormControl, Box, Switch, Button } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../components/Header";
import { z } from "zod";
import {
  convertCSSToWebflowStyles,
  convertHTMLToWebflowElements,
} from "../utils";
import Prism from "prismjs";
import "prismjs/components/prism-cshtml";
import "prismjs/themes/prism.css";
import CodeEditor from "../components/code_editor";

const CSSToWebflowFormOptions = z.object({
  css: z.string().default(""),
});
export type CSSToWebflowFormOptions = z.infer<typeof CSSToWebflowFormOptions>;

function CSSToWebflowForm() {
  const { setIsPageLoading } = useIsPageLoading();

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    register,
    formState: { isLoading, errors },
  } = useForm<CSSToWebflowFormOptions>({
    defaultValues: CSSToWebflowFormOptions.parse({}),
    resolver: zodResolver(CSSToWebflowFormOptions),
  });
  FormControl;
  const onSubmit: SubmitHandler<CSSToWebflowFormOptions> = async (data) => {
    console.log("Submitting", data);

    await convertCSSToWebflowStyles(data.css);
  };

  useEffect(() => {
    setIsPageLoading(isLoading);
    (async () => await webflow.setExtensionSize("large"))();
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <>
      <Header heading="CSS Import" />
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

      <Box as="form" onSubmit={handleSubmit(onSubmit)} margin={"10px"}>
        <FormControl>
          <FormLabel>CSS</FormLabel>
          <CodeEditor
            value={watch("css")}
            onValueChange={(code) => setValue("css", code)}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.css, "css")
            }
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: "13px",
            }}
          />
        </FormControl>
        <Button type="submit">Insert</Button>
      </Box>
    </>
  );
}

export default CSSToWebflowForm;
