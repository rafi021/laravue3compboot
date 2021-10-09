import { createRouter, createWebHistory} from "vue-router";

import PostIndex from '../components/ExampleComponent.vue'

const routes = [
    {
        path: '/home',
        name: 'posts.index',
        component: PostIndex
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
})
