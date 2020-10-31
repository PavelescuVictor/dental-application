<template>
    <div class="orderDetails">
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
                                        order.doctor_name
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        order.patient_name
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        >Created at
                                        {{ order.createdAt }}</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        >Updated at
                                        {{ order.updatedAt }}</v-list-item-title
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
    name: "OrderDetails",

    components: {
        Confirmation,
        Alert,
    },

    data() {
        return {
            order: "",
            showDetails: false,
            alert: {
                type: "",
                message: "",
                time: 0,
            },
        };
    },

    mounted() {
        if (this.getSelectedOrder != "") {
            this.order = this.getSelectedOrder;
            this.alert = {
                type: "success",
                message: "Selected order received",
                time: 4000,
            };
            this.addAlert(this.alert);
            this.showDetails = true;
        } else {
            this.alert = {
                type: "alert",
                message: "No order selected",
                time: 4000,
            };
            this.addAlert(this.alert);
            this.showDetails = false;
        }
    },

    computed: {
        ...mapGetters(["getSelectedOrder"]),
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
