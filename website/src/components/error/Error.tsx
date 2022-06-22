import { Button } from '@agile-solid/components';
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
        <Button variant={'outline'} onClick={handleBack}>
          返回
        </Button>
      </div>
    </div>
  );
};
