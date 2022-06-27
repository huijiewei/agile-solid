import { cleanup, render } from '@agile-solid/test';
import { VisuallyHidden } from './VisuallyHidden';
import { describe, test, expect, afterEach } from 'vitest';

describe('VisuallyHidden', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const { getByText, unmount } = render(() => <VisuallyHidden>Click me</VisuallyHidden>);

    expect(getByText(/Click me/i)).toBeDefined();

    unmount();
  });
});
