import React from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Tooltip,
  Input,
  Switch,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal, NewModalOptions } from "../models/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { ModalCompatibleElement } from "../elements/ModalCompatibleElement";
import { useIsPageLoading, useSelectedElement } from "../contexts/AppContext";
import { uuidv4 } from "../utils";
import { Paths } from "../paths";
import Header from "../components/Header";
import { useSelectedElementOfType } from "../hooks/selectedElement";

function NewModalForm() {
  const navigate = useNavigate();

  const { setIsPageLoading } = useIsPageLoading();

  const selectedModalElement = useSelectedElementOfType(
    ModalCompatibleElement,
  ) as ModalCompatibleElement;

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

    if (selectedModalElement) {
      const id = uuidv4();
      const modalElement = webflow.createDOM("div");

      await Modal.apply(modalElement);

      {
        const elementStyle =
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
        elementStyle.setProperties(properties);
        modalElement.setStyles([elementStyle]);
      }

      const overlayElement = webflow.createDOM("div");
      overlayElement.setAttribute(Modal.DATA_ATTRIBUTE_OVERLAY, `true`);

      const overlayStyle =
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
      overlayStyle.setProperties(properties);
      overlayElement.setStyles([overlayStyle]);

      const contentElement = webflow.createDOM("section");
      contentElement.setAttribute("role", "dialog");
      contentElement.setAttribute("id", `dialog-${id}`);
      contentElement.setAttribute("aria-labelledby", `dialog-${id}-label`);
      contentElement.setAttribute("aria-describedby", `dialog-${id}-desc`);
      contentElement.setAttribute("aria-modal", "true");

      if (data.createClasses) {
        const contentElementStyle =
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

        contentElementStyle.setProperties(properties);

        contentElement.setStyles([contentElementStyle]);
      }
      const contentElementChildren = [];

      if (data.createHeader) {
        const headerElement = webflow.createDOM("header");
        headerElement.setTextContent("Modal Header");
        headerElement.setAttribute("id", `dialog-${id}-label`);
        if (data.createClasses) {
          const headerElementStyle =
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
          headerElementStyle.setProperties(properties);
          headerElement.setStyles([headerElementStyle]);
        }
        contentElementChildren.push(headerElement);
      }
      if (data.createClose) {
        const closeElement = webflow.createDOM("button");
        closeElement.setTextContent("X");
        closeElement.setAttribute(Modal.DATA_ATTRIBUTE_CLOSE, "true");
        closeElement.setAttribute("aria-label", "Close");
        if (data.createClasses) {
          const closeElementStyle =
            (await webflow.getStyleByName(`${classPrefix} Close`)) ??
            webflow.createStyle(`${classPrefix} Close`);

          const properties: PropertyMap = {
            position: "absolute",
            top: "1rem",
            right: "1rem",
          };
          closeElementStyle.setProperties(properties);
          closeElement.setStyles([closeElementStyle]);
        }
        contentElementChildren.push(closeElement);
      }
      if (data.createBody) {
        const bodyElement = webflow.createDOM("div");
        bodyElement.setTextContent("this is the modal body content");
        bodyElement.setAttribute("id", `dialog-${id}-desc`);
        if (data.createClasses) {
          const bodyElementStyle =
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
          bodyElementStyle.setProperties(properties);
          bodyElement.setStyles([bodyElementStyle]);
        }
        contentElementChildren.push(bodyElement);
      }
      if (data.createFooter) {
        const footerElement = webflow.createDOM("footer");
        footerElement.setTextContent("this is the modal footer content");
        if (data.createClasses) {
          const footerElementStyle =
            (await webflow.getStyleByName(`${classPrefix} Footer`)) ??
            webflow.createStyle(`${classPrefix} Footer`);

          const properties: PropertyMap = {
            "padding-left": "2rem",
            "padding-right": "2rem",
            "padding-top": "1rem",
            "padding-bottom": "1rem",
          };
          footerElementStyle.setProperties(properties);
          footerElement.setStyles([footerElementStyle]);
        }
        contentElementChildren.push(footerElement);
      }
      contentElement.setChildren(contentElementChildren);

      const modalStyleElement = webflow.createDOM("style");
      modalStyleElement.setAttribute(Modal.DATA_ATTRIBUTE_VISIBLE, "true");

      modalStyleElement.setTextContent(
        `
        html.wf-design-mode *[${Modal.DATA_ATTRIBUTE_BASE}='${modalElement.id}']{
          display: ${Modal.DISPLAY_TYPE};
        }
        html:not(.wf-design-mode) *[${Modal.DATA_ATTRIBUTE_BASE}='${modalElement.id}']{
          display: none;
        }`,
      );
      modalElement?.setChildren([
        modalStyleElement,
        overlayElement,
        contentElement,
      ]);

      selectedModalElement.setChildren(
        selectedModalElement.getChildren().concat(modalElement),
      );
      await selectedModalElement.save();

      navigate(
        generatePath(Paths.modalForm, {
          elementId: modalElement.id,
          isNew: "true",
        }),
        { replace: true },
      );
      setTimeout(() => setIsPageLoading(false), 500);
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <Header heading="New Modal" creationPage={true} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          display="flex"
          alignItems="center"
          margin={"2"}
          maxWidth={"full"}
        >
          <FormLabel htmlFor="create-header" mb="0">
            <Tooltip
              hasArrow
              label="Toggles whether to create a header element for the modal"
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
              hasArrow
              label="Toggles whether to create a close button element for the modal"
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
              hasArrow
              label="Toggles whether to create a body div element for the modal"
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
              hasArrow
              label="Toggles whether to create a footer div element for the modal"
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
              hasArrow
              label="Toggles whether to create classes for the elements for the modal e.g MR Modal Container, MR Modal Overlay etc"
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
                hasArrow
                label="Toggles whether to change the default class prefix 'MR Modal'"
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
          <FormControl margin={"2"} w={"auto"}>
            <FormLabel htmlFor="custom-class-prefix" mb="0">
              <Tooltip
                hasArrow
                label="You can use a custom class prefix e.g My Custom Class Prefix"
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
        <ButtonGroup spacing="4" float={"right"} m={4}>
          <Button
            size={"sm"}
            onClick={(event) => {
              navigate(Paths.app, { replace: true });
            }}
          >
            Cancel
          </Button>
          <Button variant="enable" type="submit" size={"sm"}>
            Create
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
}

export default NewModalForm;
