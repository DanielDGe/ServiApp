<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content bg-white p-4 rounded">
      <h5 class="mb-3">Escoge donde compartir</h5>
      <div class="d-flex justify-content-around mb-4">
        <i class="bi bi-facebook fs-1 text-primary"></i>
        <i class="bi bi-twitter fs-1 text-info"></i>
        <i class="bi bi-whatsapp fs-1 text-success"></i>
        <i class="bi bi-instagram fs-1 text-danger"></i>
      </div>
      <div class="text-end">
        <button class="btn btn-primary me-2" @click="close">Aceptar</button>
        <button class="btn btn-secondary" @click="close">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}
.modal-content {
  max-width: 300px;
}
</style>
