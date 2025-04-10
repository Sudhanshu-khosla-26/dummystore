
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import "../styles/Header.css"

const Header = () => {
  const { logout, user } = useAuth()
  const { getItemsCount } = useCart()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-content">
        <Link to="/" className="logo">
          🛒 Dummy
          <span>
            Store
          </span>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}></span>
        </button>

        <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>

          <Link to="/cart" className={`cart-link ${location.pathname === "/cart" ? "active" : ""}`}>
            Cart
            {getItemsCount() > 0 && <span className="cart-count">{getItemsCount()}</span>}
          </Link>

          <button className="logout-button" onClick={logout}>
            Logout
            {user && <span className="username">({user.username})</span>}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
