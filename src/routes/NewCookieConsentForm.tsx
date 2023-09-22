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
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { CookieConsentCompatibleElement } from "../elements/CookieConsentCompatibleElement";
import { uniqueId } from "lodash";
import { Tooltip } from "../components/Tooltip";
import { useIsPageLoading } from "../contexts/AppContext";
import {
  CookieConsent,
  NewCookieConsentOptions,
} from "../models/CookieConsent";

function NewCookieConsentForm() {
  const navigate = useNavigate();
  const { setIsPageLoading } = useIsPageLoading();
  console.log(NewCookieConsentOptions.parse({}));
  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isLoading, errors },
  } = useForm<NewCookieConsentOptions>({
    defaultValues: NewCookieConsentOptions.parse({}),
    resolver: zodResolver(NewCookieConsentOptions),
  });

  const onSubmit: SubmitHandler<NewCookieConsentOptions> = async (data) => {
    setIsPageLoading(true);
    console.log("Submitting", data);
    const classPrefix = data.classPrefix;

    const element = await CookieConsentCompatibleElement.getSelected();
    if (element) {
      const id = uniqueId();
      await CookieConsent.apply(element);

      {
        const elementStyle =
          (await webflow.getStyleByName(`${classPrefix} Container`)) ??
          webflow.createStyle(`${classPrefix} Container`);

        const properties: PropertyMap = {
          position: "fixed",
          "z-index": "1400",
          left: "0",
          top: "0",
          width: "100vw",
        };
        elementStyle.setProperties(properties);
        element.setStyles([elementStyle]);
      }

      const contentElement = webflow.createDOM("section");
      contentElement.setAttribute("role", "dialog");
      contentElement.setAttribute("id", `dialog-${id}`);
      contentElement.setAttribute("aria-labelledby", `dialog-${id}-label`);
      contentElement.setAttribute("aria-describedby", `dialog-${id}-desc`);
      contentElement.setAttribute("aria-modal", "false");

      if (data.createClasses) {
        const contentElementStyle =
          (await webflow.getStyleByName(`${classPrefix} Content`)) ??
          webflow.createStyle(`${classPrefix} Content`);

        const properties: PropertyMap = {
          "background-color": "rgb(255, 255, 255)",
          color: "rgb(45, 55, 72)",
        };

        contentElementStyle.setProperties(properties);

        contentElement.setStyles([contentElementStyle]);
      }
      const contentElementChildren = [];

      if (data.createHeader) {
        const headerElement = webflow.createDOM("header");
        headerElement.setTextContent("Cookie Consent Header");
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
        closeElement.setAttribute("data-mr-cookie-consent-close", "true");
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
        bodyElement.setTextContent(
          "We use Cookies on this site to enhance your experience and improve our marketing efforts. Click on “About Cookies” to learn more.",
        );
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
        footerElement.setTextContent(
          "this is the cookie consent footer content",
        );
        if (data.createClasses) {
          const footerElementStyle =
            (await webflow.getStyleByName(`${classPrefix} Footer`)) ??
            webflow.createStyle(`${classPrefix} Footer`);

          const properties: PropertyMap = {
            "padding-left": "2rem",
            "padding-right": "2rem",
            "padding-top": "1rem",
            "padding-bottom": "1rem",
            display: "flex",
            "justify-content": "flex-end",
            "column-gap": "1rem",
          };
          footerElementStyle.setProperties(properties);
          footerElement.setStyles([footerElementStyle]);
        }
        const footerElementChildren = [];

        if (data.createAboutCookiesLink) {
          const aboutCookiesElement = webflow.createDOM("a");
          aboutCookiesElement.setTextContent("About cookies?");
          if (data.createClasses) {
            const aboutCookiesElementStyle =
              (await webflow.getStyleByName(`${classPrefix} About Cookies`)) ??
              webflow.createStyle(`${classPrefix} About Cookiesl`);

            const properties: PropertyMap = {};
            aboutCookiesElementStyle.setProperties(properties);
            aboutCookiesElement.setStyles([aboutCookiesElementStyle]);
          }
          footerElementChildren.push(aboutCookiesElement);
        }

        if (data.createAllowAllButton) {
          const allowAllElement = webflow.createDOM("button");
          allowAllElement.setTextContent("Allow All");
          allowAllElement.setAttribute(
            CookieConsent.DATA_ATTRIBUTE_ALLOW_ALL,
            "true",
          );
          if (data.createClasses) {
            const allowAllElementStyle =
              (await webflow.getStyleByName(`${classPrefix} Allow All`)) ??
              webflow.createStyle(`${classPrefix} Allow All`);

            const properties: PropertyMap = {};
            allowAllElementStyle.setProperties(properties);
            allowAllElement.setStyles([allowAllElementStyle]);
          }
          footerElementChildren.push(allowAllElement);
        }

        if (data.createDenyButton) {
          const denyElement = webflow.createDOM("button");
          denyElement.setTextContent("Deny");
          denyElement.setAttribute(CookieConsent.DATA_ATTRIBUTE_DENY, "true");
          if (data.createClasses) {
            const denyElementStyle =
              (await webflow.getStyleByName(`${classPrefix} Deny`)) ??
              webflow.createStyle(`${classPrefix} Deny`);

            const properties: PropertyMap = {};
            denyElementStyle.setProperties(properties);
            denyElement.setStyles([denyElementStyle]);
          }
          footerElementChildren.push(denyElement);
        }

        footerElement.setChildren(footerElementChildren);
        contentElementChildren.push(footerElement);
      }
      contentElement.setChildren(contentElementChildren);

      const styleElement = webflow.createDOM("style");
      styleElement.setAttribute(CookieConsent.DATA_ATTRIBUTE_VISIBLE, "true");

      styleElement.setTextContent(
        `
        html.wf-design-mode *[${CookieConsent.DATA_ATTRIBUTE_BASE}='${element.id}']{
          display: ${CookieConsent.DISPLAY_TYPE};
        }
        html:not(.wf-design-mode) *[${CookieConsent.DATA_ATTRIBUTE_BASE}='${element.id}']{
          display: none;
        }`,
      );
      element?.setChildren([styleElement, contentElement]);

      await element?.save();

      navigate(`/cookie_consent_form`);
      setTimeout(() => setIsPageLoading(false), 500);
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <Heading as="h1" size={"md"}>
        Create New Cookie Consent
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
              label="Toggles whether to create a body div element for the Cookie Consent"
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
              label="Toggles whether to create a footer div element for the Cookie Consent"
              fontSize="md"
            >
              Create footer element
            </Tooltip>
          </FormLabel>
          <Switch
            id="create-footer"
            defaultChecked={getValues().createFooter}
            onChange={(e) => setValue("createFooter", e.target.checked)}
            disabled={true}
          />
        </FormControl>
        <FormControl
          display="flex"
          alignItems="center"
          margin={"2"}
          maxWidth={"full"}
        >
          <FormLabel htmlFor="create-about" mb="0">
            <Tooltip
              label="Toggles whether to create a link to about cookies"
              fontSize="md"
            >
              Create about cookies link
            </Tooltip>
          </FormLabel>
          <Switch
            id="create-about"
            defaultChecked={getValues().createAboutCookiesLink}
            onChange={(e) =>
              setValue("createAboutCookiesLink", e.target.checked)
            }
            disabled={true}
          />
        </FormControl>
        <FormControl
          display="flex"
          alignItems="center"
          margin={"2"}
          maxWidth={"full"}
        >
          <FormLabel htmlFor="create-allow" mb="0">
            <Tooltip
              label="Toggles whether to create a button for allow all"
              fontSize="md"
            >
              Create allow all button
            </Tooltip>
          </FormLabel>
          <Switch
            id="create-footer"
            defaultChecked={getValues().createAllowAllButton}
            onChange={(e) => setValue("createAllowAllButton", e.target.checked)}
            disabled={true}
          />
        </FormControl>
        <FormControl
          display="flex"
          alignItems="center"
          margin={"2"}
          maxWidth={"full"}
        >
          <FormLabel htmlFor="create-deny" mb="0">
            <Tooltip
              label="Toggles whether to create a button for deny"
              fontSize="md"
            >
              Create deny button
            </Tooltip>
          </FormLabel>
          <Switch
            id="create-deny"
            defaultChecked={getValues().createDenyButton}
            onChange={(e) => setValue("createDenyButton", e.target.checked)}
            disabled={true}
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
              label="Toggles whether to create classes for the elements for the Cookie Consent e.g MR Cookie Consent Container, MR Cookie Consent Overlay etc"
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
                label="Toggles whether to change the default class prefix 'MR Cookie Consent'"
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

export default NewCookieConsentForm;
