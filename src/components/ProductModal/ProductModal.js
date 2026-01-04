import React, { memo } from 'react';
import { useCartContext } from '../../context/CartContext';
import { STOCK_STATUS } from '../../utils/constants';
import styles from './ProductModal.module.css';

const ProductModal = memo(({ product, isOpen, onClose }) => {
  const { addItem, getCartItem } = useCartContext();

  if (!isOpen || !product) return null;

  const cartItem = getCartItem(product.id);
  const stock = product.stock || 0;
  const isInStock = stock > 0;

  const handleAddToCart = () => {
    if (isInStock) {
      addItem({
        id: product.id,
        title: product.title || product.name,
        price: product.price,
        thumbnail: product.thumbnail || product.image,
        stock: stock,
      });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className={styles.modalBody}>
          <div className={styles.imageSection}>
            <img
              src={product.thumbnail || product.image}
              alt={product.title || product.name}
              className={styles.productImage}
            />
          </div>
          <div className={styles.detailsSection}>
            <h2 className={styles.productTitle}>{product.title || product.name}</h2>
            <p className={styles.productCategory}>{product.category}</p>
            <div className={styles.priceSection}>
              <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
              <span
                className={`${styles.stockStatus} ${
                  isInStock ? styles.inStock : styles.outOfStock
                }`}
              >
                {isInStock ? STOCK_STATUS.IN_STOCK : STOCK_STATUS.OUT_OF_STOCK}
              </span>
            </div>
            {product.description && (
              <p className={styles.productDescription}>{product.description}</p>
            )}
            <div className={styles.productInfo}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Stock:</span>
                <span className={styles.infoValue}>{stock} available</span>
              </div>
              {product.brand && (
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Brand:</span>
                  <span className={styles.infoValue}>{product.brand}</span>
                </div>
              )}
              {product.rating && (
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Rating:</span>
                  <span className={styles.infoValue}>
                    {product.rating} ⭐ ({product.ratingCount || 0} reviews)
                  </span>
                </div>
              )}
            </div>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              disabled={!isInStock}
            >
              {cartItem ? 'Add More to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductModal.displayName = 'ProductModal';

export default ProductModal;

