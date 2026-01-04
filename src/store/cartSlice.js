import { createSlice } from '@reduxjs/toolkit';
import { CART_STORAGE_KEY } from '../utils/constants';

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return [];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.find(item => item.id === product.id);
      
      if (existingItem) {
        if (existingItem.quantity >= existingItem.stock) {
          return state;
        }
        existingItem.quantity += 1;
      } else {
        state.push({ ...product, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const productId = action.payload;
      return state.filter(item => item.id !== productId);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: () => {
      return [];
    },
    loadCart: (state, action) => {
      return action.payload;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, loadCart } = cartSlice.actions;

export const selectCart = (state) => state.cart;

export const selectCartItem = (state, productId) => {
  return state.cart.find(item => item.id === productId);
};

export const selectTotalItems = (state) => {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
};

export const selectTotalPrice = (state) => {
  return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export default cartSlice.reducer;

