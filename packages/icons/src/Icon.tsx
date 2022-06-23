import { mergeProps, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';

export type IconProps = Omit<JSX.SvgSVGAttributes<SVGSVGElement>, 'children'>;

export const Icon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  const defaultProps: IconProps = {
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  };

  const propsWithDefault = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(propsWithDefault, [
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
      fill={local.fill}
      viewBox={local.viewBox}
      stroke={local.stroke}
      stroke-width={local['stroke-width']}
      stroke-linecap={local['stroke-linecap']}
      stroke-linejoin={local['stroke-linejoin']}
      {...rest}
    >
      {local.children}
    </svg>
  );
};
