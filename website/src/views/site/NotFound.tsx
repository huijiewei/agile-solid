import { Error } from '../../components/error/Error';
import Image404 from '../../assets/images/404.png';

const NotFound = () => {
  return (
    <Error title={'页面不存在'}>
      <img class={'w-[320px] aspect-[3/2] items-center'} src={Image404} alt={'页面不存在'} />
    </Error>
  );
};

export default NotFound;
