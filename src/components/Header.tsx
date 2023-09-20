import { Heading, IconButton, Stack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { RemoveButton } from "./RemoveButton";
import type { RemoveHandler } from "../types";

interface Props {
  heading: string;
  visibilityAction?: { isHidden: boolean; toggleVisibility: () => void };
  removeAction?: { remove: RemoveHandler };
}
const Header = ({ heading, visibilityAction, removeAction }: Props) => {
  const navigate = useNavigate();

  return (
    <Stack justify={"space-between"} flexDirection={"row"}>
      <Heading as="h1" size={"md"}>
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
            margin={"1"}
          />
        ) : null}
        {removeAction ? (
          <RemoveButton
            elementType={heading}
            removeHandler={removeAction.remove}
            buttonProps={{
              size: "xs",
              "aria-label": `Remove ${heading}`,
              margin: "1",
            }}
          />
        ) : null}
        <IconButton
          onClick={(event) => {
            navigate("/app", { replace: true });
          }}
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
          size={"xs"}
          aria-label="back button"
          margin={"1"}
        />
      </Stack>
    </Stack>
  );
};

export default Header;
