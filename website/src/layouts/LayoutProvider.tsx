import { Accessor, createContext, createSignal, ParentProps, Setter, useContext } from 'solid-js';

export type LayoutContextValue = {
  showAside: Accessor<boolean>;
  setShowAside: Setter<boolean>;
};

const LayoutContext = createContext<LayoutContextValue>();

export const useShowAside = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('useShowAside must be used within a LayoutProvider');
  }

  return {
    showAside: context.showAside,
    setShowAside: context.setShowAside,
  };
};

export const LayoutProvider = (props: ParentProps) => {
  const [showAside, setShowAside] = createSignal(false);

  return <LayoutContext.Provider value={{ showAside, setShowAside }}>{props.children}</LayoutContext.Provider>;
};
