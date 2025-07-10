<template>
  <DefaultLayout>
    <div class="container py-5">
      <h1 class="mb-4">Aplicar como Profesional</h1>
      <form @submit.prevent="submitForm" novalidate>
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" v-model="form.nombre" />
          <div v-if="errors.nombre" class="form-text text-danger">{{ errors.nombre }}</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Teléfono</label>
          <input type="text" class="form-control" v-model="form.telefono" />
          <div v-if="errors.telefono" class="form-text text-danger">{{ errors.telefono }}</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Correo</label>
          <input type="email" class="form-control" v-model="form.email" />
          <div v-if="errors.email" class="form-text text-danger">{{ errors.email }}</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Profesión/Servicio</label>
          <input type="text" class="form-control" v-model="form.servicio" />
          <div v-if="errors.servicio" class="form-text text-danger">{{ errors.servicio }}</div>
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
import { defaultProfessionals } from '../data/professionals'

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
      },
      errors: {}
    }
  },
  methods: {
    submitForm() {
      this.errors = {}
      if (!this.form.nombre.trim()) {
        this.errors.nombre = 'Nombre requerido'
      }
      if (!/^\d{7,}$/.test(this.form.telefono)) {
        this.errors.telefono = 'Teléfono inválido'
      }
      const emailRegex = /.+@.+\..+/
      if (!emailRegex.test(this.form.email)) {
        this.errors.email = 'Correo inválido'
      }
      if (!this.form.servicio.trim()) {
        this.errors.servicio = 'Servicio requerido'
      }

      if (Object.keys(this.errors).length) {
        return
      }

      let stored = JSON.parse(localStorage.getItem('profesionales'))
      if (!stored) {
        stored = [...defaultProfessionals]
      }

      stored.push({
        nombre: this.form.nombre,
        servicio: this.form.servicio,
        rating: 0,
        foto: 'https://placehold.co/100',
        telefono: this.form.telefono,
        email: this.form.email,
        formacion: this.form.formacion,
        zona: this.form.zona,
        experiencia: '',
        trabajos: [],
        opiniones: []
      })
      localStorage.setItem('profesionales', JSON.stringify(stored))
      this.$router.push('/')
    }
  }
}
</script>
