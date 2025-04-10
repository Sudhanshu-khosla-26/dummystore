
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "../styles/ProductCard.css"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-wrapper">
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="product-image" />
        </div>

        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>

          <div className="product-category">{product.category}</div>

          <div className="product-price">${product.price.toFixed(2)}</div>

          <div className="product-rating">
            <span className="rating-stars">
              {"★".repeat(Math.round(product.rating.rate))}
              {"☆".repeat(5 - Math.round(product.rating.rate))}
            </span>
            <span className="rating-count">({product.rating.count})</span>
          </div>
        </div>
      </Link>

      <button className="quick-add-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
