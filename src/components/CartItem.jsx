
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "../styles/CartItem.css"

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0) {
      updateQuantity(item.id, value)
    }
  }

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <Link to={`/product/${item.id}`}>
          <img src={item.image || "/placeholder.svg"} alt={item.title} />
        </Link>
      </div>

      <div className="cart-item-details">
        <Link to={`/product/${item.id}`} className="cart-item-title">
          {item.title}
        </Link>

        <div className="cart-item-price">${item.price.toFixed(2)}</div>

        <div className="cart-item-actions">
          <div className="quantity-control">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="quantity-btn"
              aria-label="Decrease quantity"
            >
              -
            </button>

            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />

            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="quantity-btn"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button onClick={() => removeFromCart(item.id)} className="remove-button" aria-label="Remove item">
            Remove
          </button>
        </div>
      </div>

      <div className="cart-item-subtotal">
        <div className="subtotal-label">Subtotal:</div>
        <div className="subtotal-amount">${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    </div>
  )
}

export default CartItem
