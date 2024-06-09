<template>
    <div>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await this.$store.dispatch('login', {
            username: this.username,
            password: this.password,
          });
          console.log('Login successful', response);
          // Redirect to another page or perform other actions after successful login
        } catch (error) {
          console.error('Login failed', error);
        }
      },
    },
  };
  </script>