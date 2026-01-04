import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { CART_STORAGE_KEY } from '../utils/constants';

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  if (action.type.startsWith('cart/')) {
    const state = store.getState();
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
  
  return result;
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

