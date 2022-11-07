import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import 'mosha-vue-toastify/dist/style.css'

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(Toast, {});

app.mount('#app');

