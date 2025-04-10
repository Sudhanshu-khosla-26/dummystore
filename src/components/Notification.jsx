
import { useEffect, useState } from "react"
import "../styles/Notification.css"

const Notification = ({ show, message }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300) // Match this with CSS transition time

      return () => clearTimeout(timer)
    }
  }, [show])

  if (!show && !isVisible) return null

  return <div className={`notification ${show ? "show" : "hide"}`}>{message}</div>
}

export default Notification
