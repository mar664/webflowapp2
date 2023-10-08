import { useEffect, useState, useRef } from "react";
import { useIsPageLoading } from "../contexts/AppContext";
import { FormLabel, FormControl, Box, Switch, Button } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../components/Header";
import { z } from "zod";
import { convertHTMLToWebflowElements } from "../utils";
import Prism from "prismjs";
import "prismjs/components/prism-cshtml";
import "prismjs/themes/prism.css";
import CodeEditor from "../components/code_editor";

const HTMLToWebflowOptions = z.object({
  createClasses: z.boolean().default(false),
  html: z.string().default(""),
});
export type HTMLToWebflowOptions = z.infer<typeof HTMLToWebflowOptions>;

function HTMLToWebFlowForm() {
  const { setIsPageLoading } = useIsPageLoading();

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    register,
    formState: { isLoading, errors },
  } = useForm<HTMLToWebflowOptions>({
    defaultValues: HTMLToWebflowOptions.parse({}),
    resolver: zodResolver(HTMLToWebflowOptions),
  });
  FormControl;
  const onSubmit: SubmitHandler<HTMLToWebflowOptions> = async (data) => {
    console.log("Submitting", data);

    const body = (await webflow.getAllElements())[0] as BodyElement;

    body.setChildren(
      body
        .getChildren()
        .concat(convertHTMLToWebflowElements(data.html, data.createClasses)),
    );
    await body.save();
  };
  const ref = useRef(null);

  useEffect(() => {
    setIsPageLoading(isLoading);
    (async () => await webflow.setExtensionSize("large"))();
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <>
      <Header heading="HTML Import" />
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
          <FormLabel>Create Classes</FormLabel>
          <Switch
            defaultChecked={getValues().createClasses}
            onChange={(e) => setValue("createClasses", e.target.checked)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>HTML</FormLabel>
          <CodeEditor
            value={watch("html")}
            onValueChange={(code) => setValue("html", code)}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.html, "html")
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

export default HTMLToWebFlowForm;
