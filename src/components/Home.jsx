"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import Notification from "./Notification"
import { useCart } from "../context/CartContext"
import "../styles/Home.css"

const Home = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { notification } = useCart()

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        let url = "https://fakestoreapi.com/products"
        if (selectedCategory) {
          url = `https://fakestoreapi.com/products/category/${selectedCategory}`
        }

        const response = await fetch(url)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories")
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  // Filter products by search term
  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="home-container">
      <Notification show={notification.show} message={notification.message} />

      <div className="filters-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>


        <div className="categories-container">
          <button
            className={`category-button ${selectedCategory === "" ? "active" : ""}`}
            onClick={() => setSelectedCategory("")}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="no-products">
              <p>No products found. Try a different search or category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
