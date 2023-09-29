import { useState, createContext, useContext } from "react";
import { IStyleItem, useStyles as useStylesHook } from "../hooks/styles";
import { useSelectedElement as useSelectedElementHook } from "../hooks/selectedElement";

interface IAppContext {
  prevElementId: string | null;
  setPrevElementId: React.Dispatch<React.SetStateAction<string | null>>;
  isSelectingElement: boolean;
  setIsSelectingElement: React.Dispatch<React.SetStateAction<boolean>>;
  useStyles: {
    styles: IStyleItem[];
    setStyles: React.Dispatch<React.SetStateAction<IStyleItem[]>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    update: () => void;
  };
  useIsElementHidden: {
    isElementHidden: Record<string, boolean>;
    setIsElementHidden: React.Dispatch<
      React.SetStateAction<Record<string, boolean>>
    >;
  };
  useIsPageLoading: {
    isPageLoading: boolean;
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
  useSelectedElement: {
    selectedElement: AnyElement | null | undefined;
  };
  useSetSelectedElement: React.Dispatch<
    React.SetStateAction<AnyElement | null | undefined>
  >;
}

export interface IUseAppContext {
  usePrevElementIdValue: () => string | null;
  useSetPrevElementId: () => React.Dispatch<
    React.SetStateAction<string | null>
  >;
  useIsSelectingElement: () => boolean;
  useSetIsSelectingElement: () => React.Dispatch<React.SetStateAction<boolean>>;
  useStyles: {
    styles: IStyleItem[];
    setStyles: React.Dispatch<React.SetStateAction<IStyleItem[]>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    update: () => void;
  };
  useIsElementHidden: {
    isElementHidden: Record<string, boolean>;
    setIsElementHidden: React.Dispatch<
      React.SetStateAction<Record<string, boolean>>
    >;
  };
  useIsPageLoading: {
    isPageLoading: boolean;
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
  useSelectedElement: {
    selectedElement: AnyElement | null | undefined;
  };
  useSetSelectedElement: React.Dispatch<
    React.SetStateAction<AnyElement | null | undefined>
  >;
}

interface AppContextProviderProps {
  children: React.ReactElement;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppContextProvider = (props: AppContextProviderProps) => {
  const { selectedElement, setSelectedElement } = useSelectedElementHook();
  const [prevElementId, setPrevElementId] = useState<string | null>(null);
  const [isSelectingElement, setIsSelectingElement] = useState<boolean>(false);
  const { styles, setStyles, isLoading, setIsLoading, update } =
    useStylesHook();
  const [isElementHidden, setIsElementHidden] = useState<
    Record<string, boolean>
  >({});
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        prevElementId,
        setPrevElementId,
        isSelectingElement,
        setIsSelectingElement,
        useStyles: { styles, setStyles, isLoading, setIsLoading, update },
        useIsElementHidden: { isElementHidden, setIsElementHidden },
        useIsPageLoading: { isPageLoading, setIsPageLoading },
        useSelectedElement: {
          selectedElement,
        },
        useSetSelectedElement: setSelectedElement,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const usePrevElementIdValue = () => {
  const context = useContext(AppContext);
  return context.prevElementId;
};

export const useSetPrevElementId = () => {
  const context = useContext(AppContext);
  return context.setPrevElementId;
};

export const useIsSelectingElement = () => {
  const context = useContext(AppContext);
  return context.isSelectingElement;
};

export const useSetIsSelectingElement = () => {
  const context = useContext(AppContext);
  return context.setIsSelectingElement;
};

export const useStyles = () => {
  const context = useContext(AppContext);
  return context.useStyles;
};

export const useIsElementHidden = () => {
  const context = useContext(AppContext);
  return context.useIsElementHidden;
};

export const useIsPageLoading = () => {
  const context = useContext(AppContext);
  return context.useIsPageLoading;
};

export const useSelectedElement = () => {
  const context = useContext(AppContext);
  return context.useSelectedElement;
};

export const useSetSelectedElement = () => {
  const context = useContext(AppContext);
  return context.useSetSelectedElement;
};

export default AppContext;
