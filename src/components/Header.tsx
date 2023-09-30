import { Heading, IconButton, Stack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, generatePath } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { RemoveButton } from "./RemoveButton";
import type { RemoveHandler, VisibilityHandler } from "../types";
import { Paths } from "../paths";
import { useSetSelectedElement } from "../contexts/AppContext";
import { useEffect } from "react";
interface Props {
  heading: string;
  visibilityActions?: VisibilityHandler;
  removeAction?: { remove: RemoveHandler };
}
const Header = ({ heading, visibilityActions, removeAction }: Props) => {
  const navigate = useNavigate();
  const setSelectedElement = useSetSelectedElement();

  useEffect(() => {
    console.log("loading header");
    if (visibilityActions) {
      (async () => {
        await visibilityActions.show();
      })();
    }
    return () => {
      console.log("unloading header");

      if (visibilityActions) {
        (async () => {
          await visibilityActions.hide(true);
        })();
      }
    };
  }, []);

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
        {visibilityActions ? (
          <IconButton
            variant={"headerIcon"}
            onClick={visibilityActions.toggleVisibility}
            icon={
              <FontAwesomeIcon
                icon={visibilityActions.isHidden ? faEye : faEyeSlash}
              />
            }
            aria-label="toggle visibility"
            size={"xs"}
          />
        ) : null}
        {removeAction ? (
          <RemoveButton
            elementType={heading}
            removeHandler={removeAction.remove}
            buttonProps={{
              size: "xs",
              "aria-label": `Remove ${heading}`,
            }}
          />
        ) : null}
        <IconButton
          variant={"headerIcon"}
          onClick={async (event) => {
            setSelectedElement(await webflow.getSelectedElement());
            navigate(generatePath(Paths.appBackState, { isFromBack: "true" }), {
              replace: true,
            });
          }}
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
          size={"xs"}
          aria-label="back button"
        />
      </Stack>
    </Stack>
  );
};

export default Header;
