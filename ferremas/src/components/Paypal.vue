<template>
    <div>
        <div id="btns-paypal"></div>
    </div>
</template>

<script>
import { loadScript } from "@paypal/paypal-js";
import { apiCreateOrderPaypal, apiOnApprovePaypal } from "../services/apiPayPal";

export default {
    name: 'PaypalButtonComponent',
    data() {
        return {
            paypal: null
        };
    },
    methods: {
        async initializePaypal() {
            try {
                this.paypal = await loadScript({ clientId: "test" });
                console.log("PayPal JS SDK loaded successfully");
            } catch (error) {
                console.error("Error al cargar PayPal JS SDK script", error);
                return;
            }

            if (this.paypal) {
                try {
                    await this.paypal.Buttons({
                        async createOrder() {
                            try {
                                console.log("Creating order...");
                                const idOrder = await apiCreateOrderPaypal();
                                console.log("Order created with ID:", idOrder);
                                return idOrder;
                            } catch (error) {
                                console.error("Error al crear la orden", error);
                                throw error;
                            }
                        },
                        async onApprove(data) {
                            try {
                                console.log("Order approved, capturing...", data.orderID);
                                const details = await apiOnApprovePaypal(data.orderID);
                                console.log("Order captured:", details);
                                console.log(details);
                            } catch (error) {
                                console.error("Error al capturar la orden", error);
                            }
                        }
                    }).render("#btns-paypal");
                    console.log("PayPal buttons rendered successfully");
                } catch (error) {
                    console.error("Error al mostrar los botones", error);
                }
            }
        }
    },
    mounted() {
        this.initializePaypal();
    }
};
</script>
