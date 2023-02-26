import { install } from '@twind/core';
import config from '../twind.config';

const tw = install(config, import.meta.env.PROD);

export const setup = () => tw;

export default tw;
