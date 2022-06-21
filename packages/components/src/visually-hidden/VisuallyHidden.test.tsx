import { render } from '@agile-solid/test';
import { VisuallyHidden } from './VisuallyHidden';

describe('VisuallyHidden', () => {
  test('render', async () => {
    const { getByText, unmount } = render(() => <VisuallyHidden>Click me</VisuallyHidden>);

    expect(getByText(/Click me/i)).toBeInTheDocument();

    unmount();
  });
});
