import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../data/repositoryapi.jsx';

const Summary = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const cartItems = location.state.cart;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        const allProducts = response.data;

        // Merge cart items with product details and filter out items with zero quantity
        const detailedCartItems = cartItems
          .map(item => {
            const productDetails = allProducts.find(p => p.productID === item.productID);
            return {
              ...item,
              productName: productDetails ? productDetails.productName : 'Unknown Product',
              price: productDetails ? productDetails.price : 0
            };
          })
          .filter(item => item.quantity > 0);  // Only include items with quantity > 0

        setProducts(detailedCartItems);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);  // Set to empty array on error to prevent render issues
      }
    };

    loadProducts();
  }, [cartItems]);  // Depend on cartItems to reload data when it changes

  // Calculate totals based on the filtered list of products
  const totalPrice = products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gst = totalPrice * 0.1;
  const totalCost = totalPrice + gst;

  return (
    <div className="summary">
      <h3>Here is a summary of your order:</h3>
      <div className="divider"></div>
      <ul>
        {products.map((item, index) => (
          <li key={index}>
            {item.quantity}x {item.productName} (${(item.price * item.quantity).toFixed(2)})
          </li>
        ))}
      </ul>
      <p><span className="summary-bold">Cost:</span> ${totalPrice.toFixed(2)}</p>
      <p><span className="summary-bold">Total GST:</span> ${gst.toFixed(2)}</p>
      <p><span className="summary-bold">Total Cost:</span> ${totalCost.toFixed(2)}</p>
    </div>
  );
};

export default Summary;