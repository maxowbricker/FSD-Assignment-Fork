import axios from "axios";


// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(email, password) {
    try {
      console.log(email)
      const response = await axios.get(API_HOST + "/api/users/login", { params: { email, password } });
      const user = response.data;
      setUser(user);
      console.log(user);
      return user;
      
    } catch (error) {
      // Handle error here (e.g., network error, server error)
      console.error("Error while verifying user:", error);
      return null; // Return null in case of error
    }
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);
  return response.data;
}


const handleApiSave = async (fields,email) => {

  try {
    const result = await axios.put(`http://localhost:4000/api/users/${email}`, fields);
    console.log(result);
    return result;
    
  } catch (e) {
    console.error(e)
  }
};

// --- Products/Specials ---------------------------------------------------------------------------------------
export const fetchProducts = () => axios.get(`${API_HOST}/api/products`);
export const fetchSpecials = () => axios.get(`${API_HOST}/api/specials`);

// --- Cart ---------------------------------------------------------------------------------------
export const updateCartProduct = async (email, productID, quantity) => {
  try {
    const response = await axios.put(`${API_HOST}/api/cart/${email}/product`, {
      productID,
      quantity
    });
    return response.data;
  } catch (error) {
    console.error("Error while updating cart:", error);
    throw error;
  }
};

export const getCart = async (email) => {
  try {
    const response = await axios.get(`${API_HOST}/api/cart/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching cart:", error);
    throw error;
  }
};

export const clearCart = async (email) => {
  try {
    axios.delete(`${API_HOST}/api/checkout/${email}`);
  } catch {
    console.error("Error while clearing the cart");
  }
  
}
// --- Post ---------------------------------------------------------------------------------------
 async function getPosts() {
  const response = await axios.get(API_HOST + "/api/review");

  return response.data;
}

async function createReview(review) {
  const response = await axios.post(API_HOST + "/api/review", review);

   return response.data;
 }

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser,setUser, createUser,
  getUser, removeUser, handleApiSave,createReview, getPosts }
