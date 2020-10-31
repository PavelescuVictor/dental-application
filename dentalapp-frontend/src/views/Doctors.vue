<template>
    <div class="doctors">
        <Navbar />
        <DoctorsDashboard />
        <ScrollTop />
        <Footer />
    </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import ScrollTop from "../components/ScrollTop.vue";
import Footer from "../components/Footer.vue";
import DoctorsDashboard from "../components/DoctorsDashboard.vue";

export default {
    name: "Doctors",
    components: {
        Navbar,
        Footer,
        ScrollTop,
        DoctorsDashboard,
    },
    data() {
        return {};
    },
};
</script>
<style scoped></style>
