"use client"
import { useCart } from "../context/CartContext"
import CartItem from "./CartItem"
import Notification from "./Notification"
import "../styles/Cart.css"

const Cart = () => {
  const { cartItems, getTotalPrice, clearCart, notification, showNotification } = useCart()

  const handleCheckout = () => {
    showNotification("Order placed successfully!")
    clearCart()
  }

  return (
    <div className="cart-container">
      <Notification show={notification.show} message={notification.message} />

      <h1 className="cart-title">Your Shopping Cart</h1>


      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>

            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
