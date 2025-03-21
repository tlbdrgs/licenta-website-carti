import axios from 'axios';

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/users/register', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Failed to register user.");
  }
};

export const loginUser = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/login',
      { username, password},
      { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Failed to log in.");
    }
  };

  export const sendForgotPasswordRequest = async (email) => {
    const response = await axios.post('http://localhost:8080/api/v1/users/forgot-password', { email });
    return response.data;
  };

  export const resetPassword = async (newPassword, token) => {
    const response = await axios.post('http://localhost:8080/api/v1/users/reset-password', {token, newPassword})
    return response.data;
  }