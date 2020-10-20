<template>
    <div class="login">
        <Navbar />
        <div class="login__content">
            <Alert :alert="alertMessage" />
            <div class="content__banner">
                <div class="banner__overlay">
                    <div class="overlay__color"></div>
                    <div class="overlay__image"></div>
                </div>
            </div>
            <div class="content__form">
                <div class="form__wrapper">
                    <p>Login into the application</p>
                    <v-form
                        class="form"
                        ref="form"
                        v-model="valid"
                        :lazy-validation="lazy"
                        @submit="handleSubmit"
                    >
                        <v-text-field
                            v-model="userEmail"
                            :rules="rules.email"
                            label="Enter email"
                            required
                        ></v-text-field>

                        <v-text-field
                            :rules="rules.password"
                            autocomplete="current-password"
                            :value="userPassword"
                            label="Enter password"
                            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="() => (value = !value)"
                            :type="value ? 'password' : 'text'"
                            @input="(_) => (userPassword = _)"
                            required
                        ></v-text-field>

                        <div class="form__buttons">
                            <v-btn
                                type="submit"
                                :disabled="!valid"
                                @click="handleSubmit"
                                >Submit</v-btn
                            >
                            <v-btn @click="reset">Reset Form</v-btn>
                        </div>
                    </v-form>
                </div>
            </div>
        </div>
        <ScrollTop />
        <Footer />
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import ScrollTop from "../components/ScrollTop.vue";
import Alert from "../components/Alert.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Login",

    components: {
        Navbar,
        ScrollTop,
        Footer,
        Alert,
    },

    data: () => ({
        valid: true,
        value: true,
        lazy: false,
        userEmail: "",
        userPassword: "",
        alertMessage: "",
        rules: {
            required: [(value) => !!value || "Required"],
            email: [
                (value) => !!value || "Email is required",
                (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
            ],
            password: [(value) => !!value || "Password is required"],
        },
    }),

    computed: {
        ...mapGetters(["isLoggedIn"]),
    },

    methods: {
        ...mapActions(["login"]),

        handleSubmit(e) {
            e.preventDefault();

            let email = this.userEmail;
            let password = this.userPassword;

            this.login({ email, password })
                .then(() => {
                    if (this.isLoggedIn) {
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

        reset() {
            this.$refs.form.reset();
        },
    },
};
</script>
<style scoped>
.login {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login__content {
    height: 100vh;
    width: 100%;
    display: grid;
    grid-template-columns: auto minmax(400px, 50%);
}

.content__form {
    height: 100%;
    padding: var(--padding-high);
    padding: calc(var(--navbar-height) + var(--padding-high))
        var(--padding-high) var(--padding-high) var(--padding-high);
}

.form__wrapper {
    height: 100%;
    display: grid;
    grid-template-rows: 1fr auto 1fr;
    padding: var(--padding-small) 0px;
}

.form__wrapper p {
    justify-self: center;
    align-self: center;
    font-size: 1.8rem;
    animation: form__wrapper__p__scale 0.5s ease-in-out forwards;
}

.form {
    width: 100%;
    display: grid;
    margin: auto;
    grid-template-rows: auto auto auto 1fr;
    align-content: space-between;
    animation: form__wrapper__form__width 0.5s ease-in-out forwards;
}

.form__buttons {
    justify-self: center;
}

.banner__overlay {
    height: 100%;
}

.overlay__color {
    position: absolute;
    height: 100%;
    width: 50%;
    left: -25%;
    right: 0px;
    background-color: rgba(var(--color-blue-rgb), 0.9);
    z-index: 1;
    animation: overlay__color__slide-right 0.7s ease-out forwards;
}

.overlay__image {
    position: absolute;
    height: 100%;
    width: 50%;
    left: -25%;
    right: 0px;
    opacity: 0%;
    background-image: var(--banner-background-image);
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: right;
    animation: overlay__image__slide-right 0.7s ease-out forwards,
        overlay__image__fade-in 0.7s ease-in-out forwards 0.2s;
}

@keyframes overlay__image__slide-right {
    from {
        left: -25%;
    }

    to {
        left: 0%;
    }
}

@keyframes overlay__image__fade-in {
    from {
        opacity: 0%;
    }

    to {
        opacity: 100%;
    }
}

@keyframes overlay__color__slide-right {
    from {
        left: -25%;
    }

    to {
        left: 0%;
    }
}

@keyframes form__wrapper__p__scale {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes form__wrapper__form__width {
    from {
        padding-top: calc(var(--padding-high) * 1);
    }

    to {
        padding-top: 0px;
    }
}
</style>
