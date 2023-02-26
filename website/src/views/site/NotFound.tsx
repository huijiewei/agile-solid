import Image404 from '../../assets/images/404.png';
import { Alert } from '@agile-solid/components';

const NotFound = () => {
  return (
    <Alert title={'页面不存在'}>
      <img class={'w-[320px] aspect-[3/2] items-center'} src={Image404} alt={'页面不存在'} />
    </Alert>
  );
};

export default NotFound;
