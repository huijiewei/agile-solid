import { Accessor, createContext, createSignal, ParentProps, Setter, useContext } from 'solid-js';

type LayoutContextValue = {
  showAside: Accessor<boolean>;
  setShowAside: Setter<boolean>;
};

const LayoutContext = createContext<LayoutContextValue>();

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('useShowAside must be used within a LayoutProvider');
  }

  return context;
};

export const LayoutProvider = (props: ParentProps) => {
  const [showAside, setShowAside] = createSignal(false);

  return <LayoutContext.Provider value={{ showAside, setShowAside }}>{props.children}</LayoutContext.Provider>;
};
