import { render, screen } from '@agile-solid/test';
import { describe, test, expect } from 'vitest';
import { VisuallyHidden } from './VisuallyHidden';

describe('VisuallyHidden', () => {
  test('render', async () => {
    const { baseElement, unmount } = render(() => <VisuallyHidden>Click me</VisuallyHidden>);

    console.log(baseElement);

    //expect(screen.getByText(/Click me/i)).toBeDefined();

    //unmount();
  });
});
