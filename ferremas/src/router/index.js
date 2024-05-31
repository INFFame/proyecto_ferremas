import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Login from '../views/Login.vue'
import Bodega from '../views/Bodega.vue'
import Productos from '../views/Productos.vue'
import Detalles from '../views/Detalles.vue'
import Carrito from '../views/Carrito.vue'
import Pago from '../views/Pago'

const guard = function (to, from, next){
  if(localStorage.getItem('token')){
    next()
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    redirect: '/inicio',
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: Inicio,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/productos',
    name: 'Productos',
    component: Productos
  },
  {
    path: '/bodega',
    name: 'Bodega',
    component: Bodega,
    beforeEnter: guard
  },
  {
    path: '/detalles/:id',
    name: 'Detalles',
    component: Detalles
  },
  {
    path: '/carrito',
    name: 'Carrito',
    component: Carrito
  },
  {
    path: '/pago',
    name: 'Pago',
    component: Pago
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
