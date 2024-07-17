// The Finance Component holds manages the credit card input and validation on /Checkout
import React, { useState } from "react";

const Finance = ({ onFinalizeCheckout }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFinalizeCheckout = () => {
    // Check if the card number is valid using the Luhn algorithm
    if (!isValidCardNumber(cardNumber)) {
      setErrorMessage("Invalid credit card number");
      return;
    }

    // Check if the name on the card contains at least two alphabetical characters
    if (!isValidCardName(cardName)) {
      setErrorMessage("Invalid name on card");
      return;
    }

    // Check if the expiration date is in MM/YY format
    if (!isValidExpirationDate(expirationDate)) {
      setErrorMessage("Invalid expiration date format (MM/YY)");
      return;
    }

    // Check if the CVV is valid (assuming 3 or 4 digits)
    if (!isValidCVV(securityCode)) {
      setErrorMessage("Invalid CVV");
      return;
    }

    // If all validations pass, call the onFinalizeCheckout function with the form data
    const formData = {
      cardNumber,
      cardName,
      expirationDate,
      securityCode
    };
    onFinalizeCheckout(formData);
  };

  // Format credit card number with spaces every four digits
  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, "")
      .match(/.{1,4}/g)
      ?.join(" ")
      .substr(0, 19) || "";
  };

  // Function to validate the expiration date format (MM/YY) and ensure it's not expired
  const isValidExpirationDate = (expirationDate) => {
    // Check if the format is MM/YY
    if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
      return false;
    }

    // Extract the month and year from the expiration date
    const [inputMonth, inputYear] = expirationDate.split('/').map(Number);

    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so we add 1
    const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year

    // Check if the month is valid (between 1 and 12)
    if (inputMonth < 1 || inputMonth > 12) {
      return false;
    }

    // Check if the year is valid (between current year and next 10 years)
    if (inputYear < currentYear || inputYear > currentYear + 10) {
      return false;
    }

    // Check if the expiration date is in the future
    if (inputYear === currentYear && inputMonth < currentMonth) {
      return false; // Expiration date is in the past
    }

    return true;
  };

  // Function to validate the name on the card (at least two alphabetical characters)
  const isValidCardName = (cardName) => {
    return /^[a-zA-Z\s]{2,}$/.test(cardName);
  };


  // Format expiration date with a '/' between month and year
  const formatExpirationDate = (value) => {
    if (value.length === 3 && value.charAt(2) !== '/') {
      return value.substring(0, 2) + '/' + value.charAt(2);
    }
    return value;
  };

  // Luhn algorithm for credit card number validation
  const isValidCardNumber = (number) => {
    // Check for card number
    if (!cardNumber) {
      return false;
    }
    let sum = 0;
    let double = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i), 10);
      if (double) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      double = !double;
    }
    return sum % 10 === 0;
  };

  // CVV validation (assuming 3 or 4 digits)
  const isValidCVV = (cvv) => {
    const cvvRegex = /^[0-9]{3,4}$/;
    return cvvRegex.test(cvv);
  };

  return (
    <div>
      <h2>Checkout with Card!</h2>
      <div className="divider">
      </div>
      <form className="checkout-form">
        <div>
          <label htmlFor="cardNumber">Card Number: </label>
          <input
            type="text"
            id="cardNumber"
            value={formatCardNumber(cardNumber)}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
          />
        </div>
        <div>
          <label htmlFor="cardName">Name on Card: </label>
          <input
            type="text"
            id="cardName"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="expirationDate">Expiration Date (MM/YY): </label>
          <input
            type="text"
            id="expirationDate"
            value={formatExpirationDate(expirationDate)}
            onChange={(e) => setExpirationDate(e.target.value.replace(/[^\d/]/g, ''))}
          />
        </div>
        <div>
          <label htmlFor="securityCode">Security Code: </label>
          <input
            type="text"
            id="securityCode"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value.replace(/\D/g, ''))}
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button className="product" type="button" onClick={handleFinalizeCheckout}>
          Finalise Checkout
        </button>
      </form>
    </div>
  );
};

export default Finance;