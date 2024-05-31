<template>
  <div class="container p-3 p-lg-5">
    <h1 class="text-center">Listado de Productos</h1>
    <div class="d-flex justify-content-end my-4 my-lg-5 gap-3">
      <div class="col-lg-4 mb-3">
        <select v-model="selectedOption" @change="cargarProductosSegunSeleccion" class="form-select">
          <option class="option-color" value="todos">Todos los productos</option>
          <option value="sinStock">Productos sin stock</option>
        </select>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Código Producto</th>
            <th>Código</th>
            <th>Categoría</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id" class="producto-row">
            <td>{{ producto.id }}</td>
            <td>{{ producto.name }}</td>
            <td>{{ producto.marca }}</td>
            <td>{{ producto.codigo_producto }}</td>
            <td>{{ producto.codigo }}</td>
            <td>{{ producto.categoria.name }}</td>
            <td :class="obtenerClaseStock(producto.stock)">{{ producto.stock }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VistaBodega',
  data() {
    return {
      productos: [],
      selectedOption: 'todos',
      apiUrls: {
        todos: 'http://127.0.0.1:8000/api/v1/erp/productos_no_disponibles_bodega/',
        sinStock: 'http://127.0.0.1:8000/api/v1/erp/productos_no_disponibles_bodega/sin_stock/'
      }
    };
  },
  methods: {
    async cargarProductos(apiUrl) {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        this.productos = data;
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    },
    cargarProductosSegunSeleccion() {
      const apiUrl = this.apiUrls[this.selectedOption];
      this.cargarProductos(apiUrl);
    },
    obtenerClaseStock(stock) {
      if (stock === 0) {
        return 'bg-danger text-white';
      } else if (stock < 10) {
        return 'bg-warning text-dark';
      } else {
        return 'bg-success text-white';
      }
    }
  },
  mounted() {
    this.cargarProductos(this.apiUrls.todos);
  }
};
</script>

<style scoped>
.bg-danger {
  background-color: red !important;
}
.bg-warning {
  background-color: yellow !important;
}
.bg-success {
  background-color: green !important;
}
.text-white {
  color: white !important;
}
.text-dark {
  color: black !important;
}
.producto-row {
  border-bottom: 1px solid #c0c0c0;
}
select:focus {
  box-shadow: none;
  border-color: #c0c0c0;
}

</style>