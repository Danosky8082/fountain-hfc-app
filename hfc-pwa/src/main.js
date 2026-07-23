import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/main.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

// ✅ Expose pinia to the window for debugging
window.__pinia = pinia;

app.mount('#app');