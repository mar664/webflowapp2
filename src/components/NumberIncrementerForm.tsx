import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { NumberIncrementer } from "../elements/NumberIncrementer";
import { useSetPrevElementId } from "../contexts/AppContext";

interface IFormInput {
  incrementStart: number;
  incrementEnd: number;
  percentageVisible: number;
  duration: number;
}

// loads data before switching route and sets current element as a number incrementer if not already
export async function loader() {
  const selectedElement = await webflow.getSelectedElement();
  if (selectedElement && !NumberIncrementer.isAlready(selectedElement)) {
    await NumberIncrementer.apply(selectedElement);
  }
  return { selectedElement };
}

type loaderData = Awaited<ReturnType<typeof loader>>;

function NumberIncrementerForm() {
  const navigate = useNavigate();
  const setPrevElement = useSetPrevElementId();

  const params = useParams();
  console.log(params);
  const { selectedElement } = useLoaderData() as loaderData;
  console.log(selectedElement);

  useEffect(() => {
    console.log("loaded incrementer");
    const selectedElementCallback = (element: AnyElement | null) => {
      if (element) {
        // if another element is clicked redirect to root
        if (selectedElement && element.id !== selectedElement.id) {
          setPrevElement(null);
          navigate("/", { replace: true });
        }
      }
    };

    const unsubscribeSelectedElement = webflow.subscribe(
      "selectedelement",
      selectedElementCallback,
    );

    return () => {
      console.log("unloaded");
      unsubscribeSelectedElement();
    };
  }, []);

  const fetchDefaultValues = () => {
    if (selectedElement && params && params.exists) {
      return NumberIncrementer.parse(selectedElement);
    }
    return {
      incrementStart: NumberIncrementer.DEFAULT_INCREMENT_START,
      incrementEnd: NumberIncrementer.DEFAULT_INCREMENT_END,
      percentageVisible: NumberIncrementer.DEFAULT_PERCENTAGE_VISIBLE,
      duration: NumberIncrementer.DEFAULT_INCREMENT_DURATION,
    };
  };

  const {
    register,
    handleSubmit,
    formState: { isLoading },
  } = useForm<IFormInput>({
    defaultValues: fetchDefaultValues(),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Submitting");
    const selectedElement = await webflow.getSelectedElement();
    if (selectedElement) {
      await NumberIncrementer.update(selectedElement, data);
    }
  };

  if (isLoading) return null;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Increment Start</label>
        <input type="number" {...register("incrementStart", { min: 0 })} />
        <label>Increment End</label>
        <input type="number" {...register("incrementEnd", { min: 1 })} />
        <label>Duration</label>
        <input type="number" {...register("duration", { min: 0 })} />
        <label>Percentage Visible to Start Increment</label>
        <input
          type="number"
          {...register("percentageVisible", { min: 0, max: 100 })}
        />
        <input type="submit" />
      </form>
      <button
        onClick={(event) => {
          setPrevElement(null);
          navigate("/", { replace: true });
        }}
      >
        Back
      </button>
    </>
  );
}

export default NumberIncrementerForm;
