import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Summary from "../Components/Summary";
import Finance from "../Components/Finance";
import Confirmation from "../Components/Confirmation";
import { clearCart } from "../data/repositoryapi";

function Checkout() {
  // Retrieve current URL location
  const location = useLocation();

  // State variables
  const [cart, setCart] = useState([]); // State for storing cart data
  const [userName, setUserName] = useState(""); // State for storing user name
  const [checkoutCompleted, setCheckoutCompleted] = useState(false); // State for tracking checkout completion

  // Effect hook to update cart and user name when location state changes
  useEffect(() => {
    if (location.state && location.state.cart) {
      const cartData = location.state.cart;
      setCart(cartData);
    }
    if (location.state && location.state.userName) {
      setUserName(location.state.userName);
    }
  }, [location.state]);

  // Clears users cart in the database and finalises the checkout
  const handleFinalizeCheckout = (formData) => {
    clearCart(localStorage.getItem("email"));
    setCheckoutCompleted(true); // Mark checkout as completed
  };

  // If checkout is completed, render Confirmation component
  if (checkoutCompleted) {
    return <Confirmation userName={userName} cart={cart} />;
  }

  // Render checkout components
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <Summary cart={cart} />
        <div className="Finance">
          <Finance onFinalizeCheckout={handleFinalizeCheckout} />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
