<template>
    <div class="orderDetails">
        <Alert />
        <Confirmation />
        <div class="content">
            <div class="card__wrapper" v-if="showDetails">
                <template>
                    <v-card min-width="100%" id="card">
                        <v-list two-line id="list">
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        >Nume doctor:
                                        {{
                                            order.doctorName
                                        }}</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        >Nume patient:
                                        {{
                                            order.patientName
                                        }}</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        >Created at:
                                        {{ order.createdAt }}</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        >Created by:
                                        {{
                                            order.createdByName
                                        }}</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        >Updated at:
                                        {{ order.updatedAt }}</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        >Updated by:
                                        {{
                                            order.updatedByName
                                        }}</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        >Total price:
                                        {{
                                            getSelectedOrderTotalPrice
                                        }}</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </template>
                <OrderTypeEntriesDashboard />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Confirmation from "../components/Confirmation.vue";
import Alert from "../components/Alert.vue";
import OrderTypeEntriesDashboard from "../components/OrderTypeEntriesDashboard.vue";

export default {
    name: "OrderDetails",

    components: {
        Confirmation,
        Alert,
        OrderTypeEntriesDashboard,
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
            headers: [
                {
                    text: "Id",
                    align: "start",
                    sortable: true,
                    value: "id",
                },
                {
                    text: "Doctor",
                    align: "start",
                    sortable: true,
                    value: "doctor_name",
                },

                {
                    text: "Patient",
                    align: "start",
                    sortable: true,
                    value: "patient_name",
                },
                {
                    text: "Actions",
                    align: "start",
                    value: "actions",
                    sortable: false,
                },
            ],
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
            this.requestOrderTypesList();
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
        ...mapGetters(["getSelectedOrder", "getSelectedOrderTotalPrice"]),
    },

    methods: {
        ...mapActions([
            "addAlert",
            "addConfirmationMessage",
            "requestOrderTypesList",
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
    background-color: var(--color-lightgrey-2);
}

.card__wrapper {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.item__title-list {
    height: 100%;
    background: var(--color-lightgrey-2);
    display: grid;
    grid-template-rows: 1;
    grid-template-columns: auto 1fr;
    grid-gap: 6px;
    justify-content: center;
}

#card {
    box-shadow: none;
    margin-bottom: 6px;
}

/* ANIMATIONS */
</style>
