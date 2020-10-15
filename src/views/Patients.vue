<template>
    <div class="patients">
        <Navbar />
        <PatientsDashboard />
        <ScrollTop />
        <Footer />
    </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import ScrollTop from "../components/ScrollTop.vue";
import Footer from "../components/Footer.vue";
import PatientsDashboard from "../components/PatientsDashboard.vue";

export default {
    name: "Patients",
    components: {
        Navbar,
        Footer,
        ScrollTop,
        PatientsDashboard,
    },
    data() {
        return {};
    },
};
</script>
<style scoped></style>
