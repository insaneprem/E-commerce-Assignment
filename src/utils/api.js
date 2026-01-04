import { API_ENDPOINTS } from './constants';

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.DUMMY_JSON);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

