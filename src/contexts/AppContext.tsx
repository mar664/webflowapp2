import { useState, createContext, useContext } from "react";
import { IStyleItem, useStyles as useStylesHook } from "../hooks/styles";

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
  useModalHidden: {
    isModalHidden: boolean;
    setIsModalHidden: React.Dispatch<React.SetStateAction<boolean>>;
  };
  useIsPageLoading: {
    isPageLoading: boolean;
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
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
  useModalHidden: {
    isModalHidden: boolean;
    setIsModalHidden: React.Dispatch<React.SetStateAction<boolean>>;
  };
  useIsPageLoading: {
    isPageLoading: boolean;
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

interface AppContextProviderProps {
  children: React.ReactElement;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppContextProvider = (props: AppContextProviderProps) => {
  const [prevElementId, setPrevElementId] = useState<string | null>(null);
  const [isSelectingElement, setIsSelectingElement] = useState<boolean>(false);
  const { styles, setStyles, isLoading, setIsLoading, update } =
    useStylesHook();
  const [isModalHidden, setIsModalHidden] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        prevElementId,
        setPrevElementId,
        isSelectingElement,
        setIsSelectingElement,
        useStyles: { styles, setStyles, isLoading, setIsLoading, update },
        useModalHidden: { isModalHidden, setIsModalHidden },
        useIsPageLoading: { isPageLoading, setIsPageLoading },
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

export const useModalHidden = () => {
  const context = useContext(AppContext);
  return context.useModalHidden;
};

export const useIsPageLoading = () => {
  const context = useContext(AppContext);
  return context.useIsPageLoading;
};

export default AppContext;
