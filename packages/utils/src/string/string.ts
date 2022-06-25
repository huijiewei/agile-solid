/* 驼峰命名法，第一个单词首字母小写，后面的每个单词首字母大写，又名小驼峰命名法。 */
export const camelCase = (str: string): string =>
  str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));

/* 帕斯卡命名法，每个单词首字母大写，又名大驼峰命名法*/
export const pascalCase = (str: string): string =>
  (str.match(/[a-zA-Z0-9]+/g) || []).map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');

export const slugify = (str: string): string => {
  return str
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-');
};
