<template>
    <div class="ordersListAddDashboard">
        <div class="ordersListAddDashboard__content">
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
                                label="First Name"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="filteredInputDoctorLastName"
                                :rules="rules.doctorLastName"
                                label="Last Name"
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
            <div>
                <div class="more-btn" @click="addOrderRedirect">
                    <a>Adaugare Lucrare</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import OrdersListFilterDashboardNavbar from "../components/OrdersListFilterDashboardNavbar.vue";
import { mapGetters, mapActions } from "vuex";
export default {
    name: "OrderListAddDashboard",
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

    computed: {
        ...mapGetters([
            "doctorList",
            "filteredDoctorList",
            "patientList",
            "filteredPatientList",
            "getSelectedDoctor",
            "getSelectedPatient",
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

        showFilteredDoctors() {
            this.filterDoctorList({
                filteredInputFirstName: this.filteredInputDoctorFirstName,
                filteredInputLastName: this.filteredInputDoctorLastName,
            });
            this.filterDoctor = true;
        },

        showFilteredPatients() {
            this.filterPatientList({
                filteredInputFirstName: this.filteredInputPatientFirstName,
                filteredInputLastName: this.filteredInputPatientLastName,
            });
            this.filterPatient = true;
        },

        addOrderRedirect() {
            if (
                this.getSelectedDoctor != "" &&
                this.getSelectedPatient != null
            ) {
                if (this.$route.params.nextUrl != null) {
                    this.$router.push(this.$route.params.nextUrl);
                } else {
                    this.$router.push({ name: "addOrder" });
                }
            } else {
                this.alert = {
                    type: "info",
                    message: "Please select a doctor and a patient!",
                };
                this.addAlert(this.alert);
            }
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
                else {
                    this.filteredInputDoctorFirstName = "";
                    this.showFilteredDoctors();
                }
            }
        },

        filteredInputDoctorLastName: function() {
            if (this.filteredInputDoctorLastName.length >= 3)
                this.showFilteredDoctors();
            else {
                if (this.filteredInputDoctorFirstName.length < 3)
                    this.filterDoctor = false;
                else {
                    this.filteredInputDoctorLastName = "";
                    this.showFilteredDoctors();
                }
            }
        },

        filteredInputPatientFirstName: function() {
            if (this.filteredInputPatientFirstName.length >= 3)
                this.showFilteredPatients();
            else {
                if (this.filteredInputPatientLastName.length < 3)
                    this.filterPatient = false;
                else {
                    this.filteredInputPatientFirstName = "";
                    this.showFilteredPatients();
                }
            }
        },

        filteredInputPatientLastName: function() {
            if (this.filteredInputPatientLastName.length >= 3)
                this.showFilteredPatients();
            else {
                if (this.filteredInputPatientFirstName.length < 3)
                    this.filterPatient = false;
                else {
                    this.filteredInputPatientLastName = "";
                    this.showFilteredPatients();
                }
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
.ordersListAddDashboard {
    display: flex;
    position: relative;
    overflow: hidden;
    justify-content: center;
    background: var(--color-lightgrey-2);
    padding-top: 6px;
}

.ordersListAddDashboard__content {
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

.more-btn {
    display: inline-block;
    width: 8.5em;
    margin: auto;
    font-size: calc(var(--text-base-size) * 1.2);
    padding: 0.8em 0.5em;
    margin: 1em auto;
    background: -webkit-linear-gradient(
        -90deg,
        var(--color-white) 50%,
        var(--color-blue) 50%
    );
    background-size: 6.5em 6.5em;
    border: 3px solid var(--color-white);
    border-radius: 10px;
    transition: width 0.2s ease-in, border-radius 0.2s ease-out,
        background-position 0.6s ease, border-color 0s ease-in;
    animation: banner__text__button 1s;
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
