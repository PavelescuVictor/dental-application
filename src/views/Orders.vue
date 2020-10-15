<template>
    <div class="orders">
        <Navbar />
        <OrdersDashboard />
        <ScrollTop />
        <Footer />
    </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import ScrollTop from "../components/ScrollTop.vue";
import Footer from "../components/Footer.vue";
import OrdersDashboard from "../components/OrdersDashboard.vue";

export default {
    name: "Orders",
    components: {
        Navbar,
        Footer,
        ScrollTop,
        OrdersDashboard,
    },
    data() {
        return {};
    },
};
</script>
<style scoped></style>
