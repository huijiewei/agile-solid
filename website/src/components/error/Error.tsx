import { useNavigate } from 'solid-app-router';
import type { JSX } from 'solid-js';

type ErrorProps = {
  title: string;
  children?: JSX.Element;
  onBack?: () => void;
};

export const Error = (props: ErrorProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    props.onBack && props.onBack();
    navigate(-1);
  };
  return (
    <div class={'flex py-32 flex-auto flex-col items-center justify-center p-4 text-center'}>
      <h1 class={'text-xl'}>{props.title}</h1>
      {props.children && <div class={'mx-auto mt-5 w-fit'}>{props.children}</div>}
      <div class={'mt-5'}>
        <button
          class={
            'text-blue-600 appearance-none h-8 inline-flex w-auto bg-white px-3 transition-colors align-middle border border-current duration-300 items-center justify-center select-none whitespace-nowrap rounded hover:bg-blue-50 active:bg-blue-100 dark:bg-black'
          }
          onClick={handleBack}
        >
          返回
        </button>
      </div>
    </div>
  );
};
