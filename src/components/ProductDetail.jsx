"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../context/CartContext"
import Notification from "./Notification"
import "../styles/ProductDetail.css"

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart, notification } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0) {
      setQuantity(value)
    }
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    )
  }

  if (!product) {
    return <div className="error-message">Product not found</div>
  }

  return (
    <div className="product-detail-container">
      <Notification show={notification.show} message={notification.message} />

      <div className="product-detail-card">
        <div className="product-image-container">
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="product-detail-image" />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>

          <div className="product-category">{product.category}</div>

          <div className="product-rating">
            <span className="rating-stars">
              {"★".repeat(Math.round(product.rating.rate))}
              {"☆".repeat(5 - Math.round(product.rating.rate))}
            </span>
            <span className="rating-count">({product.rating.count} reviews)</span>
          </div>

          <div className="product-price">${product.price.toFixed(2)}</div>

          <p className="product-description">{product.description}</p>

          <div className="product-actions">
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
              <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
