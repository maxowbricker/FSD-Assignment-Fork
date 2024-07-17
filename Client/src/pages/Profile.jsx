import React, { useState, useEffect } from "react";
import axios from "axios";
import {  handleApiSave } from "../data/repositoryapi";
import profilepic from "../images/profilepic.png";
import {  useNavigate } from "react-router-dom";

function Profile(props) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  //set initial props
  const [fields, setFields] = useState({
    fullname: props?.user?.fullname || "",
    email: props?.user?.email || "",
    password: "",
    createdAt: props?.user?.createdAt 
  });
  const [errors, setErrors] = useState({});

//update fields when props.user ccahnges
  useEffect(() => {
    setFields({
      fullname: props?.user?.fullname || "",
      email: props?.user?.email || "",
      password: "",
      createdAt: props?.user?.createdAt || ""
      
    });
  }, [props?.user]);

  const refreshUsers = async () => {
    setIsLoaded(false);

    // Using Axios with async.
    try {
      const result = await axios.get(`http://localhost:4000/api/users/${fields.email}`);
      console.log("this worked ",result.data);
      const user = result.data;
      props.setUser(user); // update user data props
    } catch(e) {
      // setError(e);
    } finally {
      setIsLoaded(true);
    }
  };

  const handleValidation = () => {
    const errorsToSet = {};

    // Name validation
    if (!fields.fullname) {
      errorsToSet.fullname = "Name cannot be empty.";
    }

    // Password validation
    if (isEditing && !fields.password) {
      errorsToSet.password = "Password cannot be empty.";
    }

    setErrors(errorsToSet); // set validation to errors
    // reutrn true if if no error
    return Object.keys(errorsToSet).length === 0;
  };

  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };
// handle save func
  const handleSave = async (event) => {
    event.preventDefault();
    if (!handleValidation()) return;

    try { 
      // will save via API
    const result = await handleApiSave(fields,props?.user?.email)
      console.log(result);
      setIsEditing(false);
      // call user refresh props to reflect changes 
      refreshUsers();
    } catch (e) {
      setErrors({ errorMessage: e.message });
    }
  };
    // edit func
  const handleEdit = () => {
    setIsEditing(true); // enter edit 
  };
// Function to handle user deletion
  const handleDelete = async () => {
    try {
      console.log(props?.user?.email);
      const result = await axios.delete(`http://localhost:4000/api/users/${fields.email}`); // DELETES USER VIA API
      // console log for testing purpases 
      console.log("deleted user : " , result.data);
      // will refresh props then navigate back to signup
      await refreshUsers();
    } catch (e) {
      setErrors({ errorMessage: e.message });
    } finally{
      navigate('/Signup');
      alert("delete succesfull, please make another account to log in or contact admin")
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <h1>Profile</h1>
        <div className="profile-img">
          <img className="profilepic" src={profilepic} alt="profilepic" />
        </div>
        <div className="profile-info">
          {isEditing ? (
            <>
              <div className="profile-edit">
                <strong>Name:</strong>
                <input type="text" name="fullname" value={fields.fullname} onChange={handleInputChange}
                />
                {errors.fullname && (
                  <span className="text-danger">{errors.fullname}</span>
                )}
              </div>
              <div className="profile-edit">
                <strong>Password:</strong>
                <input type="password"name="password" value={fields.password}onChange={handleInputChange} />
                {errors.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </div>
              <div className="profile-edit">
                <strong>Email:</strong>
                <input type="email" name="email" value={fields.email} onChange={handleInputChange} readOnly  />
              </div>
              <div className="profile-actions">
                <button className="profile-action-edit" onClick={handleSave}> Save  </button>
                <button className="profile-action-delete" onClick={handleCancel}> Cancel </button>
              </div>
              {errors.errorMessage && (
                <div className="form-group">
                  <span className="text-danger">{errors.errorMessage}</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="profile-view">
                <strong>Name: {props?.user?.fullname}</strong>
              </div>
              <div className="profile-view">
                <h4><strong>Hello {props?.user?.email}!</strong></h4>
              </div>
              <div className="profile-actions">
                <button className="profile-action-edit" onClick={handleEdit}> Edit </button>
                <button className="profile-action-delete" onClick={handleDelete}>Delete Account </button>
              </div>
            </>
          )}
        </div>
        <div class="profile-date">
    <strong>Date Created:</strong> {props?.user?.createdAt}
  </div>
      </div>
    </div>
  );
}

export default Profile;
