// auth.js

// Function to retrieve the token from local storage
export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Function to set the token in local storage
  export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Function to remove the token from local storage
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  