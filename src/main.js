import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Importa el tema Bootswatch Materia
import './assets/styles/bootstrap.min.css'
import 'bootstrap'

const app = createApp(App)

app.use(router)

app.mount('#app')