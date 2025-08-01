import { createRouter, createWebHistory } from 'vue-router'

// Importa las páginas que vayas creando
import HomePage from '../pages/HomePage.vue'
import ServicesPage from '../pages/ServicesPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import ApplyPage from '../pages/ApplyPage.vue'

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
        path: '/apply',
        name: 'Apply',
        component: ApplyPage
    },
    {
        path: '/profile/:id',
        name: 'Profile',
        component: ProfilePage,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory('/ServiApp/'),
    routes
})

export default router
