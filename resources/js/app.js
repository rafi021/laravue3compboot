require('./bootstrap');

import { createApp } from 'vue';
import router from './router/index'

import PostIndex from "./components/ExampleComponent.vue"

createApp({
    components: {
        PostIndex
    }
}).use(router).mount('#app');
