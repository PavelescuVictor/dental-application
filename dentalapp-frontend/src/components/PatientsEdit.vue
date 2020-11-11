<template>
    <div class="patientsEdit">
        <Confirmation />
        <Alert />
        <div class="content">
            <div class="form__wrapper" v-if="showEdit">
                <v-form
                    class="form"
                    ref="form"
                    v-model="valid"
                    :lazy-validation="lazy"
                >
                    <div class="form__entries">
                        <v-text-field
                            v-model="patientFirstName"
                            :rules="rules.patientFirstName"
                            label="First Name"
                            required
                            clearable
                        ></v-text-field>

                        <v-text-field
                            v-model="patientLastName"
                            :rules="rules.patientLastName"
                            label="Last Name"
                            required
                            clearable
                        ></v-text-field>

                        <v-text-field
                            v-model="patientPhone"
                            :rules="rules.patientPhone"
                            label="Phone"
                            required
                            clearable
                        ></v-text-field>

                        <v-textarea
                            v-model="patientDetails"
                            label="Details"
                            required
                            rows="1"
                            auto-grow
                            clearable
                        ></v-textarea>
                    </div>

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
    </div>
</template>

<script>
import Alert from "../components/Alert.vue";
import Confirmation from "../components/Confirmation.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "PatientsEdit",
    components: {
        Alert,
        Confirmation,
    },
    data: () => ({
        valid: true,
        empty: true,
        showEdit: false,
        patientId: "",
        patientFirstName: "",
        patientLastName: "",
        patientPhone: "",
        patientDetails: "",
        alert: {
            type: "",
            message: "",
        },
        rules: {},
        /*
        rules: {
            required: [(value) => !!value || "Required"],
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
            pacientPhone: [
                (value) => !!value || `Phone number is required.`,
                (value) =>
                    /^[\d]*$/.test(value) ||
                    "Phone must only contain digits, whitespaces, dot or dashline.",
            ],
        },
        */
        lazy: false,
    }),

    mounted() {
        if (this.getSelectedPatient != "") {
            this.patient = this.getSelectedPatient;
            this.alert = {
                type: "success",
                message: "Selected patient received",
            };
            this.addAlert(this.alert);
            this.showEdit = true;
            this.patientFirstName = this.getSelectedPatient.firstName;
            this.patientLastName = this.getSelectedPatient.lastName;
            this.patientPhone = this.getSelectedPatient.phone;
            this.patientDetails = this.getSelectedPatient.details;
            this.patientId = this.getSelectedPatient.id;
        } else {
            this.alert = {
                type: "alert",
                message: "No patient selected",
            };
            this.addAlert(this.alert);
            this.showEdit = false;
            /*
            if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
            } else {
                this.$router.push({ name: "doctors" });
            }
            */
        }
    },

    computed: {
        ...mapGetters(["getSelectedPatient"]),
    },

    methods: {
        ...mapActions(["editPatient", "addAlert"]),

        handleSubmit(e) {
            e.preventDefault();
            const data = {
                patientId: this.patientId,
                patientFirstName: this.patientFirstName,
                patientLastName: this.patientLastName,
                phone: this.patientPhone,
                details: this.patientDetails,
            };
            this.editPatient(data)
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.alert = {
                        type: type,
                        message: "Patient eddited!",
                    };
                    this.$emit("updatePage", "list");
                    this.addAlert(this.alert);
                })
                .catch((error) => {
                    this.alert = {
                        type: "error",
                        message: error,
                    };
                    this.addAlert(this.alert);
                });
        },

        handleReset() {
            this.$refs.form.reset();
        },
    },
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
    background: var(--color-lightgrey-2);
}

.form__wrapper {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    padding: var(--padding-small);
}

.form__entries {
    background: var(--color-white);
    padding: var(--padding-small);
    border-radius: 15px;
}

.form__buttons {
    justify-self: center;
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
</style>
