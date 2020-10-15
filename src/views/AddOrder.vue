<template>
    <div class="add-order">
        <Navbar :currentPage="currentPage" />
        <div class="add-order__content">
            <Alert :alert="alertMessage" />
            <div class="content__banner">
                <div class="banner__overlay">
                    <div class="overlay__color"></div>
                    <div class="overlay__image"></div>
                </div>
            </div>
            <div class="content__form">
                <div class="form__wrapper">
                    <p>
                        Adaugare Lucrare.
                    </p>

                    <v-form
                        class="form"
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
                            <v-btn :disabled="!valid" @click="handleSubmit">
                                Submit
                            </v-btn>

                            <v-btn @click="reset"> Reset Form </v-btn>
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

export default {
    name: "add-order",
    components: {
        Navbar,
        ScrollTop,
        Footer,
        Alert,
    },
    data: () => ({
        valid: true,
        doctorFirstName: "",
        doctorLastName: "",
        pacientFirstName: "",
        pacientLastName: "",
        doctorSelected: false,
        pacientSelected: false,
        rules: {
            required: [(value) => !!value || "Required"],
            doctorFirstName: [
                (value) => !!value || `First name is required.`,
                (value) =>
                    /^[a-zA-Z]+$/.test(value) ||
                    "First name must not contain digits.",
            ],
            doctorLastName: [
                (value) => !!value || `Last name is required.`,
                (value) =>
                    /^[a-zA-Z]+$/.test(value) ||
                    "Last name must not contain digits.",
            ],
            pacientFirstName: [
                (value) => !!value || `First name is required.`,
                (value) =>
                    /^[a-zA-Z]+$/.test(value) ||
                    "First name must not contain digits.",
            ],
            pacientLastName: [
                (value) => !!value || `Last name is required.`,
                (value) =>
                    /^[a-zA-Z]+$/.test(value) ||
                    "Last name must not contain digits.",
            ],
        },
        lazy: false,
        doctorsList: [
            {
                firstName: "a",
                lastName: "A",
                toString: function() {
                    return `${this.lastName}  ${this.firstName}`;
                },
            },
            {
                firstName: "b",
                lastName: "B",
                toString: function() {
                    return `${this.lastName}  ${this.firstName}`;
                },
            },
            {
                firstName: "c",
                lastName: "C",
                toString: function() {
                    return `${this.lastName}  ${this.firstName}`;
                },
            },
            {
                firstName: "d",
                lastName: "D",
                toString: function() {
                    return `${this.lastName}  ${this.firstName}`;
                },
            },
            {
                firstName: "e",
                lastName: "E",
                toString: function() {
                    return `${this.lastName}  ${this.firstName}`;
                },
            },
        ],
        pacientsList: [
            {
                firstName: "aa",
                lastName: "AA",
                toString: function() {
                    return `${this.lastName}  ${this.firstName}`;
                },
            },
            {
                firstName: "bb",
                lastName: "BB",
                toString: function() {
                    return `${this.lastName}  ${this.firstName}`;
                },
            },
            {
                firstName: "cc",
                lastName: "CC",
                toString: function() {
                    return `${this.lastName}  ${this.firstName}`;
                },
            },
            {
                firstName: "dd",
                lastName: "DD",
                toString: function() {
                    return `${this.lastName}  ${this.firstName}`;
                },
            },
            {
                firstName: "ee",
                lastName: "EE",
                toString: function() {
                    return `${this.lastName}  ${this.firstName}`;
                },
            },
        ],
        alertMessage: "",
    }),

    methods: {
        handleSubmit(e) {
            //this.$refs.form.validate();
            e.preventDefault();

            // Mimic succesfull authentication
            if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
            } else {
                this.$router.push({ name: "orders" });
            }
        },

        reset() {
            this.$refs.form.reset();
        },

        updateValidDoctor: function() {
            let isValid = true;
            this.rules.doctorFirstName.forEach((value) => {
                if (value(this.doctorFirstName) != true) {
                    isValid = false;
                }
            });
            this.rules.doctorLastName.forEach((value) => {
                if (value(this.doctorLastName) != true) {
                    isValid = false;
                }
            });
            this.doctorSelected = isValid;
        },

        updateValidPacient: function() {
            let isValid = true;
            this.rules.pacientFirstName.forEach((value) => {
                if (value(this.pacientFirstName) != true) {
                    isValid = false;
                }
            });
            this.rules.pacientLastName.forEach((value) => {
                if (value(this.pacientLastName) != true) {
                    isValid = false;
                }
            });
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
};
</script>
<style scoped>
.add-order {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.add-order__content {
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
