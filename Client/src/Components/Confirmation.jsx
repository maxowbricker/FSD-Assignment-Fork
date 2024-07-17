/* 
This Component is displayed after the user has input
their card details and shows a confirmation that the order has gone through
*/
import React from "react";
import Summary from "../Components/Summary";

const Confirmation = ({ cart }) => {
  const fullName = localStorage.getItem('loggedinuser_fullname');

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-text">Thank you, {fullName}, your order is confirmed!</h1>
      <p className="confirmation-text">Come in anytime in the next week to pick up your order!</p>
      <Summary cart={cart} />
    </div>
  );
};

export default Confirmation;
