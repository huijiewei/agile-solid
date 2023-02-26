import type { ParentProps } from 'solid-js';
import { ColorModeProvider, useColorMode } from './ColorModeProvider';

export { useColorMode };

export const AgileProvider = (props: ParentProps) => {
  return <ColorModeProvider>{props.children}</ColorModeProvider>;
};
