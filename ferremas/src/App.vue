<template>
  <div id="app">
    <Navbar :is-logged-in="isLoggedIn" @logout="logout" />
    <router-view @login-success="handleLoginSuccess" />
    <Footer v-if="showFooter"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  computed: {
    showFooter() {
      // Devuelve false si la ruta actual es '/carrito' o '/pago', true de lo contrario
      const hiddenRoutes = ['/carrito', '/pago'];
      return !hiddenRoutes.includes(this.$route.path);
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true;
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.isLoggedIn = false;
      this.$router.push('/login');
      window.location.reload();
    }
  }
}
</script>


<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

Footer {
  flex-grow: 1; /* El footer rellena el fondo si falta contenido*/
}
</style>
