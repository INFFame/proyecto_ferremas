<template>
    <div class="container w-75 my-5 bg-white rounded shadow-container">
        <div class="row align-items-stretch">
            <div class="col bg-login d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded-start m-2">
            </div>
            <div class="col py-5 p-lg-5 rounded-end">
                <div class="text-center">
                    <!-- SVG Logo here -->
                </div>
                <h2 class="fs-1 fw-bold text-center py-5">Bienvenido!</h2>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-4">
                        <label for="exampleInputEmail1" class="form-label">Usuario</label>
                        <input type="text" v-model="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-2">
                        <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                        <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
                    </div>
                    <div class="mb-5">
                        <span class="text-secondary">¿Olvidaste tu contraseña? <a href="" class="link-login">Recupérala aquí</a></span>
                    </div>
                    <br>
                    <br>
                    <div class="d-grid mb-3">
                        <button type="submit" @click="checkLogin" class="btn btn-danger">Iniciar sesión</button>
                    </div>
                    <div class="pb-lg-5 text-center">
                        <span class="text-secondary">¿No tienes una cuenta? <a href="" class="link-login">Regístrate</a></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'VistaLogin',
    data() {
        return {
            username: '',
            password: '',
            isLoggedIn: false
        };
    },
    created() {
        this.checkSession();
    },
    methods: {
        checkSession() {
    const token = localStorage.getItem('token');
    if (token !== null) {
        this.isLoggedIn = true;
    }
},

        async handleSubmit() {
            if (this.isLoggedIn) {
                alert('Debe cerrar sesión para continuar');
                return;
            }
            if (!this.username.length) {
                alert('Ingrese usuario');
                return;
            }
            if (!this.password.length) {
                alert('Ingrese contraseña');
                return;
            }

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/v1/token/login/', {
                    username: this.username,
                    password: this.password
                });
                console.log(response.data);
                localStorage.setItem('token', response.data.access); 
                localStorage.setItem('username', this.username);
                this.$emit('login-success');
                window.location.href = '/productos'
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
            }
        },
        checkLogin(event) {
            if (this.isLoggedIn) {
                event.preventDefault();
                alert('Debe cerrar sesión para continuar');
            }
        }
    }
}
</script>

<style>
.shadow-container {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.2);
    border: 1px solid #d1d1d1;
}

.logo-img-login {
    width: 10rem;
}

.bg-login {
    background-image: url(../assets/login-img.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.link-login {
    color: #A10828;
}
</style>
