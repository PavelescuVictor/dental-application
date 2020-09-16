<template>
    <div class="home">
        <Navbar :currentPage="currentPage" />
        <Banner />
        <ScrollTop />
        <Footer />
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import ScrollTop from "../components/ScrollTop.vue";
import Banner from "../components/Banner.vue";

export default {
    name: "Home",
    components: {
        Navbar,
        ScrollTop,
        Footer,
        Banner,
    },
    data() {
        return {
            currentPage: "home",
        };
    },
};
</script>

<style scoped>
</style>