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
                        v-model="profileFirstName"
                        :rules="rules.patientFirstName"
                        label="First Name"
                        required
                        clearable
                    ></v-text-field>

                    <v-text-field
                        v-model="profileLastName"
                        :rules="rules.patientLastName"
                        label="Last Name"
                        required
                        clearable
                    ></v-text-field>

                    <v-text-field
                        v-model="profileGender"
                        :rules="rules.patientPhone"
                        label="Gender"
                        required
                        clearable
                    ></v-text-field>

                    <v-text-field
                        v-model="profilePhone"
                        :rules="rules.patientPhone"
                        label="Phone"
                        required
                        clearable
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
        profileFirstName: "",
        profileLastName: "",
        profileGender: "",
        profilePhone: "",
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
        this.profile = this.userProfile;
        this.showEdit = true;
        this.profileFirstName = this.userProfile.firstName;
        this.profileLastName = this.userProfile.lastName;
        this.profileGender = this.userProfile.gender;
        this.profilePhone = this.userProfile.phone;
    },

    computed: {
        ...mapGetters(["userProfile"]),
    },

    methods: {
        ...mapActions(["editProfile", "addAlert"]),

        handleSubmit(e) {
            e.preventDefault();
            const data = {
                profileFirstName: this.profileFirstName,
                profileLastName: this.profileLastName,
                gender: this.profileGender,
                phone: this.profilePhone,
            };
            this.editProfile(data)
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.alert = {
                        type: type,
                        message: "Profile edited!",
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
