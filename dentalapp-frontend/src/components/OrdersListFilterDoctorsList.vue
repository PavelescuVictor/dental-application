<template>
    <div class="ordersListFilterDoctorsList">
        <div class="form__wrapper">
            <p>Doctor</p>

            <v-form
                class="form"
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
                @submit="handleSubmit"
            >
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

        <div class="doctorSelectedList" v-if="getIsSelectedDoctor">
            <v-toolbar id="toolbar">
                <v-toolbar-title>Doctor Selectat</v-toolbar-title>
            </v-toolbar>
            <template>
                <v-data-table
                    v-model="selectedDoctor"
                    :headers="headers"
                    :items="[getSelectedDoctor]"
                    item-key="id"
                    hide-default-footer
                    :single-select="singleSelect"
                    show-select
                    class="table"
                >
                </v-data-table>
            </template>
        </div>

        <div
            class="doctorList"
            v-if="!getIsSelectedDoctor && isDoctorListActive"
        >
            <v-toolbar id="toolbar">
                <v-toolbar-title>Doctori</v-toolbar-title>
            </v-toolbar>
            <template>
                <v-data-table
                    v-model="selectedDoctor"
                    :headers="headers"
                    :items="doctors"
                    item-key="id"
                    hide-default-footer
                    :single-select="singleSelect"
                    show-select
                    class="table"
                >
                </v-data-table>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "OrdersListFilterDoctorsList",

    data() {
        return {
            minCharactersNumber: 3,
            filteredInputDoctorFirstName: "",
            filteredInputDoctorLastName: "",
            isDoctorListActive: false,
            selectedDoctor: [],
            filterDoctor: false,
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
            singleSelect: true,
            valid: true,
            empty: true,
            lazy: false,
            alert: {
                type: "",
                message: "",
                time: 0,
            },
            headers: [
                {
                    text: "Id",
                    align: "start",
                    sortable: true,
                    value: "id",
                },
                {
                    text: "First Name",
                    align: "start",
                    sortable: true,
                    value: "firstName",
                },
                {
                    text: "Last Name",
                    align: "start",
                    sortable: true,
                    value: "lastName",
                },
                {
                    text: "Cabinet",
                    align: "start",
                    sortable: true,
                    value: "cabinet",
                },
                {
                    text: "Phone",
                    align: "start",
                    sortable: true,
                    value: "phone",
                },
            ],
        };
    },

    mounted() {
        if (this.getIsSelectedDoctor === true) {
            this.selectedDoctor = [this.getSelectedDoctor];
            this.isDoctorListActive = false;
        }
    },

    computed: {
        ...mapGetters([
            "doctorList",
            "filteredDoctorList",
            "getIsSelectedDoctor",
            "getSelectedDoctor",
        ]),

        doctors: function() {
            return this.filterDoctor === true
                ? this.filteredDoctorList
                : this.doctorList;
        },
    },

    methods: {
        ...mapActions([
            "filterDoctorList",
            "setSelectedDoctor",
            "removeSelectedDoctor",
            "addAlert",
            "addConfirmationMessage",
        ]),

        handleSubmit(e) {
            e.preventDefault();
            this.showFilteredDoctors();
        },

        handleReset() {
            this.filteredInputDoctorFirstName = "";
            this.filteredInputDoctorLastName = "";
            this.filterDoctor = false;
        },

        showFilteredDoctors() {
            this.removeSelectedDoctor();
            this.selectedDoctor = [];
            this.filterDoctor = false;
            if (
                this.filteredInputDoctorFirstName.length >=
                    this.minCharactersNumber ||
                this.filteredInputDoctorLastName.length >=
                    this.minCharactersNumber
            ) {
                this.filterDoctorList({
                    filteredInputFirstName: this.filteredInputDoctorFirstName,
                    filteredInputLastName: this.filteredInputDoctorLastName,
                });

                this.filterDoctor = true;
            } else {
                console.log("da");
                if (this.filteredInputDoctorFirstName > 0) {
                    let alert = {
                        type: "info",
                        message: `Doctor's first name needs to be at least ${this.minCharactersNumber} characters!`,
                    };
                    this.addAlert(alert);
                } else if (this.filteredInputDoctorLastName > 0) {
                    let alert = {
                        type: "info",
                        message: `Doctor's last name needs to be at least ${this.minCharactersNumber} characters!`,
                    };
                    this.addAlert(alert);
                } else {
                    let alert = {
                        type: "info",
                        message: `Doctor's first name and last name needs to be at least ${this.minCharactersNumber} characters!`,
                    };
                    this.addAlert(alert);
                }
            }
        },
    },

    watch: {
        selectedDoctor: function() {
            if (this.selectedDoctor.length != 0)
                this.setSelectedDoctor(this.selectedDoctor[0]);
            else this.removeSelectedDoctor();
        },

        filterDoctor: function() {
            this.isDoctorListActive = this.filterDoctor;
        },
    },
};
</script>

<style scoped>
.ordersListFilterDoctorsList {
    height: 100%;
    width: 100%;
}

.form__wrapper {
    height: 100%;
    width: 50%;
    display: grid;
    margin: auto;
    grid-template-rows: 1fr auto 1fr;
    padding: var(--padding-medium) 0px;
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

.form__buttons {
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
}

.form__buttons button {
    opacity: 0%;
    animation: form__buttons__fade-in 0.2s ease-in-out forwards 0.5s;
}

.more-btn {
    display: inline-block;
    width: 8.5em;
    margin: auto;
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

.table {
    text-align: left;
}

#toolbar {
    box-shadow: none;
    margin-bottom: 6px;
}

.doctorSelectedList {
    margin-bottom: 6px;
}

.doctorList {
    margin-bottom: 6px;
}

/* ANIMATIONS */

@keyframes form__buttons__fade-in {
    0% {
        opacity: 0%;
    }

    100% {
        opacity: 100%;
    }
}
</style>
