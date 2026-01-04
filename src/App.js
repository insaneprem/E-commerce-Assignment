import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { useProducts } from './hooks/useProducts';
import { useFilters } from './hooks/useFilters';
import ProductList from './components/ProductList/ProductList';
import Filters from './components/Filters/Filters';
import Cart from './components/Cart/Cart';
import ProductModal from './components/ProductModal/ProductModal';
import styles from './App.module.css';

const App = () => {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
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
  } = useFilters(products);

  const displayedProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(0, 20);
  }, [filteredAndSortedProducts]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className={styles.app}>
        <div className={styles.loading}>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.app}>
        <div className={styles.error}>
          <p>Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1 className={styles.title}>Mini E-Commerce</h1>
        </header>
        <main className={styles.main}>
          <div className={styles.productsSection}>
            <Filters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortOption={sortOption}
              setSortOption={setSortOption}
              categories={categories}
              clearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
            <ProductList products={displayedProducts} onProductClick={handleProductClick} />
          </div>
          <aside className={styles.cartSection}>
            <Cart />
          </aside>
        </main>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </CartProvider>
  );
};

export default App;

