import React from "react";
import { NumberIncrementer } from "../elements/NumberIncrementer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSetPrevElementId } from "../contexts/AppContext";

interface Props {
  isAlready: boolean;
}

function NumberIncrementerSelection({ isAlready }: Props) {
  const navigate = useNavigate();
  const setPrevElement = useSetPrevElementId();

  const removeNumberIncrementer = async () => {
    const selectedElement = await webflow.getSelectedElement();
    if (selectedElement) {
      // reset the prev element value so that selected element callback fires
      setPrevElement(null);
      await NumberIncrementer.remove(selectedElement);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          console.log("redirect to number incrementer form");
          navigate(`/number_incrementer_form/${isAlready}`);
        }}
      >
        {isAlready ? "Edit NumberIncrementer" : "Convert to NumberIncrementer"}
      </button>
      {isAlready ? (
        <button onClick={removeNumberIncrementer}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      ) : null}
    </>
  );
}

export default NumberIncrementerSelection;
