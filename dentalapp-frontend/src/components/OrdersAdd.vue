<template>
    <div class="orderAdd">
        <Alert />
        <Confirmation />
        <v-app>
            <div class="content">
                <div class="form__wrapper" v-if="showAdd">
                    <p>
                        Adaugare Lucrare
                    </p>
                    <v-form
                        class="form"
                        ref="form"
                        v-model="valid"
                        :lazy-validation="lazy"
                        @submit="handleSubmit"
                    >
                        <v-text-field
                            v-model="doctor.firstName"
                            label="Doctor's First Name"
                            disabled
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="doctor.lastName"
                            label="Doctor's Last Name"
                            required
                            disabled
                        ></v-text-field>

                        <v-text-field
                            v-model="patient.firstName"
                            label="Pacient's First Name"
                            required
                            disabled
                        ></v-text-field>

                        <v-text-field
                            v-model="patient.lastName"
                            label="Pacient's Last Name"
                            disabled
                            required
                        ></v-text-field>

                        <v-container>
                            <div class="form__type-entry">
                                <v-row>
                                    <v-col>
                                        <v-select
                                            v-model="selectedType"
                                            :items="types"
                                            label="Type"
                                            item-text="type"
                                            item-value="type"
                                            return-object
                                            single-line
                                        ></v-select>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" md="3">
                                        <v-select
                                            v-model="selectedColor"
                                            :items="colors"
                                            label="Color"
                                            item-text="color"
                                            item-value="color"
                                            return-object
                                            single-line
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" md="3">
                                        <v-select
                                            v-model="selectedStatus"
                                            :items="status"
                                            label="Status"
                                            item-text="status"
                                            item-value="status"
                                            return-object
                                            single-line
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" md="2">
                                        <v-text-field
                                            v-model="unitCount"
                                            type="number"
                                            label="Unit Count"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2">
                                        <v-text-field
                                            v-model="warranty"
                                            type="number"
                                            label="Warranty"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="1">
                                        <v-checkbox
                                            v-model="paid"
                                            label="Paid"
                                        ></v-checkbox>
                                    </v-col>

                                    <v-col cols="12" md="1">
                                        <v-checkbox
                                            v-model="redo"
                                            label="Redo"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </div>
                            <v-row>
                                <div class="form__add-button">
                                    <button class="more-btn" type="reset">
                                        <a>Add another type</a>
                                    </button>
                                </div>
                            </v-row>
                        </v-container>

                        <div class="form__buttons">
                            <button
                                class="more-btn"
                                :disabled="!valid"
                                @click="handleSubmit"
                                type="submit"
                            >
                                <a>Submit</a>
                            </button>
                            <button
                                class="more-btn"
                                @click="handleReset"
                                type="reset"
                                :disabled="!empty"
                            >
                                <a>Reset Form</a>
                            </button>
                        </div>
                    </v-form>
                </div>
            </div>
        </v-app>
    </div>
</template>

<script>
import Alert from "../components/Alert.vue";
import Confirmation from "../components/Confirmation.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "add-order",

    components: {
        Alert,
        Confirmation,
    },

    data: () => ({
        showAdd: true,
        valid: true,
        empty: true,
        doctor: "",
        patient: "",
        types: [],
        colors: [],
        status: [],
        selectedType: {
            type: "type1",
        },
        selectedColor: {
            color: "color1",
        },
        selectedStatus: {
            status: "status1",
        },
        unitCount: 0,
        warranty: 0,
        redo: false,
        paid: false,
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
            patientFirstName: [
                (value) => !!value || `First name is required.`,
                (value) =>
                    /^[a-zA-Z]+$/.test(value) ||
                    "First name must not contain digits.",
            ],
            patientLastName: [
                (value) => !!value || `Last name is required.`,
                (value) =>
                    /^[a-zA-Z]+$/.test(value) ||
                    "Last name must not contain digits.",
            ],
        },
        lazy: false,
    }),

    /*
    mounted() {
        if (this.getSelectedOrder != "") {
            this.order = this.getSelectedOrder;
            this.alert = {
                type: "success",
                message: "Selected order received",
                time: 4000,
            };
            this.addAlert(this.alert);
            this.showDetails = true;
        } else {
            this.alert = {
                type: "alert",
                message: "No order selected",
                time: 4000,
            };
            this.addAlert(this.alert);
            this.showDetails = false;
        }
    },
    */

    mounted() {
        this.getData();
        let doctor = this.getSelectedDoctor;
        let patient = this.getSelectedPatient;
        this.showAdd = true;

        if (doctor !== "" && patient !== "") {
            this.doctor = this.getSelectedDoctor;
            this.patient = this.getSelectedPatient;
            this.getData();
        } else {
            if (doctor === "" && patient === "") {
                this.alert = {
                    type: "alert",
                    message: "No doctor and patient selected",
                    time: 4000,
                };
                this.addAlert(this.alert);
                this.showAdd = false;
            } else if (patient === "") {
                this.alert = {
                    type: "alert",
                    message: "No patient selected",
                    time: 4000,
                };
                this.addAlert(this.alert);
                this.showAdd = false;
            } else {
                this.alert = {
                    type: "alert",
                    message: "No doctor selected",
                    time: 4000,
                };
                this.addAlert(this.alert);
                this.showAdd = false;
            }
        }
        this.showAdd = true;
    },
    computed: {
        ...mapGetters([
            "getSelectedDoctor",
            "getSelectedPatient",
            "getOrderColorsList",
            "getOrderTypesList",
            "getOrderStatusList",
        ]),
    },

    methods: {
        ...mapActions([
            "addAlert",
            "addConfirmationMessage",
            "requestOrderColorsList",
            "requestOrderStatusList",
            "requestOrderTypesList",
        ]),

        handleSubmit(e) {
            e.preventDefault();
            console.log("submit");
        },

        handleReset() {
            this.$refs.form.reset();
            this.selectedType = {
                type: "type1",
            };
            this.selectedColor = {
                color: "color1",
            };
            this.selectedStatus = {
                status: "status1",
            };
        },

        getData: async function() {
            await this.requestOrderColorsList()
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.alert = {
                        type: type,
                        message: "Order Colors data received!",
                    };
                    this.addAlert(this.alert);
                    console.log(this.getOrderColorsList);
                    this.colors = this.getOrderColorsList;
                })
                .catch((error) => {
                    this.alert = {
                        type: "error",
                        message: error,
                    };
                    this.addAlert(this.alert);
                });

            await this.requestOrderStatusList()
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.newAlert = {
                        type: type,
                        message: "Order Status data received!",
                    };
                    this.addAlert(this.alert);
                    console.log(this.getOrderStatusList);
                    this.status = this.getOrderStatusList;
                })
                .catch((error) => {
                    this.alert = {
                        type: "error",
                        message: error,
                    };
                    this.addAlert(this.alert);
                });

            await this.requestOrderTypesList()
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.newAlert = {
                        type: type,
                        message: "Order Types data received!",
                    };
                    this.addAlert(this.alert);
                    console.log(this.getOrderTypesList);
                    this.types = this.getOrderTypesList;
                })
                .catch((error) => {
                    this.alert = {
                        type: "error",
                        message: error,
                    };
                    this.addAlert(this.alert);
                });
        },
    },

    watch: {},
};
</script>
<style scoped>
.content {
    position: relative;
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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
    line-height: 1.8rem;
    padding: var(--padding-small);
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

.form__type-entry {
    background: white;
}

.form__buttons {
    justify-self: center;
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
    margin: auto;
}

.form__add-button {
    margin: auto;
}

.more-btn {
    display: inline-block;
    width: 8.5em;
    font-size: calc(var(--text-base-size) * 1.2);
    background: -webkit-linear-gradient(
        -90deg,
        var(--color-white) 50%,
        var(--color-blue) 50%
    );
    background-size: 6.5em 6.5em;
    border: 3px solid var(--color-white);
    border-radius: 10px;
    margin: calc(var(--padding-small) / 2);
    transition: width 0.2s ease-in, border-radius 0.2s ease-out,
        background-position 0.6s ease, border-color 0s ease-in;
}

.more-btn:hover {
    width: 8.5em;
    background-position: 0px -70px;
    border-radius: var(--border-radius-circle);
    border-color: var(--color-blue);
}

.more-btn a {
    color: var(--color-blue);
    transition: color 0.2s ease-in;
}

.more-btn:hover > a {
    color: var(--color-white);
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
