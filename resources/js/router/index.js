import { createRouter, createWebHistory} from "vue-router";

import PostIndex from '../pages/Posts/Index.vue'
import PostCreate from '../pages/Posts/Create.vue'
import PostEdit from '../pages/Posts/Edit.vue'

const routes = [
    { path: '/posts', name: 'posts.index', component: PostIndex },
    { path: '/posts/create', name: 'posts.create', component: PostCreate },
    { path: '/posts/:id/edit', name: 'posts.edit', component: PostEdit, props: true},
];

export default createRouter({
    history: createWebHistory(),
    routes
})
