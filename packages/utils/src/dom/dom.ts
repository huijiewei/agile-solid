export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

export const mergeRefs = <T extends Element>(
  setRef: (el: T) => void,
  propsRef: T | ((el: T) => void) | undefined
): ((el: T) => void) => {
  return (el) => {
    setRef(el);
    (propsRef as ((el: T) => void) | undefined)?.(el);
  };
};
