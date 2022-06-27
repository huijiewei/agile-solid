import { ErrorAlert } from '../../components/error-alert/ErrorAlert';
import Image500 from '../../assets/images/500.png';

const NotFound = () => {
  return (
    <ErrorAlert title={'组件文档不存在'}>
      <img class={'w-[320px] aspect-[3/2] items-center'} src={Image500} alt={'组件文档不存在'} />
    </ErrorAlert>
  );
};

export default NotFound;
