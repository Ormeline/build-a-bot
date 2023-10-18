import { createApp } from 'vue';
import App from './App.vue';
import HomePage from './home/HomePage.vue';

const app = createApp(App);
app.component('HomePage', HomePage);
app.mount('#app');
