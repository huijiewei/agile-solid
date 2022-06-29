import { Input } from '@agile-solid/components';

export const FormDemo = () => {
  return (
    <form class={'flex flex-col gap-4'}>
      <div class={'flex flex-row justify-start items-center gap-4'}>
        <div class={'flex flex-col'}>
          <label for={'demoFormFirstName'} class={''}>
            姓 <span class={'text-red-500'}>*</span>
          </label>
          <Input placeholder={'姓'} id={'demoFormFirstName'} />
        </div>
        <div class={'flex flex-col'}>
          <label for={'demoFormLastName'} class={''}>
            名 <span class={'text-red-500'}>*</span>
          </label>
          <Input placeholder={'名'} id={'demoFormLastName'} />
        </div>
      </div>
      <div class={'flex flex-col'}>
        <label for={'demoFormEmail'} class={''}>
          电子邮箱 <span class={'text-red-500'}>*</span>
        </label>
        <Input placeholder={'电子邮箱'} id={'demoFormEmail'} />
      </div>
      <div class={'flex flex-col'}>
        <label for={'demoFormPassword'} class={''}>
          密码 <span class={'text-red-500'}>*</span>
        </label>
        <Input placeholder={'密码'} id={'demoFormPassword'} />
      </div>
      <div class={'flex flex-col'}>
        <label for={'demoFormPasswordRepeat'} class={''}>
          确认密码 <span class={'text-red-500'}>*</span>
        </label>
        <Input placeholder={'确认密码'} id={'demoFormPasswordRepeat'} />
      </div>
      <div>
        <label class={'flex items-center'}>
          <input checked={true} class={'mr-2'} type={'checkbox'} />
          <span>同意用户协议和隐私策略</span>
        </label>
      </div>
    </form>
  );
};
