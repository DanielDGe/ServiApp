<template>
  <DefaultLayout>
    <div class="container py-5">
      <!-- Título -->
      <h2 class="mb-3">¿Qué necesitas hoy?</h2>
      <p class="text-muted">Una iniciativa de apoyo comunitario</p>

      <!-- Buscador -->
      <div class="row mb-4">
        <div class="col-md-8">
          <input type="text" class="form-control" placeholder="Buscar servicio...">
        </div>
        <div class="col-md-2">
          <button class="btn btn-secondary w-100">
            <i class="bi bi-funnel"></i> Filtros
          </button>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary w-100">
            <i class="bi bi-search"></i> Buscar
          </button>
        </div>
      </div>

      <!-- Resultados -->
      <div class="row">
        <div class="col-md-4 mb-3" v-for="(prof, index) in profesionales" :key="index">
          <div class="card">
            <div class="card-body text-center">
              <img :src="prof.foto" class="rounded-circle mb-2" width="80" height="80" />
              <h5 class="card-title mb-1">{{ prof.nombre }}</h5>
              <p class="text-muted">{{ prof.servicio }}</p>
              <!-- Estrellas -->
              <div class="mb-2">
                <i class="bi bi-star-fill text-warning" v-for="n in prof.rating" :key="n"></i>
                <i class="bi bi-star" v-for="n in (5 - prof.rating)" :key="n"></i>
              </div>
              <router-link :to="{ name: 'Profile', params: { id: index } }" class="btn btn-primary btn-sm">
                Ver perfil
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { defaultProfessionals } from '../data/professionals'

export default {
  components: { DefaultLayout },
  data() {
    const defaultProfiles = defaultProfessionals

    let stored = JSON.parse(localStorage.getItem('profesionales'))
    if (!stored) {
      localStorage.setItem('profesionales', JSON.stringify(defaultProfiles))
      stored = defaultProfiles
    }

    return {
      profesionales: stored
    }
  }
}
</script>
