import { Heading, IconButton, Stack, useDisclosure } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSetPrevElementId } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import {
  faTrashCan,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { RemoveDialog } from "./RemoveDialog";

interface Props {
  heading: string;
  visibiliyAction?: { isHidden: boolean; toggleVisibility: () => void };
  removeAction?: { removeModal: () => void };
}
const Header = ({ heading, visibiliyAction, removeAction }: Props) => {
  const setPrevElement = useSetPrevElementId();
  const navigate = useNavigate();
  const disclosure = useDisclosure();

  return (
    <Stack justify={"space-between"} flexDirection={"row"}>
      <Heading as="h1" size={"md"}>
        {heading}
      </Heading>
      <div>
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
          <>
            <RemoveDialog
              removeHandler={removeAction.removeModal}
              disclosure={disclosure}
            />
            <IconButton
              onClick={disclosure.onOpen}
              icon={<FontAwesomeIcon icon={faTrashCan} />}
              size={"xs"}
              aria-label="remove modal"
              margin={"1"}
            />
          </>
        ) : null}
        <IconButton
          onClick={(event) => {
            setPrevElement(null);
            navigate("/", { replace: true });
          }}
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
          size={"xs"}
          aria-label="back button"
          margin={"1"}
        />
      </div>
    </Stack>
  );
};

export default Header;
