import { Heading, IconButton, Stack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { RemoveButton } from "./RemoveButton";
import type { RemoveHandler } from "../types";
import { Paths } from "../paths";

interface Props {
  heading: string;
  visibilityAction?: { isHidden: boolean; toggleVisibility: () => void };
  removeAction?: { remove: RemoveHandler };
}
const Header = ({ heading, visibilityAction, removeAction }: Props) => {
  const navigate = useNavigate();

  return (
    <Stack
      justify={"space-between"}
      flexDirection={"row"}
      backgroundColor={"header.background"}
      alignItems={"center"}
      color={"header.color"}
      fontSize={"header.fontSize"}
      paddingLeft={"header.paddingLeft"}
      paddingRight={"header.paddingRight"}
      height={"header.height"}
    >
      <Heading as="h1" size={"sm"}>
        {heading}
      </Heading>
      <Stack flexDirection={"row"}>
        {visibilityAction ? (
          <IconButton
            onClick={visibilityAction.toggleVisibility}
            icon={
              <FontAwesomeIcon
                icon={visibilityAction.isHidden ? faEye : faEyeSlash}
              />
            }
            size={"xs"}
            aria-label="toggle visibility"
            margin={"header.button.margin"}
            padding={"header.button.padding"}
            backgroundColor={"header.button.background"}
            color={"header.button.color"}
            borderRadius={"header.button.borderRadius"}
            _hover={{
              backgroundColor: "header.button._hover.background",
              color: "header.button._hover.color",
              borderRadius: "header.button._hover.borderRadius",
            }}
          />
        ) : null}
        {removeAction ? (
          <RemoveButton
            elementType={heading}
            removeHandler={removeAction.remove}
            buttonProps={{
              size: "xs",
              "aria-label": `Remove ${heading}`,
              margin: "header.button.margin",
              padding: "header.button.padding",
              backgroundColor: "header.button.background",
              color: "header.button.color",
              borderRadius: "header.button.borderRadius",
              _hover: {
                backgroundColor: "header.button._hover.background",
                color: "header.button._hover.color",
                borderRadius: "header.button._hover.borderRadius",
              },
            }}
          />
        ) : null}
        <IconButton
          onClick={(event) => {
            navigate(Paths.app, { replace: true });
          }}
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
          size={"xs"}
          aria-label="back button"
          margin={"header.button.margin"}
          padding={"header.button.padding"}
          backgroundColor={"header.button.background"}
          color={"header.button.color"}
          borderRadius={"header.button.borderRadius"}
          _hover={{
            backgroundColor: "header.button._hover.background",
            color: "header.button._hover.color",
            borderRadius: "header.button._hover.borderRadius",
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Header;
