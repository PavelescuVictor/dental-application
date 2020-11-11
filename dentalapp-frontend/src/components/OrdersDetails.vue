<template>
    <div class="orderDetails">
        <Alert />
        <Confirmation />
        <div class="content">
            <div class="card__wrapper" v-if="showDetails">
                <template>
                    <v-card min-width="100%" id="card">
                        <div class="list__wrapper">
                            <ul class="list__content">
                                <li>
                                    <p>Doctor Name</p>
                                    <p>{{ order.doctorName }}</p>
                                </li>
                                <li>
                                    <p>Patient Name</p>
                                    <p>{{ order.patientName }}</p>
                                </li>
                                <li>
                                    <p>Created At</p>
                                    <p>{{ order.createdAt }}</p>
                                </li>
                                <li>
                                    <p>Created By</p>
                                    <p>{{ order.createdByName }}</p>
                                </li>
                                <li>
                                    <p>Update At</p>
                                    <p>{{ order.updatedAt }}</p>
                                </li>
                                <li>
                                    <p>Updated By</p>
                                    <p>{{ order.updatedByName }}</p>
                                </li>
                                <li>
                                    <p>Total Price</p>
                                    <p>{{ getSelectedOrderTotalPrice }}</p>
                                </li>
                            </ul>
                        </div>
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
    text-align: left;
}

#card {
    background: var(--color-lightgrey-2);
    box-shadow: none;
    margin-bottom: 6px;
}

.list__wrapper {
    width: fit-content;
    margin: auto;
}

.list__content {
    list-style-type: none;
    display: grid;
    grid-auto-rows: auto;
}

.list__content li {
    display: grid;
    grid-template-columns: minmax(150px, 1fr) 5fr;
    background: white;
    color: var(--color-darkblue);
    border-bottom: 2px solid var(--color-lightgrey-2);
}

.list__content li:first-child {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

.list__content li:last-child {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-bottom: 0px;
}

.list__content li p {
    padding: calc(var(--padding-small) * 0.5);
    text-align: center;
}

.list__content li p:first-child {
    border-right: 2px solid var(--color-lightgrey-2);
}
</style>
