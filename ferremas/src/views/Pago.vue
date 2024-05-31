<template>
    <div class="container-fluid">
      <div class="container">
        <div class="pt-5">
          <h1 class="text-center mb-5">Página de Pago</h1>
          <p class="fs-5 fw-bolder text-secondary text-center mb-4">Seleccione su método de pago</p>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6">
            <Paypal />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Paypal from '../components/Paypal.vue';
  
  export default {
    name: 'VistaPago',
    components: {
      Paypal
    }
  }
  </script>
  
  <style>
  /* Puedes añadir estilos adicionales aquí si es necesario */
  </style>
  