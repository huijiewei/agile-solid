import { mergeProps, splitProps } from 'solid-js';
import type { JSX, JSXElement } from 'solid-js';

type IconProps = JSX.SvgSVGAttributes<SVGSVGElement> & {
  size?: number | string;
};

const defaultProps = { size: '1rem', fill: 'none', viewBox: '0 0 24 24' };

export const Icon = (props: IconProps) => {
  const merged = mergeProps(defaultProps, props);
  const [local, rest] = splitProps(merged, ['size', 'fill', 'viewBox', 'children']);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={local.size}
      height={local.size}
      fill={local.fill}
      viewBox={local.viewBox}
      {...rest}
    >
      {local.children}
    </svg>
  );
};

type CreateIconOptions = {
  viewBox?: string;
  path?: JSXElement | JSXElement[];
  d?: string;
  defaultProps?: IconProps;
};

export const createIcon = (options: CreateIconOptions) => {
  const { viewBox, d, defaultProps, path } = options;

  const iconProps: IconProps = {
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    ...defaultProps,
  };

  return (props: IconProps) => {
    return (
      <Icon viewBox={viewBox} {...iconProps} {...props}>
        {path ? path : <path fill="currentColor" d={d} />}
      </Icon>
    );
  };
};
