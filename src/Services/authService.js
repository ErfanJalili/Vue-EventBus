// src/services/authService.js
import apiClient from '../axios';

export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/login', {
      username,
      password,
    });
    const token = response.data.token;

    // Save the token in localStorage (or Vuex)
    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    throw error;
  }
};