import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js';

export type IconProps = Omit<JSX.SvgSVGAttributes<SVGSVGElement>, 'children'>;

export const Icon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  const [local, rest] = splitProps(props, [
    'fill',
    'stroke',
    'stroke-width',
    'stroke-linecap',
    'stroke-linejoin',
    'viewBox',
    'children',
  ]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={local.fill || 'none'}
      viewBox={local.viewBox || '0 0 24 24'}
      stroke={local.stroke || 'currentColor'}
      stroke-width={local['stroke-width'] || 2}
      stroke-linecap={local['stroke-linecap'] || 'round'}
      stroke-linejoin={local['stroke-linejoin'] || 'round'}
      {...rest}
    >
      {local.children}
    </svg>
  );
};
