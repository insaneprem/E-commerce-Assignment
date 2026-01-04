import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItem } from '../../store/cartSlice';
import { STOCK_STATUS } from '../../utils/constants';
import styles from './ProductCard.module.css';

const ProductCard = memo(({ product, onProductClick }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(state => selectCartItem(state, product.id));
  const stock = product.stock || 0;
  const isInStock = stock > 0;
  const isOutOfStock = !isInStock;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isInStock) {
      dispatch(addItem({
        id: product.id,
        title: product.title || product.name,
        price: product.price,
        thumbnail: product.thumbnail || product.image,
        stock: stock,
      }));
    }
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <div className={styles.productCard} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <img
          src={product.thumbnail || product.image}
          alt={product.title || product.name}
          className={styles.image}
        />
        {isOutOfStock && (
          <div className={styles.outOfStockOverlay}>
            <span>Out of Stock</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title || product.name}</h3>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.footer}>
          <div className={styles.priceInfo}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            <span
              className={`${styles.stockStatus} ${
                isInStock ? styles.inStock : styles.outOfStock
              }`}
            >
              {isInStock ? STOCK_STATUS.IN_STOCK : STOCK_STATUS.OUT_OF_STOCK}
            </span>
          </div>
          <button
            className={styles.addToCartButton}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={`Add ${product.title || product.name} to cart`}
          >
            {cartItem ? 'Add More' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
