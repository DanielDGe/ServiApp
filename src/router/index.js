import { createRouter, createWebHistory } from 'vue-router'

// Importa las páginas que vayas creando
import HomePage from '../pages/HomePage.vue'
import ServicesPage from '../pages/ServicesPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/services',
        name: 'Services',
        component: ServicesPage
    },
    {
        path: '/contact',
        name: 'Contact',
        component: ContactPage
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfilePage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
