import { Dynamic } from 'solid-js/web';
import { mergeProps, splitProps } from 'solid-js';
import { createPolymorphicComponent } from '../utils/component';

export const Box = createPolymorphicComponent<'div'>((props) => {
  const propsWithDefault = mergeProps({ as: 'div' }, props);
  const [local, rest] = splitProps(propsWithDefault, ['as']);

  return <Dynamic component={local.as} {...rest} />;
});
