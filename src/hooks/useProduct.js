import { useState, useEffect } from 'react';
import { getCache, setCache } from '../cache';
import config from '../config';

export function useProduct(id) {
  const [product, setProduct] = useState(() => getCache(`product_${id}`) || null);
  const [loading, setLoading] = useState(() => !getCache(`product_${id}`));

  useEffect(() => {
    if (!id) return;
    if (getCache(`product_${id}`)) return;
    fetch(`${config.API_URL}/api/products/${id}`)
      .then(r => r.json())
      .then(data => {
        const p = data.product || data;
        const normalized = { ...p, features: p.features ?? [], quantities: p.quantities ?? [] };
        setCache(`product_${id}`, normalized);
        setProduct(normalized);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading };
}
