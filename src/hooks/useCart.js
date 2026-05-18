import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from '../store/slices/cartSlice';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);

  const add = useCallback(
    (product, quantity = 1) => dispatch(addToCart({ product, quantity })),
    [dispatch]
  );

  const remove = useCallback(
    (id) => dispatch(removeFromCart(id)),
    [dispatch]
  );

  const update = useCallback(
    (id, quantity) => dispatch(updateQuantity({ id, quantity })),
    [dispatch]
  );

  const clear = useCallback(() => dispatch(clearCart()), [dispatch]);

  return { items, count, total, add, remove, update, clear };
};
