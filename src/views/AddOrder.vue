<template>
    <div class="add-order">
        <Navbar :currentPage="currentPage"/>
        <div class="content">
            <div class="content__banner">
                <div class="banner__overlay">
                </div>
            </div>
            <div class="content__add-order">
                <div class="form__wrapper">
                    <p>
                        Adaugare Lucrare.
                    </p>

                    <v-form class="form"
                        ref="form"
                        v-model="valid"
                        :lazy-validation="lazy"
                    >
                        <v-text-field
                            v-model="doctorFirstName"
                            :rules="rules.doctorFirstName"
                            label="Doctor's First Name"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="doctorLastName"
                            :rules="rules.doctorLastName"
                            label="Doctor's Last Name"
                            required
                        ></v-text-field>

                        <v-select
                            v-if="doctorSelected === true"
                            v-model="doctorSelected"
                            :items="doctorsList"
                            attach
                            chips
                            label="Chips"
                            multiple
                        ></v-select>

                        <v-text-field
                            v-model="pacientFirstName"
                            :rules="rules.pacientFirstName"
                            label="Pacient's First Name"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="pacientLastName"
                            :rules="rules.pacientLastName"
                            label="Pacient's Last Name"
                            required
                        ></v-text-field>

                        <v-select
                            v-if="pacientSelected === true"
                            v-model="pacientSelected"
                            :items="pacientsList"
                            attach
                            chips
                            label="Chips"
                            multiple
                        ></v-select>

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
        name: 'add-order',
        components: {
            Navbar,
            ScrollTop,
            Footer,
        },
        data: () => ({
            isLoggedIn: '',
            currentPage: 'add-order',
            valid: true,
            doctorFirstName: '',
            doctorLastName: '',
            pacientFirstName: '',
            pacientLastName: '',
            doctorSelected: false,
            pacientSelected: false,
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
                pacientFirstName: 
                    [
                        value => !!value || `First name is required.`,
                        value => /^[a-zA-Z]+$/.test(value) || 'First name must not contain digits.',
                    ],
                pacientLastName: 
                    [
                        value => !!value || `Last name is required.`,
                        value => /^[a-zA-Z]+$/.test(value) || 'Last name must not contain digits.',
                    ],
            },
            lazy: false,
            doctorsList: [
                {
                    firstName: 'a',
                    lastName: 'A',
                    toString: function () {
                        return `${this.lastName}  ${this.firstName}`
                    },
                },
                {
                    firstName: 'b',
                    lastName: 'B',
                    toString: function () {
                        return `${this.lastName}  ${this.firstName}`
                    },
                },
                {
                    firstName: 'c',
                    lastName: 'C',
                    toString: function () {
                        return `${this.lastName}  ${this.firstName}`
                    },
                },
                {
                    firstName: 'd',
                    lastName: 'D',
                    toString: function () {
                        return `${this.lastName}  ${this.firstName}`
                    },
                },
                {
                    firstName: 'e',
                    lastName: 'E',
                    toString: function () {
                        return `${this.lastName}  ${this.firstName}`
                    },
                }
            ],
            pacientsList:  [
                {
                    firstName: 'aa',
                    lastName: 'AA',
                    toString: function () {
                        return `${this.lastName}  ${this.firstName}`
                    },
                },
                {
                    firstName: 'bb',
                    lastName: 'BB',
                    toString: function () {
                        return `${this.lastName}  ${this.firstName}`
                    },
                },
                {
                    firstName: 'cc',
                    lastName: 'CC',
                    toString: function () {
                        return `${this.lastName}  ${this.firstName}`
                    },
                },
                {
                    firstName: 'dd',
                    lastName: 'DD',
                    toString: function () {
                        return `${this.lastName}  ${this.firstName}`
                    },
                },
                {
                    firstName: 'ee',
                    lastName: 'EE',
                    toString: function () {
                        return `${this.lastName}  ${this.firstName}`
                    },
                }
            ],
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
                    this.$router.push({name: 'orders'})
                }
            },

            reset () {
                this.$refs.form.reset();
            },

            updateValidDoctor: function() {
                let isValid = true;
                this.rules.doctorFirstName.forEach(value => {
                    if(value(this.doctorFirstName) != true){
                        isValid = false;
                    }
                })
                this.rules.doctorLastName.forEach(value => {
                    if(value(this.doctorLastName) != true){
                        isValid = false;
                    }
                })
                this.doctorSelected = isValid;
            },

            updateValidPacient: function() {
                let isValid = true;
                this.rules.pacientFirstName.forEach(value => {
                    if(value(this.pacientFirstName) != true){
                        isValid = false;
                    }
                })
                this.rules.pacientLastName.forEach(value => {
                    if(value(this.pacientLastName) != true){
                        isValid = false;
                    }
                })
                this.pacientSelected = isValid;
            },
        },
        watch: {
            doctorFirstName: function() {
                this.updateValidDoctor();
            },

            doctorLastName: function() {
                this.updateValidDoctor();
            },

            pacientFirstName: function() {
                this.updateValidPacient();
            },

            pacientLastName: function() {
                this.updateValidPacient();
            },
        },
    }
</script>
<style scoped>
    .add-order {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .content {
        min-height: 100vh;
        width: 100%;
        display: grid;
        grid-template-columns: auto minmax(400px, 50%);
    }

    .content__add-order {
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
