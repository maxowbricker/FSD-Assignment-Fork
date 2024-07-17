import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { validate } from "../data/Validation";
import { verifyUser } from "../data/repositoryapi";

const Signup = (props) => {
    const navigate = useNavigate();
    const { state } = useLocation();

    // state used to manage fields 
    const [fields, setFields] = useState({
        email: state ? state.email : "",
        password_hash: state ? state.password_hash : "",
        fullname: state ? state.fullname : "",
        confirmPassword: "",
    });

    // states used to manage errors 
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fullnameError, setFullnameError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    
    
 // Function to handle input changes
    const handleInputChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    };
    // Function to handle form validation
    const handleValidation = () => {
        const errors = validate(fields);
        setEmailError(errors.email || '');
        setPasswordError(errors.password || '');
        setFullnameError(errors.fullname || '');

        // Check if password and confirm password match
        if (fields.password !== fields.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match please try again!!';
        }
        setConfirmPasswordError(errors.confirmPassword || '');

        // Return true if there are no errors
        return Object.keys(errors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!handleValidation()) return; // calling validation for fields 

        try {
            // POSTING request to create  USERS DB
            
            await axios.post("http://localhost:4000/api/users", fields);
            // repeat login 
            const user = await verifyUser(fields.email, fields.password);

            // If user not verified 
            if(user === null) {
              // Login failed, reset password field to blank and set error message.
              setFields({ ...fields, password: "" });
              // then set to blank 
              return;
            }
              props.loginUser(user);
              // Navigate to the home page.
              localStorage.setItem('email',user.email)
              navigate("/Profile");
        
            alert("User created and logged in successfully");
        } catch (e) {
            setGeneralError("Failed to create user: " + e.message); // Set general error message
        } 
    };

    return (
        <>
            <div className="signup-login-wrap">
                <div className="signup-login-container">
                    <div className="divider">
                        <h1 className="signup-h1">Signup Now</h1>
                        <h2>Let's create your account</h2>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Login Details</label>
                                <br />
                                <div className="width">
                                    <input type="text" name="email" placeholder="Email Address" value={fields.email} onChange={handleInputChange}/>
                                    {emailError && <div className="errormsg">{emailError}</div>}
                                </div>
                         </div>
                            <div>
                                <input type="password" name="password" placeholder="Password" value={fields.password} onChange={handleInputChange}/>
                                {passwordError && <div className="errormsg">{passwordError}</div>}
                            </div>
                            <div>
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={fields.confirmPassword} onChange={handleInputChange} />
                                {confirmPasswordError && <div className="errormsg">{confirmPasswordError}</div>}
                            </div>
                            <div>
                                <input type="text" name="fullname"placeholder="Full name"value={fields.fullname} onChange={handleInputChange}/>
                                {fullnameError && <div className="errormsg">{fullnameError}</div>}
                            </div>
                            <Link to="/login">
                                <h6 className="login-here">Already have an account? Login here</h6>
                            </Link>
                            <button className="signup-login-button" type="submit">Submit</button>
                            {generalError && <div className="errormsg">{generalError}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;