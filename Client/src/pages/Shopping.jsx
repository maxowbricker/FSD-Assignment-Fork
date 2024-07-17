import React from "react";
import ShoppingCart from "../Components/ShoppingCart";

function Shopping({ user }) {
  return (
    <div className="shopping-container">
      <h1 className="shopping-title">Shop Now!</h1>
      <ShoppingCart user={user} />
    </div>
  );
}

export default Shopping;