import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  const isLoggedIn = props.user !== null;

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">SOIL</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/Specials">Specials</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Shopping">Shopping</Link>
        </li>
        {!isLoggedIn && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/Signup">Sign up</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <li className="nav-item">
            <Link className="nav-link" to="/profile">My Profile</Link>
          </li>
        )}
      </ul>
      <ul className="navbar-nav">
        {isLoggedIn && (
          <>
            <li className="nav-item">
              <span className="nav-link text-light">Welcome, {props.user.email}</span>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={props.logoutUser}>Logout</Link>
              <Link className="nav-link" to="/Review">Create review</Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>

          </li>
        )}
      </ul>
    </nav>
  );
}  
export default Navbar;