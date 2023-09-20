import { Heading, IconButton, Stack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSetPrevElementId } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { RemoveButton } from "./RemoveButton";
import type { RemoveHandler } from "../hooks/modal";

interface Props {
  heading: string;
  visibiliyAction?: { isHidden: boolean; toggleVisibility: () => void };
  removeAction?: { remove: RemoveHandler };
}
const Header = ({ heading, visibiliyAction, removeAction }: Props) => {
  const setPrevElement = useSetPrevElementId();
  const navigate = useNavigate();

  return (
    <Stack justify={"space-between"} flexDirection={"row"}>
      <Heading as="h1" size={"md"}>
        {heading}
      </Heading>
      <Stack flexDirection={"row"}>
        {visibiliyAction ? (
          <IconButton
            onClick={visibiliyAction.toggleVisibility}
            icon={
              <FontAwesomeIcon
                icon={visibiliyAction.isHidden ? faEye : faEyeSlash}
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
