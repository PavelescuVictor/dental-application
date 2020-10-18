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
                type: "error",
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
                        message: "Patient added!",
                    };
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

        reset() {
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
    background: var(--color-white);
}

.form__wrapper {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    padding: var(--padding-small);
}
</style>
