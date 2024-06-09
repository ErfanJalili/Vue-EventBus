import { createStore } from 'vuex';
import axios from 'axios'; // Import Axios

// Create an Axios instance with the base URL set to the environment variable
const apiClient = axios.create({
    baseURL: 'https://api.bashomal.simagar.com/api/v1/'
  // You can add additional configurations here if needed
});

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        // Use the apiClient for making requests
        const response = await apiClient.post('/users/token', { username, password });
        const token = response.data.token;
        commit('setToken', token);
        return response;
      } catch (error) {
        // Handle error
        console.error('Login failed', error);
        throw error; // Rethrow the error to be caught by the component
      }
    },
    logout({ commit }) {
      commit('clearToken');
    },
  },
});
