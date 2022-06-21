import { VisuallyHidden } from '@agile-solid/components';
import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <>
      <h1>Hello world!</h1>
      <VisuallyHidden>Click me</VisuallyHidden>
    </>
  );
};

export default App;
