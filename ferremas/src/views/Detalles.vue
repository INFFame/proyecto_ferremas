<template>
  <div class="container">
    <div class="row p-3 p-md-5 gap-5 m-3">
      <div class="col-12 col-lg-7 d-flex justify-content-start">
        <div>
          <img src="../assets/contenido-no-disponible.jpg" class="img-detalle img-fluid" alt="...">
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div v-if="producto">
          <p class="card-subtitle fs-5 fw-semibold text-muted">{{ producto.marca }}</p>
          <h1 class="fw-bolder">{{ producto.name }}</h1>
          <p class="text-muted" style="font-size: 12px;">Código del producto: {{ producto.codigo_producto }}</p>
          <div>
            <p class="m-0"><strong>Código:</strong> {{ producto.codigo }}</p>
            <p class="m-0"><strong>Categoría:</strong> {{ producto.categoria.name }}</p>
            <p><strong>Stock:</strong> {{ producto.stock }}</p>
          </div>
          <div class="col-4 col-md-3 col-lg-3">
            <p class="text-muted mb-1" style="font-size: 12px;">Cantidad:</p>
            <div class="input-group">
              <button class="btn btn-outline-secondary btn-sm" type="button" @click="decrementar">-</button>
              <input type="number" :step="step" :max="producto.stock" v-model="quantity" name="quantity"
                class="form-control form-control-sm text-center quantity-field" @input="validarCantidad"
                :disabled="producto.stock === 0">
              <button class="btn btn-outline-secondary btn-sm" type="button" @click="incrementar">+</button>
            </div>
            <p v-if="producto.stock === 0" class="text-danger" style="font-size: 14px;">sin stock</p>
          </div>
          <p class="card-text fs-2 fw-bold my-5">{{ formatoMoneda(producto.valorFinal) }}</p>
          <div class="d-grid">
            <button class="btn btn-dark mb-3" type="button" @click="agregarAlCarro"
              :disabled="producto.stock === 0">Añadir al carro</button>
          </div>
        </div>
        <div v-else>
          <p>Producto no encontrado</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetalleProducto',
  data() {
    return {
      producto: null,
      quantity: 1,
      step: 1
    };
  },
  created() {
    this.obtenerProducto();
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    obtenerProducto() {
      const productId = parseInt(this.$route.params.id);
      const productos = this.$store.getters.allProductos;

      if (productos.length === 0) {
        this.$store.dispatch('fetchProductos').then(() => {
          this.producto = this.$store.getters.allProductos.find(producto => producto.id === productId);
        });
      } else {
        this.producto = productos.find(producto => producto.id === productId);
      }
    },
    formatoMoneda(valor) {
      return valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
    },
    decrementar() {
      if (this.quantity > 1) {
        this.quantity -= this.step;
      }
    },
    incrementar() {
      if (this.quantity < this.producto.stock) {
        this.quantity += this.step;
      }
    },
    validarCantidad() {
      if (this.quantity < 1) {
        this.quantity = 1;
      } else if (this.quantity > this.producto.stock) {
        this.quantity = this.producto.stock;
      }
    },
    agregarAlCarro() {
      if (this.producto.stock > 0 && this.quantity > 0) {
        this.$store.dispatch('agregarProductoAlCarrito', { ...this.producto, cantidad: this.quantity });
        this.producto.stock -= this.quantity;
        this.quantity = 1;
      }
    },
  }
};
</script>

<style>
.quantity-field::-webkit-outer-spin-button,
.quantity-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-group .form-control {
  text-align: center;
  box-shadow: none;
}
</style>
