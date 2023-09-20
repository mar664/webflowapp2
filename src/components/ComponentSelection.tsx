import { Button, ButtonGroup, IconButton, Tooltip } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { type RemoveHandler, VisibilityHandler } from "../types";
import { RemoveButton } from "./RemoveButton";

interface Props {
  elementType: string;
  isAlready: boolean;
  existingHandler: () => void;
  newHandler: () => void;
  visibility?: VisibilityHandler;
  removeHandler: RemoveHandler;
}

function ComponentSelection({
  elementType,
  isAlready,
  visibility,
  newHandler,
  existingHandler,
  removeHandler,
}: Props) {
  return (
    <ButtonGroup variant="outline" spacing="6" margin={4}>
      {!isAlready ? (
        <Button onClick={newHandler}>Transform into a {elementType}</Button>
      ) : (
        <Tooltip label={`Edit ${elementType} settings`} fontSize="md">
          <Button
            onClick={existingHandler}
            rightIcon={<FontAwesomeIcon icon={faCog} />}
            variant="outline"
            aria-label={`${elementType} settings`}
          >
            Edit {elementType}
          </Button>
        </Tooltip>
      )}
      {isAlready && visibility ? (
        <>
          <Tooltip
            label="Toggle the modal visibility in webflow designer"
            fontSize="md"
          >
            <IconButton
              onClick={visibility?.toggleVisibility}
              colorScheme={visibility?.isHidden ? "green" : "red"}
              icon={
                <FontAwesomeIcon
                  icon={visibility?.isHidden ? faEye : faEyeSlash}
                />
              }
              aria-label={
                visibility?.isHidden
                  ? `Show ${elementType} in designer`
                  : `Hide ${elementType} in designer`
              }
            />
          </Tooltip>
        </>
      ) : null}
      {isAlready ? (
        <>
          <Tooltip
            label={`Removes the ${elementType} attributes and settings`}
            fontSize="md"
          >
            <RemoveButton
              elementType={elementType}
              removeHandler={removeHandler as RemoveHandler}
              buttonProps={{
                "aria-label": `Remove ${elementType}`,
                colorScheme: "red",
              }}
            />
          </Tooltip>
        </>
      ) : null}
    </ButtonGroup>
  );
}

export default ComponentSelection;
