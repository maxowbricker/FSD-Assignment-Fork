import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { verifyUser } from "../data/repositoryapi";

function Login(props) {
  const [fields, setFields] = useState({ email: "", password: ""});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Generic change handler.
  const handleInputChange = (event) => {
    //update fields with new value
    setFields({ ...fields, [event.target.name]: event.target.value });
  }
// submit button handller
  const handleSubmit = async (event) => {
    event.preventDefault();
    //verify user login
    const user = await verifyUser(fields.email, fields.password);

    // If user not verified 
    if(user === null) {
      // Login failed, reset password field to blank and set error message.
      setFields({ ...fields, password: "" });
      setErrorMessage("Username and / or password invalid, please try again.");
      // then set to blank 
      return;
    }
    // Login successful, call loginUser function from props
      props.loginUser(user);
      // Navigate to the home page.
      localStorage.setItem('email',user.email)
      //navigates back to profile 
      navigate("/Profile");

      alert("login succesful")
      
      return;
    }

  return (
    <div className="signup-login-wrap">
      <div className="signup-login-container">
        <h1>Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="divider"></div>
            <div>
              <label htmlFor="email" className="control-label">Email</label>
              <input name="email" id="email"
                value={fields.email} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="password" className="control-label">Password</label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} />
            </div>
                   <Link to="/Signup">
                    <h6>Dont have a account? Sign up here</h6>
                    </Link>
            <div>
              <button  className="login-button" type="submit" value="Login">Login</button>
            </div>
            {errorMessage !== null &&
              <div>
                <span className="errormsg">{errorMessage}</span>
              </div>
            }
          </form>
        </div>
      </div>
  );
}

export default Login;
