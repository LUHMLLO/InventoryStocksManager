import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/dashboard',
        alias: '/home',
        name: 'Dashboard',
        component: () => import('@/views/dashboard.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error404',
        component: () => import('@/views/Error404.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
