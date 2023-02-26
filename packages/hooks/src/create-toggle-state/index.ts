import type { MaybeAccessor } from '../utils/types';
import type { Accessor } from 'solid-js';
import { createControllableBooleanSignal } from '../create-controllable-signal';
import { unAccessor } from '../utils';

export type CreateToggleStateProps = {
  selected?: MaybeAccessor<boolean | undefined>;
  defaultSelected?: MaybeAccessor<boolean | undefined>;
  disabled?: MaybeAccessor<boolean | undefined>;
  readonly?: MaybeAccessor<boolean | undefined>;
  onSelectedChange?: (selected: boolean) => void;
};

export type ToggleState = {
  selected: Accessor<boolean>;
  setSelected: (selected: boolean) => void;
  toggle: () => void;
};

export function createToggleState(props: CreateToggleStateProps = {}): ToggleState {
  const [selected, _setSelected] = createControllableBooleanSignal({
    value: () => unAccessor(props.selected),
    defaultValue: () => !!unAccessor(props.defaultSelected),
    onChange: (value) => props.onSelectedChange?.(value),
  });

  const setSelected = (value: boolean) => {
    if (!unAccessor(props.readonly) && !unAccessor(props.disabled)) {
      _setSelected(value);
    }
  };

  const toggle = () => {
    if (!unAccessor(props.readonly) && !unAccessor(props.disabled)) {
      _setSelected(!selected());
    }
  };

  return {
    selected,
    setSelected,
    toggle,
  };
}
