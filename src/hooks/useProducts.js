import { useState, useEffect } from 'react';
import { getCache, setCache } from '../cache';
import config from '../config';

const CATEGORIES = ['rice', 'spices', 'millets', 'millet products'];
const EMPTY = Object.fromEntries(CATEGORIES.map(c => [c, []]));

export function useProducts() {
  const [products, setProducts] = useState(() => getCache('products') || EMPTY);
  const [loading, setLoading] = useState(() => !getCache('products'));

  useEffect(() => {
    if (getCache('products')) return;
    fetch(`${config.API_URL}/api/products`)
      .then(r => r.json())
      .then(data => {
        const list = data.success ? data.products : Array.isArray(data) ? data : [];
        const grouped = Object.fromEntries(CATEGORIES.map(c => [c, []]));
        list.forEach(p => {
          const cat = p.category?.toLowerCase();
          if (grouped[cat] !== undefined)
            grouped[cat].push({ ...p, features: p.features ?? [], quantities: p.quantities ?? [] });
        });
        setCache('products', grouped);
        setProducts(grouped);
      })
      .catch(err => console.error('Failed to fetch products:', err))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}
