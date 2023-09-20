import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { CompatibleElement } from "../elements/CompatibleElement";
import {
  type RemoveHandler,
  useModalRemoval,
  useModalVisibility,
} from "../hooks/modal";
import { RemoveButton } from "./RemoveButton";

interface Props {
  isAlready: boolean;
  currentElement: CompatibleElement;
}

function ModalSelection({ isAlready, currentElement }: Props) {
  const navigate = useNavigate();

  const modalVisibility = useModalVisibility(currentElement);
  const modalRemoval = useModalRemoval(currentElement);

  return (
    <ButtonGroup variant="outline" spacing="6" margin={4}>
      {!isAlready ? (
        <Button onClick={() => navigate(`/new_modal_form`, { replace: true })}>
          Transform into a Modal
        </Button>
      ) : (
        <Tooltip label="Edit modal settings" fontSize="md">
          <Button
            onClick={() => navigate(`/modal_form`, { replace: true })}
            rightIcon={<FontAwesomeIcon icon={faCog} />}
            variant="outline"
            aria-label="Modal settings"
          >
            Edit Modal
          </Button>
        </Tooltip>
      )}
      {isAlready ? (
        <>
          <Tooltip
            label="Toggle the modal visibility in webflow designer"
            fontSize="md"
          >
            <IconButton
              onClick={modalVisibility?.toggleVisibility}
              colorScheme={modalVisibility?.isHidden ? "green" : "red"}
              icon={
                <FontAwesomeIcon
                  icon={modalVisibility?.isHidden ? faEye : faEyeSlash}
                />
              }
              aria-label={
                modalVisibility?.isHidden
                  ? "Show modal in designer"
                  : "Hide modal in designer"
              }
            />
          </Tooltip>
          <Tooltip
            label="Removes the modal attributes and settings"
            fontSize="md"
          >
            <RemoveButton
              elementType={"Modal"}
              removeHandler={modalRemoval?.remove as RemoveHandler}
              buttonProps={{
                "aria-label": "Remove Modal",
                colorScheme: "red",
              }}
            />
          </Tooltip>
        </>
      ) : null}
    </ButtonGroup>
  );
}

export default ModalSelection;
