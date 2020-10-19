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
                                        doctor.firstName
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        doctor.lastName
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        doctor.cabinet
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
                                        doctor.phone
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
                                            doctor.createdAt
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
                                            doctor.updatedAt
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
    name: "DoctorsDetails",

    components: {
        Confirmation,
        Alert,
    },

    data() {
        return {
            doctor: "",
            showDetails: false,
            alert: {
                type: "",
                message: "",
                time: 0,
            },
        };
    },

    mounted() {
        if (this.getSelectedDoctor != "") {
            this.doctor = this.getSelectedDoctor;
            this.alert = {
                type: "success",
                message: "Selected doctor received",
            };
            this.addAlert(this.alert);
            this.showDetails = true;
        } else {
            this.alert = {
                type: "alert",
                message: "No doctor selected",
            };
            this.addAlert(this.alert);
            this.showDetails = false;
        }
    },

    computed: {
        ...mapGetters(["getSelectedDoctor"]),
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
    text-align: left;
}
</style>
