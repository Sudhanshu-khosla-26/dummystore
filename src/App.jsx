import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import Login from "./components/Login"
import Home from "./components/Home"
import ProductDetail from "./components/ProductDetail"
import Cart from "./components/Cart"
import Header from "./components/Header"
import "./styles/App.css"

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <Home />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <ProductDetail />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <Cart />
                    </>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
