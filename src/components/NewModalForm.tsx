import React from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Tooltip,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal, NewModalOptions } from "../elements/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompatibleElement } from "../elements/CompatibleElement";
import { useNavigate } from "react-router-dom";

function NewModalForm() {
  const navigate = useNavigate();
  console.log(NewModalOptions.parse({}));
  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isLoading, errors },
  } = useForm<NewModalOptions>({
    defaultValues: NewModalOptions.parse({}),
    resolver: zodResolver(NewModalOptions),
  });

  const onSubmit: SubmitHandler<NewModalOptions> = async (data) => {
    console.log("Submitting", data);

    const modalElement = await CompatibleElement.getSelected();
    if (modalElement) {
      await Modal.apply(modalElement);

      const modalContent = webflow.createDOM("section");
      if (data.createClasses) {
        const modalStyle =
          (await webflow.getStyleByName("MR Modal Content")) ??
          webflow.createStyle("MR Modal Content");

        const properties: PropertyMap = {
          "background-color": "rgb(255, 255, 255)",

          "border-bottom-color": "rgb(226, 232, 240)",
          "border-bottom-left-radius": "6px",
          "border-bottom-right-radius": "6px",
          "border-bottom-style": "solid",
          "border-bottom-width": "0px",

          "border-top-color": "rgb(226, 232, 240)",
          "border-top-left-radius": "6px",
          "border-top-right-radius": "6px",
          "border-top-style": "solid",
          "border-top-width": "0px",

          "border-left-color": "rgb(226, 232, 240)",
          "border-left-style": "solid",
          "border-left-width": "0px",

          "border-right-color": "rgb(226, 232, 240)",
          "border-right-style": "solid",
          "border-right-width": "0px",

          "box-shadow":
            "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
          color: "rgb(45, 55, 72)",
          display: "flex",
          "flex-direction": "column",
          position: "relative",
        };

        modalStyle.setProperties(properties);

        modalContent.setStyles([modalStyle]);
      }
      const modalContentChildren = [];

      if (data.createHeader) {
        const modalHeader = webflow.createDOM("header");
        modalHeader.setTextContent("Modal Header");
        if (data.createClasses) {
          const modalStyle =
            (await webflow.getStyleByName("MR Modal Header")) ??
            webflow.createStyle("MR Modal Header");
          const properties: PropertyMap = {
            "padding-inline-start": "2rem",
            "padding-inline-end": "2rem",
            "padding-top": "1rem",
            "padding-bottom": "1rem",
            "font-size": "1.25rem",
            "font-weight": "600",
          };
          modalStyle.setProperties(properties);
          modalHeader.setStyles([modalStyle]);
        }
        modalContentChildren.push(modalHeader);
      }
      if (data.createClose) {
        const modalClose = webflow.createDOM("button");
        modalClose.setTextContent("X");
        if (data.createClasses) {
          const modalStyle =
            (await webflow.getStyleByName("MR Modal Close")) ??
            webflow.createStyle("MR Modal Close");

          const properties: PropertyMap = {
            position: "absolute",
            top: "1rem",
            right: "1rem",
          };
          modalStyle.setProperties(properties);
          modalClose.setStyles([modalStyle]);
        }
        modalContentChildren.push(modalClose);
      }
      if (data.createBody) {
        const modalBody = webflow.createDOM("div");
        modalBody.setTextContent("this is the modal body content");
        if (data.createClasses) {
          const modalStyle =
            (await webflow.getStyleByName("MR Modal Body")) ??
            webflow.createStyle("MR Modal Body");

          const properties: PropertyMap = {
            "padding-inline-start": "2rem",
            "padding-inline-end": "2rem",
            "padding-top": "1rem",
            "padding-bottom": "1rem",
            "font-size": "1rem",
            "font-weight": "400",
          };
          modalStyle.setProperties(properties);
          modalBody.setStyles([modalStyle]);
        }
        modalContentChildren.push(modalBody);
      }
      if (data.createFooter) {
        const modalFooter = webflow.createDOM("footer");
        modalFooter.setTextContent("this is the modal footer content");
        if (data.createClasses) {
          const modalStyle =
            (await webflow.getStyleByName("MR Modal Footer")) ??
            webflow.createStyle("MR Modal Footer");

          const properties: PropertyMap = {
            "padding-inline-start": "2rem",
            "padding-inline-end": "2rem",
            "padding-top": "1rem",
            "padding-bottom": "1rem",
          };
          modalStyle.setProperties(properties);
          modalFooter.setStyles([modalStyle]);
        }
        modalContentChildren.push(modalFooter);
      }
      modalContent.setChildren(modalContentChildren);
      modalElement?.setChildren([modalContent]);

      await modalElement?.save();

      navigate(`/modal_form`);
    }
  };

  return (
    <>
      <Heading as="h1" size={"md"}>
        Create New Modal
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          display="flex"
          alignItems="center"
          margin={"2"}
          maxWidth={"full"}
        >
          <FormLabel htmlFor="create-header" mb="0">
            <Tooltip
              label="Toggles whether to create a header element for the modal"
              fontSize="md"
            >
              Create header element
            </Tooltip>
          </FormLabel>
          <Switch
            id="create-header"
            defaultChecked={getValues().createHeader}
            onChange={(e) => setValue("createHeader", e.target.checked)}
          />
        </FormControl>
        <FormControl
          display="flex"
          alignItems="center"
          margin={"2"}
          maxWidth={"full"}
        >
          <FormLabel htmlFor="create-close" mb="0">
            <Tooltip
              label="Toggles whether to create a close button element for the modal"
              fontSize="md"
            >
              Create close button element
            </Tooltip>
          </FormLabel>
          <Switch
            id="create-close"
            defaultChecked={getValues().createClose}
            onChange={(e) => setValue("createClose", e.target.checked)}
          />
        </FormControl>
        <FormControl
          display="flex"
          alignItems="center"
          margin={"2"}
          maxWidth={"full"}
        >
          <FormLabel htmlFor="create-body" mb="0">
            <Tooltip
              label="Toggles whether to create a body div element for the modal"
              fontSize="md"
            >
              Create body div element
            </Tooltip>
          </FormLabel>
          <Switch
            id="create-body"
            defaultChecked={getValues().createBody}
            onChange={(e) => setValue("createBody", e.target.checked)}
          />
        </FormControl>
        <FormControl
          display="flex"
          alignItems="center"
          margin={"2"}
          maxWidth={"full"}
        >
          <FormLabel htmlFor="create-footer" mb="0">
            <Tooltip
              label="Toggles whether to create a footer div element for the modal"
              fontSize="md"
            >
              Creates footer element
            </Tooltip>
          </FormLabel>
          <Switch
            id="create-footer"
            defaultChecked={getValues().createFooter}
            onChange={(e) => setValue("createFooter", e.target.checked)}
          />
        </FormControl>
        <FormControl
          display="flex"
          alignItems="center"
          margin={"2"}
          maxWidth={"full"}
        >
          <FormLabel htmlFor="create-classes" mb="0">
            <Tooltip
              label="Toggles whether to create classes for the div elements for the modal"
              fontSize="md"
            >
              Create classes for each element
            </Tooltip>
          </FormLabel>
          <Switch
            id="create-classes"
            defaultChecked={getValues().createClasses}
            onChange={(e) => setValue("createClasses", e.target.checked)}
          />
        </FormControl>
        <ButtonGroup>
          <Button>Cancel</Button>
          <Button colorScheme="green" ml={3} type="submit">
            Create
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
}

export default NewModalForm;
