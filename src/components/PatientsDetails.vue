<template>
    <div class="doctorDetails">
        <Confirmation />
        <Alert />
        <div class="content">
            <div class="card__wrapper">
                <template>
                    <v-card min-width="100%" v-if="showDetails">
                        <v-list two-line>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        patient.firstName
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        patient.lastName
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        patient.details
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="indigo">
                                        mdi-phone
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        patient.phone
                                    }}</v-list-item-title>
                                    <v-list-item-subtitle
                                        >Mobile</v-list-item-subtitle
                                    >
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        >Created at
                                        {{
                                            patient.createdAt
                                        }}</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        >Updated at
                                        {{
                                            patient.updatedAt
                                        }}</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Confirmation from "../components/Confirmation.vue";
import Alert from "../components/Alert.vue";

export default {
    name: "PatientsDetails",

    components: {
        Confirmation,
        Alert,
    },

    data() {
        return {
            patient: "",
            showDetails: false,
            alert: {
                type: "",
                message: "",
                time: 0,
            },
        };
    },

    mounted() {
        if (this.getSelectedPatient != "") {
            this.patient = this.getSelectedPatient;
            this.alert = {
                type: "success",
                message: "Selected patient received",
                time: 4000,
            };
            this.addAlert(this.alert);
            this.showDetails = true;
        } else {
            this.alert = {
                type: "alert",
                message: "No patient selected",
                time: 4000,
            };
            this.addAlert(this.alert);
            this.showDetails = false;
        }
    },

    computed: {
        ...mapGetters(["getSelectedPatient"]),
    },

    methods: {
        ...mapActions(["addAlert", "addConfirmationMessage"]),
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
}

.card__wrapper {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
}

.list {
    min-height: 100%;
    text-align: center;
}

/* ANIMATIONS */
</style>
