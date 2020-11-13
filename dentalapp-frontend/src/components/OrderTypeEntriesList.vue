<template>
    <div class="orderTypeEntries">
        <Alert />
        <Confirmation />
        <div class="content">
            <div class="list__wrapper">
                <v-card class="list">
                    <v-toolbar id="list__toolbar">
                        <v-toolbar-title>Order Types</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <div class="list__filter">
                            <div class="filter__element">
                                <p>Paid</p>
                                <v-simple-checkbox
                                    v-model="filterPaid"
                                    :label="`Paid`"
                                    id="filter__checkbox"
                                    :ripple="false"
                                >
                                </v-simple-checkbox>
                            </div>
                            <div class="filter__element">
                                <p>Redo</p>
                                <v-simple-checkbox
                                    v-model="filterRedo"
                                    :label="`Redo`"
                                    id="filter__checkbox"
                                    :ripple="false"
                                ></v-simple-checkbox>
                            </div>
                        </div>
                    </v-toolbar>
                    <template>
                        <v-data-table
                            v-model="selectedOrderTypeEntry"
                            :headers="headers"
                            :items="filteredList"
                            item-key="id"
                            hide-default-footer
                            :single-select="singleSelect"
                            show-select
                            class="table"
                        >
                            <template v-slot:item.redo="{ item }">
                                <v-simple-checkbox
                                    v-model="item.redo"
                                    disabled
                                ></v-simple-checkbox>
                            </template>

                            <template v-slot:item.paid="{ item }">
                                <v-simple-checkbox
                                    v-model="item.paid"
                                    disabled
                                ></v-simple-checkbox>
                            </template>

                            <template v-slot:item.actions="{ item }">
                                <v-icon
                                    medium
                                    class="mr-2"
                                    @click="editItem(item)"
                                >
                                    mdi-pencil
                                </v-icon>
                                <v-icon medium @click="deleteItem(item)">
                                    mdi-delete
                                </v-icon>
                            </template>
                        </v-data-table>
                    </template>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import Confirmation from "../components/Confirmation.vue";
import Alert from "../components/Alert.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "OrderTypeEntriesList",
    components: {
        Confirmation,
        Alert,
    },
    data() {
        return {
            isAddBoardActive: false,
            singleSelect: true,
            selectedOrderTypeEntry: [],
            orderTypeEntryToDelete: "",
            filteredList: [],
            filterPaid: false,
            filterRedo: false,
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
                    text: "Type",
                    align: "start",
                    sortable: false,
                    value: "typeName",
                },
                {
                    text: "Color",
                    align: "start",
                    sortable: true,
                    value: "colorName",
                },
                {
                    text: "Status",
                    align: "start",
                    sortable: false,
                    value: "statusName",
                },
                {
                    text: "UnitCount",
                    align: "start",
                    sortable: false,
                    value: "unitCount",
                },
                {
                    text: "Warranty",
                    align: "start",
                    sortable: false,
                    value: "warranty",
                },
                {
                    text: "Redo",
                    align: "start",
                    sortable: false,
                    value: "redo",
                },
                {
                    text: "Paid",
                    align: "start",
                    sortable: false,
                    value: "paid",
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

    async mounted() {
        await this.getOrderTypeEntries();
        this.filteredList = this.orderTypeEntryList;
        if (this.getIsSelectedOrderTypeEntry === true)
            this.selectedOrderTypeEntry = [this.getSelectedOrderTypeEntry];
    },

    computed: {
        ...mapGetters([
            "getSelectedOrderTypeEntry",
            "getIsSelectedOrderTypeEntry",
            "getSelectedOrder",
            "orderTypeEntryList",
            "getConfirmationVisibleFlag",
            "getConfirmationProceedFlag",
        ]),
    },

    methods: {
        ...mapActions([
            "requestOrderTypeEntryList",
            "addAlert",
            "addConfirmation",
            "resetConfirmation",
            "setSelectedOrderTypeEntry",
            "removeSelectedOrderTypeEntry",
            "emptyOrderTypeEntryList",
            "inspectToken",
            "removeOrderTypeEntry",
            "setSelectedOrderTotalPrice",
        ]),

        getOrderTypeEntries: async function() {
            let payload = {
                orderTypeEntryId: this.getSelectedOrder.id,
            };

            await this.requestOrderTypeEntryList(payload)
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.alert = {
                        type: type,
                        message: "Order type entries data received!",
                    };
                    this.addAlert(this.alert);
                    this.computeOrderTotalPrice();
                })
                .catch((error) => {
                    let message = "";
                    if (error.response.status === 401) message = "Unauthorized";
                    this.alert = {
                        type: "error",
                        message: message,
                    };
                    this.addAlert(this.alert);
                });
        },

        editItem(item) {
            this.setSelectedOrderTypeEntry(item);
            this.$emit("redirectEdit");
        },

        deleteItem(item) {
            this.inspectToken();
            const message = `Are you sure you want to delete ?`;
            this.addConfirmation(message);
            this.orderTypeEntryToDelete = item;
        },

        proceedDeleteItem(item) {
            this.removeOrderTypeEntry({ orderTypeEntryId: item.id })
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "204") type = "success";
                    this.alert = {
                        type: type,
                        message: "Order type entry removed!",
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
            this.resetConfirmation();
            this.orderTypeEntryToDelete = "";
        },

        computeOrderTotalPrice() {
            var totalPrice = 0;
            this.orderTypeEntryList.forEach((orderTypeEntry) => {
                totalPrice =
                    totalPrice +
                    orderTypeEntry.typePPU * orderTypeEntry.unitCount;
            });
            this.setSelectedOrderTotalPrice(totalPrice);
        },
    },

    watch: {
        selectedOrderTypeEntry: function() {
            if (this.selectedOrderTypeEntry.length != 0)
                this.setSelectedOrderTypeEntry(this.selectedOrderTypeEntry[0]);
            else this.removeSelectedOrderTypeEntry();
        },

        getConfirmationProceedFlag: function() {
            if (this.getConfirmationProceedFlag === true)
                this.proceedDeleteItem(this.orderTypeEntryToDelete);
        },

        getOrderTypeEntries: function() {
            if (this.getOrderTypeEntries.length === 0) {
                this.alert = {
                    type: "info",
                    message: "There are no entries to display!",
                };
                this.addAlert(this.alert);
            }
        },

        filterPaid: function() {
            if (this.filterPaid === true) {
                this.filteredList = this.orderTypeEntryList.filter(
                    (entry) => entry.paid === true
                );
            } else {
                if (this.filterRedo === true) {
                    this.filteredList = this.orderTypeEntryList.filter(
                        (entry) => entry.redo === true
                    );
                } else {
                    this.filteredList = this.orderTypeEntryList;
                }
            }
        },

        filterRedo: function() {
            if (this.filterRedo === true) {
                this.filteredList = this.orderTypeEntryList.filter(
                    (entry) => entry.redo === true
                );
            } else {
                if (this.filterPaid === true) {
                    this.filteredList = this.orderTypeEntryList.filter(
                        (entry) => entry.paid === true
                    );
                } else {
                    this.filteredList = this.orderTypeEntryList;
                }
            }
        },
    },
};
</script>

<style scoped>
.content {
    position: relative;
    min-height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.list__wrapper {
    width: 100%;
    min-height: 100%;
}

.list {
    min-height: 100%;
    text-align: center;
    background: var(--color-lightgrey-2);
}

#list__toolbar {
    box-shadow: none;
    margin-bottom: 6px;
    color: var(--color-darkblue);
}

.list__filter {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--padding-small);
}

.filter__element {
    justify-self: center;
    align-self: center;
}

#filter__checkbox {
    justify-self: center;
    align-items: center;
}

.table {
    text-align: left;
}
</style>
