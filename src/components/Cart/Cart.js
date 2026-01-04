import React, { memo } from 'react';
import { useCartContext } from '../../context/CartContext';
import EmptyState from '../EmptyState/EmptyState';
import styles from './Cart.module.css';

const Cart = memo(() => {
  const {
    cart,
    removeItem,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCartContext();

  const handleQuantityChange = (productId, newQuantity, maxStock) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else if (newQuantity <= maxStock) {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className={styles.cartContainer}>
        <h2 className={styles.cartTitle}>Shopping Cart</h2>
        <EmptyState message="Your cart is empty" icon="🛒" />
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Shopping Cart</h2>
      <div className={styles.cartItems}>
        {cart.map(item => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.itemImage}>
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <div className={styles.itemDetails}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
            </div>
            <div className={styles.itemControls}>
              <div className={styles.quantityControl}>
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.stock)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.stock)}
                  disabled={item.quantity >= item.stock}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <div className={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className={styles.removeButton}
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.title} from cart`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cartSummary}>
        <div className={styles.summaryRow}>
          <span>Total Items:</span>
          <span className={styles.summaryValue}>{getTotalItems()}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Total Price:</span>
          <span className={styles.summaryValue}>${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
});

Cart.displayName = 'Cart';

export default Cart;

