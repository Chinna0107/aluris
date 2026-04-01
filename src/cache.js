const cache = {};
const TTL = 5 * 60 * 1000; // 5 minutes

export function getCache(key) {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.ts > TTL) { delete cache[key]; return null; }
  return entry.data;
}

export function setCache(key, data) {
  cache[key] = { data, ts: Date.now() };
}
