import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  products,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
} from '../data/products';

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase();

  const filtered = useMemo(() => {
    let result = products;
    if (category) {
      result = getProductsByCategory(category);
    }
    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search)
      );
    }
    return result;
  }, [category, search]);

  return { products: filtered, category, search };
};

export const useProduct = () => {
  const { id } = useParams();
  const product = useMemo(() => getProductById(id), [id]);
  return { product };
};

export const useFeaturedProducts = () => {
  return useMemo(() => getFeaturedProducts(), []);
};
