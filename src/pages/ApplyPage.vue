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
          <input
            class="form-control"
            list="professionList"
            v-model="form.servicioSelect"
            @change="onProfessionChange"
            placeholder="Seleccione una profesión"
          />
          <datalist id="professionList">
            <option v-for="p in professionOptions" :key="p">{{ p }}</option>
          </datalist>
          <input
            v-if="form.servicioSelect === 'Otra'"
            type="text"
            class="form-control mt-2"
            v-model="form.servicio"
            placeholder="Especifique su profesión"
          />
          <div v-if="errors.servicio" class="form-text text-danger">{{ errors.servicio }}</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Formación</label>
          <input type="text" class="form-control" v-model="form.formacion" />
        </div>
        <div class="mb-3">
          <label class="form-label">Provincia</label>
          <select class="form-select" v-model="form.provincia">
            <option value="">Seleccione</option>
            <option v-for="(d, p) in locationData" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Distrito</label>
          <select class="form-select" v-model="form.distrito" :disabled="!districts.length">
            <option value="">Seleccione</option>
            <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Corregimiento</label>
          <select class="form-select" v-model="form.corregimiento" :disabled="!corregimientos.length">
            <option value="">Seleccione</option>
            <option v-for="c in corregimientos" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Certificados/Títulos</label>
          <input type="file" class="form-control" @change="onCertChange" multiple accept="image/*" />
        </div>
        <div class="mb-3">
          <label class="form-label">Fotos de trabajos</label>
          <input type="file" class="form-control" @change="onWorkChange" multiple accept="image/*" />
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { defaultProfessionals } from '../data/professionals'
import { professions } from '../data/professions'
import { locations } from '../data/locations'

export default {
  components: { DefaultLayout },
  data() {
    return {
      form: {
        nombre: '',
        telefono: '',
        email: '',
        servicio: '',
        servicioSelect: '',
        formacion: '',
        provincia: '',
        distrito: '',
        corregimiento: '',
        certificados: [],
        trabajos: []
      },
      districts: [],
      corregimientos: [],
      errors: {},
      professionOptions: professions,
      locationData: locations
    }
  },
  watch: {
    'form.provincia'(val) {
      this.form.distrito = ''
      this.form.corregimiento = ''
      this.districts = val ? Object.keys(this.locationData[val] || {}) : []
      this.corregimientos = []
    },
    'form.distrito'(val) {
      this.form.corregimiento = ''
      const prov = this.form.provincia
      this.corregimientos = prov && val ? this.locationData[prov][val] || [] : []
    }
  },
 methods: {
    onProfessionChange() {
      if (this.form.servicioSelect !== 'Otra') {
        this.form.servicio = this.form.servicioSelect
      } else {
        this.form.servicio = ''
      }
    },
    onCertChange(e) {
      const files = Array.from(e.target.files)
      files.forEach(f => {
        const reader = new FileReader()
        reader.onload = ev => this.form.certificados.push(ev.target.result)
        reader.readAsDataURL(f)
      })
      e.target.value = ''
    },
    onWorkChange(e) {
      const files = Array.from(e.target.files)
      files.forEach(f => {
        const reader = new FileReader()
        reader.onload = ev => this.form.trabajos.push(ev.target.result)
        reader.readAsDataURL(f)
      })
      e.target.value = ''
    },
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
      if (!this.form.servicioSelect) {
        this.errors.servicio = 'Servicio requerido'
      } else if (this.form.servicioSelect === 'Otra' && !this.form.servicio.trim()) {
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
        servicio: this.form.servicioSelect === 'Otra' ? this.form.servicio : this.form.servicioSelect,
        rating: 0,
        foto: 'https://placehold.co/100',
        telefono: this.form.telefono,
        email: this.form.email,
        formacion: this.form.formacion,
        zona: `${this.form.provincia}, ${this.form.distrito}, ${this.form.corregimiento}`,
        experiencia: '',
        trabajos: this.form.trabajos,
        certificados: this.form.certificados,
        opiniones: []
      })
      localStorage.setItem('profesionales', JSON.stringify(stored))
      this.$router.push('/')
    }
  }
}
</script>
