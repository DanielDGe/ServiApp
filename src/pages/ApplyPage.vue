<template>
  <DefaultLayout>
    <div class="container py-5">
      <h1 class="mb-4">Aplicar como Profesional</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" v-model="form.nombre" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Teléfono</label>
          <input type="text" class="form-control" v-model="form.telefono" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Correo</label>
          <input type="email" class="form-control" v-model="form.email" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Profesión/Servicio</label>
          <input type="text" class="form-control" v-model="form.servicio" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Formación</label>
          <input type="text" class="form-control" v-model="form.formacion" />
        </div>
        <div class="mb-3">
          <label class="form-label">Zona</label>
          <input type="text" class="form-control" v-model="form.zona" />
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'

export default {
  components: { DefaultLayout },
  data() {
    return {
      form: {
        nombre: '',
        telefono: '',
        email: '',
        servicio: '',
        formacion: '',
        zona: ''
      }
    }
  },
  methods: {
    submitForm() {
      const stored = JSON.parse(localStorage.getItem('profesionales')) || []
      stored.push({
        nombre: this.form.nombre,
        servicio: this.form.servicio,
        rating: 0,
        foto: 'https://placehold.co/80',
        telefono: this.form.telefono,
        email: this.form.email,
        formacion: this.form.formacion,
        zona: this.form.zona
      })
      localStorage.setItem('profesionales', JSON.stringify(stored))
      this.$router.push('/')
    }
  }
}
</script>
