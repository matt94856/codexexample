import NodeCache from 'node-cache';
import { env } from '../config/env.js';

export const cacheClient = new NodeCache({
  stdTTL: env.cacheTtlSeconds,
  checkperiod: 60,
  useClones: false
});

export function getOrSetCache(key, fetcher) {
  const cached = cacheClient.get(key);
  if (cached) return Promise.resolve(cached);

  return fetcher().then((freshData) => {
    cacheClient.set(key, freshData);
    return freshData;
  });
}
