import { CompatibleElement } from "../elements/CompatibleElement";
import { useToast } from "@chakra-ui/react";
import { useSetPrevElementId } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { NumberIncrementer } from "../models/NumberIncrementer";

export type RemoveHandler = (removeElement?: boolean) => Promise<boolean>;

export const useNumberIncrementerRemoval = (
  currentElement: CompatibleElement | null,
) => {
  const setPrevElement = useSetPrevElementId();
  const toast = useToast();
  const navigate = useNavigate();

  if (!currentElement) {
    return;
  }

  const remove: RemoveHandler = async (removeElement = false) => {
    // reset the prev element value so that selected element callback fires
    setPrevElement(null);
    await NumberIncrementer.remove(currentElement, removeElement);

    toast({
      title: "Number incrementer removed",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    navigate("/app", { replace: true });
    return true;
  };
  return { remove };
};
