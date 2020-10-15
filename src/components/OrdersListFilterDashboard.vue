<template>
    <div class="ordersListFilterDashboard">
        <div class="ordersListFilterDashboard__content">
            <OrdersListFilterDashboardNavbar
                @updatePage="changeDisplayedPage"
            />
            <div class="content__wrapper">
                <div
                    class="doctor"
                    v-bind:class="{ notDisplayedPage: !isDoctorActive }"
                >
                    <div class="form__wrapper">
                        <p>Doctor</p>

                        <v-form class="form" ref="form" :lazy-validation="lazy">
                            <v-text-field
                                v-model="filteredInputDoctorFirstName"
                                :rules="rules.doctorFirstName"
                                label="Nume"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="filteredInputDoctorLastName"
                                :rules="rules.doctorLastName"
                                label="Prenume"
                                required
                            ></v-text-field>
                        </v-form>
                    </div>
                </div>
                <div
                    class="patient"
                    v-bind:class="{ notDisplayedPage: !isPatientActive }"
                >
                    <div class="form__wrapper">
                        <p>Pacient</p>

                        <v-form class="form" ref="form" :lazy-validation="lazy">
                            <v-text-field
                                v-model="filteredInputPatientFirstName"
                                :rules="rules.doctorFirstName"
                                label="Nume"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="filteredInputPatientLastName"
                                :rules="rules.doctorLastName"
                                label="Prenume"
                                required
                            ></v-text-field>
                        </v-form>
                    </div>
                </div>
            </div>
            <div
                class="doctorList"
                v-bind:class="{ notDisplayedPage: !isDoctorListActive }"
            >
                <template>
                    <v-data-table
                        v-model="selectedDoctor"
                        :headers="doctorHeaders"
                        :items="doctors"
                        item-key="id"
                        hide-default-footer
                        :single-select="singleSelect"
                        show-select
                    >
                    </v-data-table>
                </template>
            </div>
            <div
                class="patientList"
                v-bind:class="{ notDisplayedPage: !isPatientListActive }"
            >
                <template>
                    <v-data-table
                        v-model="selectedPatient"
                        :headers="patientHeaders"
                        :items="patients"
                        item-key="id"
                        hide-default-footer
                        :single-select="singleSelect"
                        show-select
                    >
                    </v-data-table>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import OrdersListFilterDashboardNavbar from "../components/OrdersListFilterDashboardNavbar.vue";
import { mapGetters, mapActions } from "vuex";
export default {
    name: "OrderListFilterDashboard",
    components: {
        OrdersListFilterDashboardNavbar,
    },
    data() {
        return {
            showedPage: "doctor",
            isDoctorActive: true,
            isDoctorListActive: false,
            isPatientActive: false,
            isPatientListActive: false,
            filterDoctor: false,
            filterPatient: false,
            selectedDoctor: [],
            selectedPatient: [],
            filteredInputDoctorFirstName: "",
            filteredInputDoctorLastName: "",
            filteredInputPatientFirstName: "",
            filteredInputPatientLastName: "",
            singleSelect: true,
            rules: {},
            /*rules: {
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
            doctorPhone: [
                (value) => !!value || `Phone number is required.`,
                (value) =>
                    /^[\d]*$/.test(value) ||
                    "Phone must only contain digits, whitespaces, dot or dashline.",
            ],
            doctorCabinet: [(value) => !!value || `Cabinet is required.`],
        },
        */
            alert: {
                type: "",
                message: "",
                time: 0,
            },
            doctorHeaders: [
                {
                    text: "Id",
                    align: "end",
                    sortable: true,
                    value: "id",
                },
                {
                    text: "First Name",
                    align: "end",
                    sortable: true,
                    value: "firstName",
                },
                {
                    text: "Last Name",
                    align: "end",
                    sortable: true,
                    value: "lastName",
                },
                {
                    text: "Cabinet",
                    align: "end",
                    sortable: true,
                    value: "cabinet",
                },
                {
                    text: "Phone",
                    align: "end",
                    sortable: true,
                    value: "phone",
                },
                {
                    text: "Created By",
                    align: "end",
                    sortable: true,
                    value: "createdBy",
                },
                {
                    text: "Created At",
                    align: "end",
                    sortable: true,
                    value: "createdAt",
                },
                {
                    text: "Updated By",
                    align: "end",
                    sortable: true,
                    value: "updatedBy",
                },
                {
                    text: "Updated At",
                    align: "end",
                    sortable: true,
                    value: "updatedAt",
                },
            ],
            patientHeaders: [
                {
                    text: "Id",
                    align: "end",
                    sortable: true,
                    value: "id",
                },
                {
                    text: "First Name",
                    align: "end",
                    sortable: true,
                    value: "firstName",
                },
                {
                    text: "Last Name",
                    align: "end",
                    sortable: true,
                    value: "lastName",
                },
                {
                    text: "Phone",
                    align: "end",
                    sortable: true,
                    value: "phone",
                },
                {
                    text: "Details",
                    align: "end",
                    sortable: true,
                    value: "details",
                },
                {
                    text: "Created By",
                    align: "end",
                    sortable: true,
                    value: "createdBy",
                },
                {
                    text: "Created At",
                    align: "end",
                    sortable: true,
                    value: "createdAt",
                },
                {
                    text: "Updated By",
                    align: "end",
                    sortable: true,
                    value: "updatedBy",
                },
                {
                    text: "Updated At",
                    align: "end",
                    sortable: true,
                    value: "updatedAt",
                },
            ],
            lazy: false,
        };
    },
    mounted: function() {
        this.getDoctors();
        this.getPatients();
    },

    computed: {
        ...mapGetters([
            "doctorList",
            "filteredDoctorList",
            "patientList",
            "filteredPatientList",
        ]),

        doctors: function() {
            return this.filterDoctor === true
                ? this.filteredDoctorList
                : this.doctorList;
        },

        patients: function() {
            return this.filterPatient === true
                ? this.filteredPatientList
                : this.patientList;
        },
    },

    methods: {
        ...mapActions([
            "requestDoctorList",
            "requestPatientList",
            "filterDoctorList",
            "filterPatientList",
            "setSelectedDoctor",
            "setSelectedPatient",
            "addAlert",
            "addConfirmationMessage",
        ]),

        changeDisplayedPage(e) {
            this.showedPage = e;
        },

        getDoctors: function() {
            this.requestDoctorList()
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.alert = {
                        type: type,
                        message: "Doctors data received!",
                        time: 4000,
                    };
                    this.addAlert(this.alert);
                })
                .catch((error) => {
                    this.alert = {
                        type: "error",
                        message: error,
                        time: 4000,
                    };
                    this.addAlert(this.alert);
                });
        },

        getPatients: function() {
            this.requestPatientList()
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.alert = {
                        type: type,
                        message: "Patients data received!",
                        time: 4000,
                    };
                    this.addAlert(this.alert);
                })
                .catch((error) => {
                    this.alert = {
                        type: "error",
                        message: error,
                        time: 4000,
                    };
                    this.addAlert(this.alert);
                });
        },

        showFilteredDoctors() {
            this.filterDoctorList({
                filteredInputFirstName: this.filteredInputDoctorFirstName,
                filteredInputLastName: this.filteredInputDoctorLastName,
            });
            this.filterDoctor = true;
        },

        showFilteredPatients() {
            this.filterPatientList({
                filteredInputFirstName: this.filteredInputDoctorFirstName,
                filteredInputLastName: this.filteredInputDoctorLastName,
            });
            this.filterPatient = true;
        },
    },
    watch: {
        showedPage: function(val) {
            if (val === "doctor") {
                this.isDoctorActive = true;
                this.isPatientActive = false;
            } else if (val === "patient") {
                this.isDoctorActive = false;
                this.isPatientActive = true;
            }
        },

        filteredInputDoctorFirstName: function() {
            if (this.filteredInputDoctorFirstName.length >= 3)
                this.showFilteredDoctors();
            else {
                if (this.filteredInputDoctorLastName.length < 3)
                    this.filterDoctor = false;
            }
        },

        filteredInputDoctorLastName: function() {
            if (this.filteredInputDoctorLastName.length >= 3)
                this.showFilteredDoctors();
            else {
                if (this.filteredInputDoctorFirstName.length < 3)
                    this.filterDoctor = false;
            }
        },

        filteredInputPatientFirstName: function() {
            if (this.filteredInputPatientFirstName.length >= 3)
                this.showFilteredPatients();
            else {
                if (this.filteredInputPatientLastName.length < 3)
                    this.filterPatient = false;
            }
        },

        filteredInputPatientLastName: function() {
            if (this.filteredInputPatientLastName.length >= 3)
                this.showFilteredPatients();
            else {
                if (this.filteredInputPatientFirstName.length < 3)
                    this.filterPatient = false;
            }
        },

        filterDoctor: function() {
            this.isDoctorListActive = this.filterDoctor;
        },

        filterPatient: function() {
            this.isPatientListActive = this.filterPatient;
        },

        selectedDoctor: function() {
            this.setSelectedDoctor(this.selectedDoctor);
        },

        selectedPatient: function() {
            this.setSelectedPatient(this.selectedPatient);
        },
    },
};
</script>
<style scoped>
.ordersListFilterDashboard {
    display: flex;
    position: relative;
    overflow: hidden;
    justify-content: center;
    background: var(--color-lightgrey-2);
    padding-top: 6px;
}

.ordersListFilterDashboard__content {
    z-index: 2;
    width: 0%;
    height: fit-content;
    display: grid;
    grid-template-rows: auto 1fr;
    padding: var(--padding-1);
    background: var(--color-lightgrey-2);
    overflow: hidden;
    animation: ordersDashboard__expand 0.4s ease-in forwards;
}

.content__wrapper {
    border-bottom-left-radius: var(--border-radius-1);
    border-bottom-right-radius: var(--border-radius-1);
    overflow: hidden;
}

.doctor {
    height: 100%;
    width: 50%;
    margin: auto;
}

.patient {
    height: 100%;
    width: 50%;
    margin: auto;
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
    color: var(--color-darkblue);
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

/* UTILITY CLASSES */

.notDisplayedPage {
    display: none;
}

/* ANIMATIONS*/

@keyframes content__overlay__slide-up {
    from {
        top: 0%;
    }

    to {
        top: -100%;
    }
}

@keyframes content__overlay__fade-out {
    0% {
        opacity: 100%;
    }

    100% {
        opacity: 0%;
    }
}

@keyframes content__overlay__slide-right {
    from {
        right: 0%;
    }

    to {
        right: -100%;
    }
}

@keyframes content__overlay__slide-left {
    from {
        left: 0%;
    }

    to {
        left: -100%;
    }
}

@keyframes ordersDashboard__expand {
    from {
        width: 0%;
    }

    to {
        width: 100%;
    }
}
</style>
