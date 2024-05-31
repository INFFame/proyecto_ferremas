import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    productos: [],
    carrito: []
  },
  mutations: {
    SET_PRODUCTOS(state, productos) {
      state.productos = productos;
    },
    AGREGAR_AL_CARRITO(state, producto) {
      const productoEnCarrito = state.carrito.find(item => item.id === producto.id);
      if (productoEnCarrito) {
        productoEnCarrito.cantidad += producto.cantidad;
      } else {
        state.carrito.push(producto);
      }
    }
  },
  actions: {
    async fetchProductos({ commit }) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/erp/productos/');
        commit('SET_PRODUCTOS', response.data);
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    },
    agregarProductoAlCarrito({ commit }, producto) {
      commit('AGREGAR_AL_CARRITO', producto);
    }
  },
  getters: {
    allProductos: (state) => state.productos,
    carrito: (state) => state.carrito
  }
});
