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
              <button class="btn btn-primary btn-sm">Ver perfil</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'

export default {
  components: { DefaultLayout },
  data() {
    return {
      profesionales: [
        { nombre: 'Ana Pérez', servicio: 'Electricista', rating: 5, foto: 'https://placehold.co/80' },
        { nombre: 'Pedro Martínez', servicio: 'Electricista', rating: 4, foto: 'https://placehold.co/80' },
        { nombre: 'Juan González', servicio: 'Electricista', rating: 3, foto: 'https://placehold.co/80' }
      ]
    }
  }
}
</script>
