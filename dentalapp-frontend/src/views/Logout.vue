<template>
    <div class="logout"></div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "Logout",
    created() {
        this.logout()
            .then(() => {
                if (!this.isLoggedIn) {
                    this.$emit("loggedIn");
                    if (this.$route.params.nextUrl != null) {
                        this.$router.push(this.$route.params.nextUrl);
                    } else {
                        this.$router.push("home");
                    }
                }
            })
            .catch((err) => {
                this.alertMessage = err;
            });
    },
    computed: {
        ...mapGetters(["isLoggedIn"]),
    },
    methods: {
        ...mapActions(["logout"]),
    },
};
</script>
<style scoped></style>
