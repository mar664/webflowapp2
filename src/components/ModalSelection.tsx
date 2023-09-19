import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
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
import { useSetPrevElementId } from "../contexts/AppContext";
import { Modal } from "../elements/Modal";
import { CompatibleElement } from "../elements/CompatibleElement";
import { useModalRemoval, useModalVisibility } from "../hooks/modal";

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
        <Button onClick={() => navigate(`/new_modal_form`)}>
          Transform into a Modal
        </Button>
      ) : (
        <Tooltip label="Edit modal settings" fontSize="md">
          <Button
            onClick={() => navigate(`/modal_form`)}
            rightIcon={<FontAwesomeIcon icon={faCog} />}
            variant="outline"
            aria-label="Modal settings"
          >
            Modal
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
            <IconButton
              onClick={modalRemoval?.removeModal}
              colorScheme="red"
              icon={<FontAwesomeIcon icon={faTrashCan} />}
              aria-label="Remove modal"
            />
          </Tooltip>
        </>
      ) : null}
    </ButtonGroup>
  );
}

export default ModalSelection;
