import React, { memo, useState, useCallback } from 'react';
import { debounce as debounceFn } from '../../utils/debounce';
import { SORT_OPTIONS } from '../../utils/constants';
import styles from './Filters.module.css';

const Filters = memo(({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
  categories,
  clearFilters,
  hasActiveFilters,
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const debouncedSetSearchQuery = useCallback(
    debounceFn((value) => {
      setSearchQuery(value);
    }, 300),
    [setSearchQuery]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    debouncedSetSearchQuery(value);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label htmlFor="search" className={styles.label}>
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search products by name..."
          value={localSearchQuery}
          onChange={handleSearchChange}
          className={styles.input}
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="category" className={styles.label}>
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.select}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="sort" className={styles.label}>
          Sort by Price
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={styles.select}
        >
          <option value={SORT_OPTIONS.NONE}>None</option>
          <option value={SORT_OPTIONS.LOW_TO_HIGH}>Low → High</option>
          <option value={SORT_OPTIONS.HIGH_TO_LOW}>High → Low</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className={styles.clearButton}
          aria-label="Clear all filters"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
});

Filters.displayName = 'Filters';

export default Filters;

