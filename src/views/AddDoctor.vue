<template>
    <div class="add-doctor">
        <Navbar :currentPage="currentPage"/>
        <div class="content">
            <div class="content__banner">
                <div class="banner__overlay">
                </div>
            </div>
            <div class="content__add-doctor">
                <div class="form__wrapper">
                    <p>
                        Adaugare Doctor.
                    </p>

                    <v-form class="form"
                        ref="form"
                        v-model="valid"
                        :lazy-validation="lazy"
                    >
                        <v-text-field
                            v-model="doctorFirstName"
                            :rules="rules.doctorFirstName"
                            label="First Name"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="doctorLastName"
                            :rules="rules.doctorLastName"
                            label="Last Name"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="doctorPhone"
                            :rules="rules.doctorPhone"
                            label="Phone"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="doctorCabinet"
                            :rules="rules.doctorCabinet"
                            label="Cabinet"
                            required
                        ></v-text-field>

                        <div class="form__buttons">
                            <v-btn
                                :disabled="!valid"
                                @click="handleSubmit"
                            > Submit </v-btn>

                            <v-btn 
                                @click="reset"
                            > Reset Form </v-btn>
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

    export default {
        name: 'add-doctor',
        components: {
            Navbar,
            ScrollTop,
            Footer,
        },
        data: () => ({
            currentPage: 'add-doctor',
            valid: true,
            doctorFirstName: '',
            doctorLastName: '',
            doctorPhone: '',
            doctorCabinet: '',
            rules: {
                required: 
                    [
                        value => !!value || "Required",
                    ],
                doctorFirstName: 
                    [
                        value => !!value || `First name is required.`,
                        value => /^[a-zA-Z]+$/.test(value) || 'First name must not contain digits.',
                    ],
                doctorLastName: 
                    [
                        value => !!value || `Last name is required.`,
                        value => /^[a-zA-Z]+$/.test(value) || 'Last name must not contain digits.',
                    ],
                doctorPhone: 
                    [
                        value => !!value || `Phone number is required.`,
                        value => /^[\d]*$/.test(value) || 'Phone must only contain digits, whitespaces, dot or dashline.',
                    ],
                doctorCabinet: 
                    [
                        value => !!value || `Cabinet is required.`,
                    ],
            },
            lazy: false,
            }),

            methods: {
                handleSubmit(e) {
                    //this.$refs.form.validate();
                    e.preventDefault();

                    // Mimic succesfull authentication
                    if(this.$route.params.nextUrl != null){
                        this.$router.push(this.$route.params.nextUrl)
                    }
                    else {
                        this.$router.push({name: 'doctori'})
                    }
                },

                reset () {
                    this.$refs.form.reset();
                },
        },
    }
</script>
<style scoped>
    .add-doctor{
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

    .content__add-doctor {
        padding: var(--padding-high);
        padding: calc(var(--navbar-height) + var(--padding-high)) var(--padding-high) var(--padding-high) var(--padding-high);
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
        background-color: rgba(var(--color-blue-rgb), .7);
    }
</style>
