// import './assets/main.css'
import './assets/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App)
  .use(store) // Use the store
  .mount('#app');