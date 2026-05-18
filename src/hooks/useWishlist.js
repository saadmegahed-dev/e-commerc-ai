import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
  selectWishlistItems,
  selectWishlistCount,
  selectIsInWishlist,
} from '../store/slices/wishlistSlice';

export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWishlistItems);
  const count = useAppSelector(selectWishlistCount);

  const toggle = useCallback(
    (product) => dispatch(toggleWishlist(product)),
    [dispatch]
  );

  const remove = useCallback(
    (id) => dispatch(removeFromWishlist(id)),
    [dispatch]
  );

  const clear = useCallback(() => dispatch(clearWishlist()), [dispatch]);

  return { items, count, toggle, remove, clear };
};

export const useIsInWishlist = (productId) => {
  return useAppSelector(selectIsInWishlist(productId));
};
