import { post, get, put, del, patch } from './ajax';

export const APIgetSamples = (params = {}) => get('https://www.plugco.in/public/take_home_sample_feed', params); // 