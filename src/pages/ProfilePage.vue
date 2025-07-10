<template>
  <DefaultLayout>
    <div class="container py-5">
      <!-- Perfil -->
      <div class="text-center mb-4">
        <img
          :src="profile.foto || 'https://via.placeholder.com/100'"
          class="rounded-circle mb-3"
          width="120"
          height="120"
          alt="Foto de perfil"
        />
        <h3 class="mb-1">{{ profile.nombre }}</h3>
        <p class="text-muted mb-2">{{ profile.servicio }}</p>

        <!-- Botón agendar -->
        <button class="btn btn-primary">
          <i class="bi bi-calendar-check"></i> Agendar servicio
        </button>
      </div>

      <!-- Experiencia y formación -->
      <div class="row text-center mb-4">
        <div class="col-12 col-md-4 mb-2">
          <p><strong>Experiencia:</strong><br />{{ profile.experiencia }}</p>
        </div>
        <div class="col-12 col-md-4 mb-2">
          <p><strong>Formación:</strong><br />{{ profile.formacion }} <i class="bi bi-patch-check-fill text-primary"></i></p>
        </div>
        <div class="col-12 col-md-4 mb-2">
          <p><strong>Zona de trabajo:</strong><br />{{ profile.zona }}</p>
        </div>
      </div>

      <!-- Trabajos realizados -->
      <div class="mb-4">
        <h5 class="mb-3">Trabajos realizados</h5>
        <div class="row">
          <div class="col-6 col-md-3 mb-3" v-for="(img, i) in profile.trabajos" :key="i">
            <img
              :src="img || 'https://via.placeholder.com/150'"
              class="img-fluid rounded"
              alt="Trabajo realizado"
            />
          </div>
        </div>
      </div>

      <!-- Opiniones -->
      <div>
        <h5 class="mb-3">Opiniones</h5>
        <div v-for="(op, i) in profile.opiniones" :key="i" class="mb-3">
          <strong>{{ op.nombre }}</strong>
          <div>
            <i class="bi bi-star-fill text-warning" v-for="n in op.rating" :key="`full-${n}-${i}`"></i>
            <i class="bi bi-star" v-for="n in (5 - op.rating)" :key="`empty-${n}-${i}`"></i>
          </div>
          <p class="mb-0">{{ op.comentario }}</p>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-secondary">
          <i class="bi bi-arrow-left"></i> Regresar
        </button>
        <button class="btn btn-primary">
          <i class="bi bi-share-fill"></i> Compartir
        </button>
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
      profile: {
        nombre: 'Juan Pérez',
        servicio: 'Electricista',
        experiencia: '3 años',
        formacion: 'Curso de Electricidad - INADEH 2023',
        zona: 'Santiago',
        foto: 'https://placehold.co/100',
        trabajos: [
          'https://placehold.co/150',
          'https://placehold.co/150',
          'https://placehold.co/150',
          'https://placehold.co/150'
        ],
        opiniones: [
          {
            nombre: 'Maria Gomez',
            rating: 5,
            comentario: 'Realizó un trabajo excelente, muy recomendado 5 estrellas.'
          },
          {
            nombre: 'Joana Lopez',
            rating: 4,
            comentario: 'Realizó una buena instalación.'
          }
        ]
      }
    }
  }
}
</script>
