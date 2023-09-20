import React from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal, NewModalOptions } from "../models/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ModalCompatibleElement } from "../elements/ModalCompatibleElement";
import { uniqueId } from "lodash";
import { Tooltip } from "../components/Tooltip";
import { useIsPageLoading } from "../contexts/AppContext";

function NewModalForm() {
  const navigate = useNavigate();
  const { setIsPageLoading } = useIsPageLoading();
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
    setIsPageLoading(true);
    console.log("Submitting", data);
    const classPrefix = data.classPrefix;

    const modalElement = await ModalCompatibleElement.getSelected();
    if (modalElement) {
      const id = uniqueId();
      await Modal.apply(modalElement);

      {
        const modalElementStyle =
          (await webflow.getStyleByName(`${classPrefix} Container`)) ??
          webflow.createStyle(`${classPrefix} Container`);

        const properties: PropertyMap = {
          position: "fixed",
          "align-items": "center",
          "justify-content": "center",
          "z-index": "1400",
          left: "0",
          top: "0",
          width: "100vw",
          height: "100vh",
          "overflow-x": "hidden",
          "overflow-y": "hidden",
        };
        modalElementStyle.setProperties(properties);
        modalElement.setStyles([modalElementStyle]);
      }

      const modalOverlay = webflow.createDOM("div");
      modalOverlay.setAttribute("data-mr-modal-overlay", `true`);

      const modalOverlayStyle =
        (await webflow.getStyleByName(`${classPrefix} Overlay`)) ??
        webflow.createStyle(`${classPrefix} Overlay`);

      const properties: PropertyMap = {
        position: "fixed",
        left: "0",
        top: "0",
        "background-color": "rgba(0, 0, 0, 0.4)",
        height: "100vh",
        width: "100vw",
        "overflow-x": "auto",
        "overflow-y": "auto",
        "z-index": "1400",
      };
      modalOverlayStyle.setProperties(properties);
      modalOverlay.setStyles([modalOverlayStyle]);

      const modalContent = webflow.createDOM("section");
      modalContent.setAttribute("role", "dialog");
      modalContent.setAttribute("id", `dialog-${id}`);
      modalContent.setAttribute("aria-labelledby", `dialog-${id}-label`);
      modalContent.setAttribute("aria-describedby", `dialog-${id}-desc`);
      modalContent.setAttribute("aria-modal", "true");

      if (data.createClasses) {
        const modalStyle =
          (await webflow.getStyleByName(`${classPrefix} Content`)) ??
          webflow.createStyle(`${classPrefix} Content`);

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
          "z-index": "1401",
        };

        modalStyle.setProperties(properties);

        modalContent.setStyles([modalStyle]);
      }
      const modalContentChildren = [];

      if (data.createHeader) {
        const modalHeader = webflow.createDOM("header");
        modalHeader.setTextContent("Modal Header");
        modalHeader.setAttribute("id", `dialog-${id}-label`);
        if (data.createClasses) {
          const modalStyle =
            (await webflow.getStyleByName(`${classPrefix} Header`)) ??
            webflow.createStyle(`${classPrefix} Header`);
          const properties: PropertyMap = {
            "padding-left": "2rem",
            "padding-right": "2rem",
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
        modalClose.setAttribute("data-mr-modal-close", "true");
        modalClose.setAttribute("aria-label", "Close");
        if (data.createClasses) {
          const modalStyle =
            (await webflow.getStyleByName(`${classPrefix} Close`)) ??
            webflow.createStyle(`${classPrefix} Close`);

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
        modalBody.setAttribute("id", `dialog-${id}-desc`);
        if (data.createClasses) {
          const modalStyle =
            (await webflow.getStyleByName(`${classPrefix} Body`)) ??
            webflow.createStyle(`${classPrefix} Body`);

          const properties: PropertyMap = {
            "padding-left": "2rem",
            "padding-right": "2rem",
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
            (await webflow.getStyleByName(`${classPrefix} Footer`)) ??
            webflow.createStyle(`${classPrefix} Footer`);

          const properties: PropertyMap = {
            "padding-left": "2rem",
            "padding-right": "2rem",
            "padding-top": "1rem",
            "padding-bottom": "1rem",
          };
          modalStyle.setProperties(properties);
          modalFooter.setStyles([modalStyle]);
        }
        modalContentChildren.push(modalFooter);
      }
      modalContent.setChildren(modalContentChildren);

      const modalStyleElement = webflow.createDOM("style");
      modalStyleElement.setAttribute("data-mr-modal-visible", "true");

      modalStyleElement.setTextContent(
        `
        html.wf-design-mode *[data-mr-modal='${modalElement.id}']{
          display: flex;
        }
        html:not(.wf-design-mode) *[data-mr-modal='${modalElement.id}']{
          display: none;
        }`,
      );
      modalElement?.setChildren([
        modalStyleElement,
        modalOverlay,
        modalContent,
      ]);

      await modalElement?.save();

      navigate(`/modal_form`);
      setTimeout(() => setIsPageLoading(false), 500);
    } else {
      console.log("error");
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
            disabled={true}
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
            disabled={true}
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
            disabled={true}
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
              Create footer element
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
              label="Toggles whether to create classes for the elements for the modal e.g MR Modal Container, MR Modal Overlay etc"
              fontSize="md"
            >
              Create classes for each element
            </Tooltip>
          </FormLabel>
          <Switch
            id="create-classes"
            defaultChecked={getValues().createClasses}
            onChange={(e) => {
              setValue("createClasses", e.target.checked);
              !e.target.checked && setValue("useCustomPrefix", false);
            }}
          />
        </FormControl>
        {watch("createClasses") && (
          <FormControl
            display="flex"
            alignItems="center"
            margin={"2"}
            maxWidth={"full"}
          >
            <FormLabel htmlFor="use-custom-class-prefix" mb="0">
              <Tooltip
                label="Toggles whether to change the default class prefix 'MR Modal'"
                fontSize="md"
              >
                Use a custom class prefix
              </Tooltip>
            </FormLabel>
            <Switch
              id="use-custom-class-prefix"
              defaultChecked={getValues().useCustomPrefix}
              onChange={(e) => setValue("useCustomPrefix", e.target.checked)}
            />
          </FormControl>
        )}
        {watch("createClasses") && watch("useCustomPrefix") && (
          <FormControl margin={"2"}>
            <FormLabel htmlFor="custom-class-prefix" mb="0">
              <Tooltip
                label="You can use a custom class prefix e.g My Custom Class Prefix"
                fontSize="md"
              >
                Custom prefix
              </Tooltip>
            </FormLabel>
            <Input
              id="custom-class-prefix"
              onChange={(e) => setValue("classPrefix", e.target.value)}
              placeholder={getValues().classPrefix}
            />
          </FormControl>
        )}
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
