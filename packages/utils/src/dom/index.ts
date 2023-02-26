export const isBrowser = (): boolean => {
  return typeof document !== 'undefined';
};

type NavigatorUAData = {
  brands: Array<{ brand: string; version: string }>;
  mobile: boolean;
  platform: string;
};

export const getPlatform = (): string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uaData = (navigator as any).userAgentData as NavigatorUAData | undefined;

  if (uaData?.platform) {
    return uaData.platform;
  }

  return navigator.platform;
};

export const getUserAgent = (): string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uaData = (navigator as any).userAgentData as NavigatorUAData | undefined;

  if (uaData && Array.isArray(uaData.brands)) {
    return uaData.brands.map(({ brand, version }) => `${brand}/${version}`).join(' ');
  }

  return navigator.userAgent;
};
