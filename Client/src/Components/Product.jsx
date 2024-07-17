import React, { useState } from 'react';
import carrotImage from "../images/carrots.png";
import radishImage from "../images/radish.png";
import cucumberImage from "../images/cucumbers.png";
import beetrootImage from "../images/beetroot.png";
import turnipsImage from "../images/turnips.png";
import beansImage from "../images/beans.png";
import spinachImage from "../images/spinach.png";
import rocketImage from "../images/rocket.png";
import bokChoyImage from "../images/bok-choy.png";
import lettuceImage from "../images/lettuce.png";
import zucchiniImage from "../images/zucchini.png";
import broccoliImage from "../images/brocoli.png";
import snowPeasImage from "../images/snow-peas.png";
import greenOnionsImage from "../images/green-onions.png";
import kaleImage from "../images/kale.png";
import bananasImage from "../images/bananas.png";
import applesImage from "../images/apples.png";
import tomatoesImage from "../images/tomatoes.png";

const Product = ({ id, name, price, updateCart, initialQuantity = 0, isLoggedIn }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleAddToCart = () => {
    if (!isLoggedIn()) { // Checks if the user is logged in
      alert("You must be logged in to modify the cart.");
      return;
    }
    const newQuantity = quantity + 1;
    updateCart(id, newQuantity);
    setQuantity(newQuantity);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      if (!isLoggedIn()) { // Checks if the user is logged in
        alert("You must be logged in to modify the cart.");
        return;
      }
      const newQuantity = quantity - 1;
      updateCart(id, newQuantity);
      setQuantity(newQuantity);
    }
  };

  // Stores which images are for what Product Name
  const imageMap = {
    'Carrots': carrotImage,
    'Radish': radishImage,
    'Cucumbers': cucumberImage,
    'Beetroot': beetrootImage,
    'Turnips': turnipsImage,
    'Beans': beansImage,
    'Spinach': spinachImage,
    'Rocket': rocketImage,
    'Bok Choy': bokChoyImage,
    'Lettuce': lettuceImage,
    'Zucchini': zucchiniImage,
    'Broccoli': broccoliImage,
    'Snow Peas': snowPeasImage,
    'Green Onions': greenOnionsImage,
    'Kale': kaleImage,
    'Tomatoes': tomatoesImage,
    'Apples': applesImage,
    'Bananas': bananasImage,
  };

  const image = imageMap[name];

  return (
    <div className="product">
      <img src={image} alt={name} />
      <p>{name}</p>
      <p>${price.toFixed(2)}/each</p>
      <div>
        <button onClick={handleRemoveFromCart} disabled={quantity <= 0}>-</button>
        <span>{quantity}</span>
        <button onClick={handleAddToCart}>+</button>
      </div>
    </div>
  );
};

export default Product;