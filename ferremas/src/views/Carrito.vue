<template>
  <div class="container p-3 p-lg-5">
    <h2 class="text-center m-0 mb-4 fs-1">Tu carrito de Compras</h2>
    <div class="table-responsive my-5" v-if="carrito.length > 0">
      <table class="table text-center">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Marca</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
            <th scope="col">Eliminar</th>
            <th scope="col">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in carrito" :key="producto.id" class="carrito-item">
            <td class="align-middle">{{ producto.name }}</td>
            <td class="align-middle">{{ producto.marca }}</td>
            <td class="align-middle">{{ producto.cantidad }}</td>
            <td class="align-middle">{{ formatoMoneda(producto.valorFinal) }}</td>
            <td class="align-middle">
              <i @click="eliminarDelCarro(producto.id)" class="bi bi-trash3 text-danger" style="cursor: pointer;"></i>
            </td>
            <td class="align-middle">{{ formatoMoneda(calcularSubtotal(producto)) }}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col" class="fs-5">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="fw-bold fs-5">{{ formatoMoneda(calcularTotal()) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="text-center">El carrito está vacío.</p>
    </div>
    <router-link to="/pago" class="text-decoration-none">
        <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn btn-danger my-5" type="button">Ir a pagar</button>
        </div>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'VistaCarrito',
  computed: {
    ...mapState(['carrito']),
  },
  methods: {
    ...mapMutations(['eliminarDelCarro']),
    formatoMoneda(valor) {
      return valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
    },
    calcularSubtotal(producto) {
      return producto.valorFinal * producto.cantidad;
    },
    calcularTotal() {
      return this.carrito.reduce((total, producto) => {
        return total + this.calcularSubtotal(producto);
      }, 0);
    },
  },
};
</script>

<style>
.carrito-item {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
</style>
