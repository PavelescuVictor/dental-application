<template>
    <div class="doctorsEdit">
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
import { mapActions, mapGetters } from "vuex";

export default {
    name: "DoctorsEdit",
    components: {
        Alert,
        Confirmation,
    },
    data: () => ({
        valid: true,
        showEdit: false,
        doctorId: "",
        doctorFirstName: "",
        doctorLastName: "",
        doctorPhone: "",
        doctorCabinet: "",
        alert: {
            type: "",
            message: "",
        },
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
        lazy: false,
    }),

    mounted() {
        if (this.getSelectedDoctor != "") {
            this.doctor = this.getSelectedDoctor;
            this.alert = {
                type: "success",
                message: "Selected doctor received",
            };
            this.addAlert(this.alert);
            this.showEdit = true;
            this.doctorFirstName = this.getSelectedDoctor.firstName;
            this.doctorLastName = this.getSelectedDoctor.lastName;
            this.doctorPhone = this.getSelectedDoctor.phone;
            this.doctorCabinet = this.getSelectedDoctor.cabinet;
            this.doctorId = this.getSelectedDoctor.id;
        } else {
            this.alert = {
                type: "alert",
                message: "No doctor selected",
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
        ...mapGetters(["getSelectedDoctor"]),
    },

    methods: {
        ...mapActions(["editDoctor", "addAlert"]),

        handleSubmit(e) {
            e.preventDefault();
            const data = {
                doctorId: this.doctorId,
                doctorFirstName: this.doctorFirstName,
                doctorLastName: this.doctorLastName,
                phone: this.doctorPhone,
                cabinet: this.doctorCabinet,
            };
            this.editDoctor(data)
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.alert = {
                        type: type,
                        message: "Doctor edited!",
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
