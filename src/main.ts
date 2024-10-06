import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import './style.sass'

createApp(App).use(createPinia()).mount("#app");
