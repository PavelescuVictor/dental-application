<template>
    <div class="profileDetails">
        <Confirmation />
        <Alert />
        <div class="content">
            <div class="card__wrapper">
                <template>
                    <v-card min-width="100%">
                        <v-list two-line>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        userProfile.firstName
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        userProfile.lastName
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        userProfile.gender
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="indigo">
                                        mdi-email
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        userProfile.userEmail
                                    }}</v-list-item-title>
                                    <v-list-item-subtitle
                                        >Personal</v-list-item-subtitle
                                    >
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
                                        userProfile.phone
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
                                            userProfile.createdAt
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
                                            userProfile.updatedAt
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
    name: "ProfileDetails",
    components: {
        Confirmation,
        Alert,
    },
    data() {
        return {
            searchBarShowed: false,
            addPageRedirect: "addPatient",
            alert: {
                type: "",
                message: "",
                time: 0,
            },
        };
    },
    computed: {
        ...mapGetters(["userProfile"]),
    },
    methods: {
        ...mapActions([
            "requestPatientList",
            "filterPatientList",
            "addAlert",
            "addConfirmationMessage",
        ]),
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
