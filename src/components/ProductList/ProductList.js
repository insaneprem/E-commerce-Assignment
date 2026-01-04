import React, { memo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import EmptyState from '../EmptyState/EmptyState';
import styles from './ProductList.module.css';

const ProductList = memo(({ products, onProductClick }) => {
  if (products.length === 0) {
    return <EmptyState message="No products found" icon="🔍" />;
  }

  return (
    <div className={styles.productList}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
});

ProductList.displayName = 'ProductList';

export default ProductList;

