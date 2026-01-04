import { useState, useMemo } from 'react';
import { SORT_OPTIONS } from '../utils/constants';

export const useFilters = (products) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.NONE);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.sort();
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.name?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (sortOption === SORT_OPTIONS.LOW_TO_HIGH) {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === SORT_OPTIONS.HIGH_TO_LOW) {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, sortOption]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortOption(SORT_OPTIONS.NONE);
  };

  const hasActiveFilters = searchQuery || selectedCategory || sortOption !== SORT_OPTIONS.NONE;

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    categories,
    filteredAndSortedProducts,
    clearFilters,
    hasActiveFilters,
  };
};

