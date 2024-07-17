import React, { useState, useEffect, useCallback } from 'react';
import Product from './Product';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, getCart, updateCartProduct } from '../data/repositoryapi.jsx';

const ShoppingCart = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // State to store total amount
  const isLoggedIn = () => !!user;
  const navigate = useNavigate();

  const fetchInitialData = useCallback(async () => {
    try {
      const fetchedProducts = await fetchProducts();
      let userCart = { cart: { products: [], total_amount: "0.00" } }; // Default empty cart
      if (user) {
        userCart = await getCart(user.email); // Fetch user's cart
      }
      const initialProducts = fetchedProducts.data.map(product => {
        const cartItem = userCart.cart.products.find(item => item.productID === product.productID);
        return {
          ...product,
          quantity: cartItem ? cartItem.cart_product.quantity : 0
        };
      });

      setProducts(initialProducts);
      setTotalAmount(parseFloat(userCart.cart.total_amount)); // Set total amount from fetched cart
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const updateCart = async (productId, newQuantity) => {
    if (!user) {
      alert("You have to be logged in to select items!");
      return;
    }
    try {
      // Sync the updated quantity to the backend
      await updateCartProduct(user.email, productId, newQuantity);
      // Re-fetch the cart to update the UI with new total amount
      const updatedCart = await getCart(user.email);
      setTotalAmount(parseFloat(updatedCart.cart.total_amount)); // Update total amount
  
      // Update products state to reflect new quantities
      const updatedProducts = products.map(product => 
        product.productID === productId
          ? { ...product, quantity: newQuantity }
          : product
      );
      setProducts(updatedProducts);
  
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/Login');
      alert("You must be logged in to Order!");
      return;
    }

    if (totalAmount <= 0) {
      alert("You have no items in your shopping cart!");
      return;
    }

    navigate('/Shopping/Checkout', { state: { cart: products } });
  };

  return (
    <div>
      <div className="product-grid">
        {products.map(({ productID, productName, price, quantity }) => (
          <Product
            key={productID}
            id={productID}
            name={productName}
            price={parseFloat(price)}
            updateCart={updateCart}
            initialQuantity={quantity}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
      <div className="checkout-section">
        <p>Total Price: ${totalAmount.toFixed(2)}</p>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;