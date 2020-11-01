<template>
    <div class="orderTypeEntriesEdit">
        <Confirmation />
        <Alert />
        <div class="content">
            <div class="form__wrapper" v-if="showEdit">
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
    </div>
</template>

<script>
import Alert from "../components/Alert.vue";
import Confirmation from "../components/Confirmation.vue";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "OrderTypeEntryEdit",
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
        if (this.getSelectedOrderTypeEntry != "") {
            this.orderTypeEntry = this.getSelectedOrderTypeEntry;
            this.alert = {
                type: "success",
                message: "Selected order type entry received",
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
                message: "No order type selected",
            };
            this.addAlert(this.alert);
            this.showEdit = false;
        }
    },

    computed: {
        ...mapGetters(["getSelectedOrderTypeEntry"]),
    },

    methods: {
        ...mapActions(["editOrderTypeEntry", "addAlert"]),

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
                    let message = "";
                    let errors = error.response.data;
                    for (let prop in errors) {
                        message = message + errors[prop] + "\n";
                    }
                    this.alert = {
                        type: "error",
                        message: message,
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
