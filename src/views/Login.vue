<template>
    <div class="login">
        <Navbar :currentPage="currentPage" />
        <div class="content">
            <div class="content__banner">
                <div class="banner__overlay"></div>
            </div>
            <div class="content__login">
                <div class="form__wrapper">
                    <p>Login into the application.</p>

                    <v-form
                        class="form"
                        ref="form"
                        v-model="valid"
                        :lazy-validation="lazy"
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
                            <v-btn :disabled="!valid" @click="handleSubmit"
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
import axios from "axios";

export default {
    name: "Login",

    components: {
        Navbar,
        ScrollTop,
        Footer,
    },

    data: () => ({
        isLoggedIn: "",
        currentPage: "login",
        valid: true,
        value: true,
        userEmail: "",
        userPassword: "",
        rules: {
            required: [(value) => !!value || "Required"],
            email: [
                (value) => !!value || "Email is required",
                (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
            ],
            password: [(value) => !!value || "Password is required"],
        },
        lazy: false,
    }),

    methods: {
        handleSubmit(e) {
            //this.$refs.form.validate();
            e.preventDefault();
            let url = "http://127.0.0.1:8000/users/auth/login";
            let data = JSON.stringify({
                email: this.userEmail,
                password: this.userPassword,
            });
            axios
                .post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log(response);
                    const token = response.data.token;
                    const user = response.data.user;
                    console.log(token);
                    console.log(user);
                    localStorage.setItem("userToken", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    if (localStorage.getItem("userToken") != null) {
                        this.$emit("loggedIn");
                        if (this.$route.params.nextUrl != null) {
                            this.$router.push(this.$route.params.nextUrl);
                        } else {
                            this.$router.push("home");
                        }
                    }
                })
                .catch(function(error) {
                    console.log("Error: " + error);
                    localStorage.removeItem("user-token"); // if the request fails, remove any possible user token if possible
                });
            // Mimic succesfull authentication
            /*
                    let is_admin = true;
                    if(this.$route.params.nextUrl != null){
                        this.$router.push(this.$route.params.nextUrl)
                    }
                    else {
                        if(is_admin == true){
                            this.$router.push('doctori')
                            .catch(error => {
                                console.info(error.message)
                            })
                        }
                        else {
                            this.$router.push('home')
                            .catch(error => {
                                console.info(error.message)
                            })
                        }
                    }
                    */
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

.content {
    height: 100vh;
    width: 100%;
    display: grid;
    grid-template-columns: auto minmax(400px, 50%);
}

.content__login {
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
}

.form {
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    align-content: space-between;
}

.form__buttons {
    justify-self: center;
}

.content__banner {
    background-image: var(--banner-background-image);
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: right;
}

.banner__overlay {
    height: 100%;
    background-color: rgba(var(--color-blue-rgb), 0.7);
}
</style>
