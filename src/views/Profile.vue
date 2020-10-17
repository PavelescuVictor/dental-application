<template>
    <div class="profile">
        <Navbar />
        <ProfileDashboard />
        <ScrollTop />
        <Footer />
    </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import ScrollTop from "../components/ScrollTop.vue";
import Footer from "../components/Footer.vue";
import ProfileDashboard from "../components/ProfileDashboard.vue";
import { mapGetters, mapActions } from "vuex";
export default {
    name: "Profile",
    components: {
        Navbar,
        Footer,
        ScrollTop,
        ProfileDashboard,
    },
    data() {
        return {};
    },
    mounted() {
        this.profile()
            .then((response) => {
                if (typeof response.data != "object") {
                    if (this.$route.params.nextUrl != null) {
                        this.$router.push(this.$route.params.nextUrl);
                    } else {
                        this.$router.push("/profile/add_profile");
                    }
                }
            })
            .catch((err) => {
                this.alertMessage = err;
            });
    },
    computed: {
        ...mapGetters(["user", "userProfile"]),
    },
    methods: {
        ...mapActions(["profile"]),
    },
};
</script>
<style scoped></style>
