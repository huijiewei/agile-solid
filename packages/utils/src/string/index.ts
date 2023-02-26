export const isString = (value: unknown): value is string => {
  return Object.prototype.toString.call(value) === '[object String]';
};

const stringToHashtable = (source: string) => {
  const res: Record<string, boolean> = {};

  for (let i = 0; i < source.length; i++) {
    res[source[i]] = true;
  }

  return res;
};

export const trimStart = (source: string, trimChars: string) => {
  const trimCharsHashTable = stringToHashtable(trimChars);
  let result = source.substring(0);

  while (trimCharsHashTable[result[0]]) {
    result = result.substring(1);
  }

  return result;
};

export const trimEnd = (source: string, trimChars: string) => {
  const trimCharsHashTable = stringToHashtable(trimChars);
  let result = source.substring(0);

  while (trimCharsHashTable[result[result.length - 1]]) {
    result = result.slice(0, -1);
  }

  return result;
};

/* 驼峰命名法，第一个单词首字母小写，后面的每个单词首字母大写，又名小驼峰命名法。 */
export const camelCase = (str: string): string =>
  str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));

/* 帕斯卡命名法，每个单词首字母大写，又名大驼峰命名法*/
export const pascalCase = (str: string): string =>
  (str.match(/[a-zA-Z0-9]+/g) || []).map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');

/* 短横线隔开命名法，每个单词首字母小写。 */
export const kebabCase = (str: string): string =>
  (str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || []).join('-').toLowerCase();

export const slugify = (str: string): string => {
  return str
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-');
};
