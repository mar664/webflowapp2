import { useState, createContext, useContext } from "react";

interface IAppContext {
  prevElementId: string | null;
  setPrevElementId: React.Dispatch<React.SetStateAction<string | null>>;
  isSelectingElement: boolean;
  setIsSelectingElement: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUseAppContext {
  usePrevElementIdValue: () => string | null;
  useSetPrevElementId: () => React.Dispatch<
    React.SetStateAction<string | null>
  >;
  useIsSelectingElement: () => boolean;
  useSetIsSelectingElement: () => React.Dispatch<React.SetStateAction<boolean>>;
}

interface AppContextProviderProps {
  children: React.ReactElement;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppContextProvider = (props: AppContextProviderProps) => {
  const [prevElementId, setPrevElementId] = useState<string | null>(null);
  const [isSelectingElement, setIsSelectingElement] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        prevElementId,
        setPrevElementId,
        isSelectingElement,
        setIsSelectingElement,
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

export default AppContext;
