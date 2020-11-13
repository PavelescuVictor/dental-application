<template>
    <div class="orderTypeEntryDetails">
        <Confirmation />
        <Alert />
        <div class="content">
            <div class="card__wrapper" v-if="showDetails">
                <template>
                    <v-card min-width="100%" id="card">
                        <div class="list__wrapper">
                            <ul class="list__content">
                                <li>
                                    <p>Type</p>
                                    <p>{{ orderTypeEntry.typeName }}</p>
                                </li>
                                <li>
                                    <p>Type PPU</p>
                                    <p>{{ orderTypeEntry.typePPU }}</p>
                                </li>
                                <li>
                                    <p>Total Price</p>
                                    <p>
                                        {{
                                            orderTypeEntry.typePPU *
                                                orderTypeEntry.unitCount
                                        }}
                                    </p>
                                </li>
                                <li>
                                    <p>Color</p>
                                    <p>{{ orderTypeEntry.colorName }}</p>
                                </li>
                                <li>
                                    <p>Status</p>
                                    <p>{{ orderTypeEntry.statusName }}</p>
                                </li>
                                <li>
                                    <p>Unit Count</p>
                                    <p>{{ orderTypeEntry.unitCount }}</p>
                                </li>
                                <li>
                                    <p>Warranty</p>
                                    <p>{{ orderTypeEntry.warranty }}</p>
                                </li>
                                <li>
                                    <p>Redo</p>
                                    <p>{{ orderTypeEntry.redo }}</p>
                                </li>
                                <li>
                                    <p>Paid</p>
                                    <p>{{ orderTypeEntry.paid }}</p>
                                </li>
                                <li>
                                    <p>Created By</p>
                                    <p>{{ orderTypeEntry.createdByName }}</p>
                                </li>
                                <li>
                                    <p>Created At</p>
                                    <p>{{ orderTypeEntry.createdAt }}</p>
                                </li>
                                <li>
                                    <p>Update By</p>
                                    <p>{{ orderTypeEntry.updatedByName }}</p>
                                </li>
                                <li>
                                    <p>Updated At</p>
                                    <p>{{ orderTypeEntry.updatedAt }}</p>
                                </li>
                            </ul>
                        </div>
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
    name: "OrderTypeEntryDetails",

    components: {
        Confirmation,
        Alert,
    },

    data() {
        return {
            orderTypeEntry: "",
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
        if (this.getSelectedOrderTypeEntry != "") {
            this.orderTypeEntry = this.getSelectedOrderTypeEntry;
            this.alert = {
                type: "success",
                message: "Selected order type entry received",
                time: 4000,
            };
            this.addAlert(this.alert);
            this.showDetails = true;
        } else {
            this.alert = {
                type: "alert",
                message: "No order type entry selected",
                time: 4000,
            };
            this.addAlert(this.alert);
            this.showDetails = false;
        }
    },

    computed: {
        ...mapGetters(["getSelectedOrderTypeEntry"]),
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
    flex-direction: column;
    justify-content: center;
    text-align: left;
}

#card {
    background: var(--color-lightgrey-2);
    box-shadow: none;
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
    border-bottom: 0px;
}

.list__content li p {
    padding: calc(var(--padding-small) * 0.5) !important;
    text-align: center;
}

.list__content li p:first-child {
    border-right: 2px solid var(--color-lightgrey-2);
}
</style>
