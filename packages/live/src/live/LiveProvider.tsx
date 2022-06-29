import { Accessor, createContext, createEffect, createSignal, ParentProps, useContext } from 'solid-js';

type LiveContextValue = {
  code: string;
  error: Accessor<string | undefined>;
  onError: (error: string) => void;
  previewCode: Accessor<string | undefined>;
  onChange: (code: string) => void;
};

const LiveContext = createContext<LiveContextValue>();

export const useLiveContext = () => {
  return useContext(LiveContext);
};

export type LiveProviderProps = {
  code: string;
};

export const LiveProvider = (props: ParentProps<LiveProviderProps>) => {
  const [error, setError] = createSignal<string>();
  const [previewCode, setPreviewCode] = createSignal<string>();

  createEffect(() => {
    setPreviewCode(props.code);
  });

  return (
    <LiveContext.Provider
      value={{
        code: props.code,
        error: error,
        onError: (error) => setError(error),
        previewCode: previewCode,
        onChange: (code) => setPreviewCode(code),
      }}
    >
      {props.children}
    </LiveContext.Provider>
  );
};
