import React, { useState, } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Specials from './pages/Specials'; 
import Shopping from './pages/Shopping';
import Checkout from './pages/Checkout';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './pages/Home';
import { getUser, setUser as setLocalStorageUser, removeUser } from './data/repositoryapi';
import Signup from "./pages/Signup";
import Review from "./pages/Review";
import Vreview from "./pages/Vreview";

function App() {
  const [user, setUser] = useState(getUser());

  const loginUser = (user) => {
    setUser(user);
  };
  // refresh localstorage with new user data
  const updateUser = (newUserData) => {
    setUser(newUserData);
    setLocalStorageUser(newUserData); 
  };

 // removes  - "loggedinuser"
 const logoutUser = () => {
  removeUser();
  setUser(null);
};

  return (
    <div>
      <Router>
        <Navbar user={user} logoutUser={logoutUser} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login loginUser={loginUser} />} />
          <Route path="/Profile" element={<Profile user={user} setUser={updateUser}/>} />
          <Route path="/Shopping" element={<Shopping user={user} />} />
          <Route path="/Shopping/Checkout" element={<Checkout/>} />
          <Route path="/Specials" element={<Specials/>} />
          <Route path="/Signup" element={<Signup loginUser={loginUser}/>} />
          <Route path="/Review" element={<Review user={user}/>} />
          <Route path="/VReview" element={<Vreview/>} />
        </Routes>
       
      </Router>
       <Footer />
    </div>
  );
}

export default App;
