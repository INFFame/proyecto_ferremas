<template>
  <div class="container-fluid p-0 m-0">
      <div class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active banner1">
            <img src="../assets/bannerInicio.jpg" class="d-block w-100" alt="...">
          </div>
        </div>
      </div>
    </div>

    <div class="container p-3 p-lg-5">
      <div class="p-4 shadow-4 rounded-3" style="background-color: transparent;">
        <h2 class="text-center mb-5">Nuestras marcas destacadas</h2>
        <hr>
        <div class="row align-items-center justify-content-center">
          <div class="col-6 col-md-4 col-lg-2 p-2 my-2 d-flex justify-content-center align-items-center">
            <img src="../assets/3mlogo.png" alt="" class="brand-image">
          </div>
          <div class="col-6 col-md-4 col-lg-2 p-2 my-2 d-flex justify-content-center align-items-center">
            <img src="../assets/bauker.png" alt="" class="brand-image2">
          </div>
          <div class="col-6 col-md-4 col-lg-2 p-2 my-2 d-flex justify-content-center align-items-center">
            <img src="../assets/stanleylogo.png" alt="" class="brand-image2">
          </div>
          <div class="col-6 col-md-4 col-lg-2 p-2 my-2 d-flex justify-content-center align-items-center">
            <img src="../assets/Samsunglogo.png" alt="" class="brand-image2">
          </div>
          <div class="col-6 col-md-4 col-lg-2 p-2 my-2 d-flex justify-content-center align-items-center">
            <img src="../assets/makitalogo.png" alt="" class="brand-image2">
          </div>
          <div class="col-6 col-md-4 col-lg-2 p-2 my-2 d-flex justify-content-center align-items-center">
            <img src="../assets/boschlogo.png" alt="" class="brand-image2">
          </div>
        </div>
        <hr>
      </div>
    </div>
</template>

<script>

export default {
  name: 'VistaInicio',
}
</script>

<style>
.carousel-inner {
  height: 50vh;
}

.banner1 img {
  height: 60vh;
  object-fit: cover;
  object-position: center center;
}

.brand-image {
  width: 60px;
  height: auto;
}

.brand-image2 {
  width: 100px;
  height: auto;
}
</style>
