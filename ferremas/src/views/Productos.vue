<template>
  <div class="container-fluid p-0 m-0">
    <div class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active banner1">
          <img src="../assets/bannerProductos.jpg" class="d-block w-100" alt="...">
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row justify-content-start mt-5">
      <div class="col-6 col-md-6 col-lg-3 mb-4" v-for="producto in productos" :key="producto.id">
        <router-link :to="{ name: 'Detalles', params: { id: producto.id } }" class="card w-100 text-decoration-none text-dark">
          <img src="../assets/contenido-no-disponible.jpg" class="card-img-top" alt="...">
          <div class="card-body m-0">
            <h6 class="card-subtitle text-muted fw-bolder">{{ producto.marca }}</h6>
            <p class="my-3 fs-4 fw-bolder">{{ producto.name }}</p>
            <p class="codigo mt-2 mb-0"><strong>Cod:</strong> {{ producto.codigo_producto }}</p>
            <p class="stock"><strong>Stock:</strong> {{ producto.stock }}</p>
            <p class="card-text fs-4 fw-bold mb-0">{{ formatoMoneda(producto.valorFinal) }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "VistaProductos",
  computed: {
    ...mapGetters(['allProductos']),
    productos() {
      return this.allProductos;
    }
  },
  methods: {
    formatoMoneda(valor) {
      return valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
    },
  },
  created() {
    this.$store.dispatch('fetchProductos');
  }
}
</script>

<style scoped>
.carousel-inner {
  height: 50vh;
}

.banner1 img {
  height: 60vh;
  object-fit: cover;
  object-position: center center;
}

.custom-button {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background-color: #A10828;
  border-color: #A10828;
}

.custom-button:hover {
  color: #A10828;
  background-color: #ffffff;
  border-color: #A10828;
}

.card {
  margin: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  width: 100%;
  height: auto;
}

.codigo,
.stock {
  font-size: 14px;
}
</style>
