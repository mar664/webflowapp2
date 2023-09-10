import { useState, createContext, useContext } from "react";

interface IAppContext {
  prevElementId: string | null;
  setPrevElementId: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface IUseAppContext {
  usePrevElementIdValue: () => string | null;
  useSetPrevElementId: () => React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

interface AppContextProviderProps {
  children: React.ReactElement;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppContextProvider = (props: AppContextProviderProps) => {
  const [prevElementId, setPrevElementId] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ prevElementId, setPrevElementId }}>
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

export default AppContext;
