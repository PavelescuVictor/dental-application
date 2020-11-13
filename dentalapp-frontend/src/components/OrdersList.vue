<template>
    <div class="orders">
        <Alert />
        <Confirmation />
        <div class="content">
            <div class="filter">
                <OrdersListFilterDashboard />
            </div>
            <div class="list__wrapper" v-if="isOrderListActive">
                <v-card class="list">
                    <v-toolbar id="list__toolbar">
                        <v-toolbar-title>Lucrari</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <div class="list__filter">
                            <div class="filter__element">
                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="filterDate"
                                            label="Filter Date"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            clearable
                                            v-bind="attrs"
                                            v-on="on"
                                            class="filter__date"
                                            hide-details
                                            color="var(--color-blue)"
                                            dense
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        ref="picker"
                                        v-model="filterDate"
                                        :max="
                                            new Date()
                                                .toISOString()
                                                .substr(0, 10)
                                        "
                                        min="1950-01-01"
                                        color="var(--color-blue)"
                                        landscape
                                        @change="save"
                                    ></v-date-picker>
                                </v-menu>
                            </div>
                            <div class="filter__element">
                                <p>Paid</p>
                                <v-simple-checkbox
                                    v-model="filterPaid"
                                    :label="`Paid`"
                                    id="filter__checkbox"
                                    :ripple="false"
                                    color="var(--color-blue)"
                                >
                                </v-simple-checkbox>
                            </div>
                            <div class="filter__element">
                                <v-btn icon @click="displayAddPage" id="plus">
                                    <font-awesome-icon
                                        :icon="['fas', 'plus-circle']"
                                    />
                                </v-btn>
                            </div>
                        </div>
                    </v-toolbar>
                    <template>
                        <v-data-table
                            v-model="selectedOrder"
                            :headers="headers"
                            :items="list"
                            item-key="id"
                            hide-default-footer
                            :single-select="singleSelect"
                            show-select
                            class="table"
                        >
                            <template v-slot:item.actions="{ item }">
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
import OrdersListFilterDashboard from "../components/OrdersListFilterDashboard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "OrdersList",
    components: {
        Confirmation,
        Alert,
        OrdersListFilterDashboard,
    },
    data() {
        return {
            isSearchBoardActive: false,
            isAddBoardActive: false,
            isDoctorSelected: false,
            isPatientSelected: false,
            isOrderListActive: false,
            singleSelect: true,
            selectedOrder: [],
            orderToDelete: "",
            filterDate: null,
            filterPaid: false,
            filterRedo: false,
            list: [],
            menu: false,
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
                    value: "doctorName",
                },
                {
                    text: "Patient",
                    align: "start",
                    sortable: true,
                    value: "patientName",
                },
                {
                    text: "Created At",
                    align: "start",
                    sortable: true,
                    value: "createdAt",
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
        await this.getData();

        if (this.getSelectedDoctor === "" && this.getSelectedPatient === "") {
            this.emptyFilteredOrderList();
            this.list = [];
        } else {
            this.isDoctorSelected = this.getSelectedDoctor != "" ? true : false;
            this.isPatientSelected =
                this.getSelectedPatient != "" ? true : false;

            const payload = {
                doctorId:
                    this.getSelectedDoctor != ""
                        ? this.getSelectedDoctor.id
                        : "",
                patientId:
                    this.getSelectedPatient != ""
                        ? this.getSelectedPatient.id
                        : "",
            };
            this.isOrderListActive = true;
            await this.filterOrderList(payload);
            this.list = this.filteredOrderList;
            if (this.getIsSelectedOrder === true) {
                this.selectedOrder = [this.getSelectedOrder];
            }
        }
    },

    computed: {
        ...mapGetters([
            "getSelectedPatient",
            "getSelectedDoctor",
            "getSelectedOrder",
            "getIsSelectedOrder",
            "filteredOrderList",
            "getConfirmationVisibleFlag",
            "getConfirmationProceedFlag",
        ]),
    },
    methods: {
        ...mapActions([
            "requestOrderList",
            "requestDoctorList",
            "requestPatientList",
            "filterOrderList",
            "addAlert",
            "addConfirmation",
            "resetConfirmation",
            "setSelectedOrder",
            "removeSelectedOrder",
            "emptyFilteredOrderList",
            "inspectToken",
            "removeOrder",
        ]),

        getData: async function() {
            await this.requestDoctorList()
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.alert = {
                        type: type,
                        message: "Doctors data received!",
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

            await this.requestPatientList()
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.newAlert = {
                        type: type,
                        message: "Patients data received!",
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

        displayAddPage() {
            this.$emit("updatePage", "add");
        },

        editItem(item) {
            this.setSelectedOrder(item);
            this.$emit("redirectEdit");
        },

        deleteItem(item) {
            this.inspectToken();
            const message = `Are you sure you want to delete ${item.doctor_name} ${item.patient_name}?`;
            this.addConfirmation(message);
            this.orderToDelete = item;
        },

        proceedDeleteItem(item) {
            this.removeOrder({ orderId: item.id })
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "204") type = "success";
                    this.alert = {
                        type: type,
                        message: "Order removed!",
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

            this.orderToDelete = "";
        },

        save(date) {
            this.$refs.menu.save(date);
        },

        filterOrderListByPaid(tempFilteredOrderList) {
            return tempFilteredOrderList.filter((entry) => entry.paid === true);
        },

        filterOrderListByDate(tempFilteredOrderList) {
            return tempFilteredOrderList.filter(
                (entry) =>
                    new Date(entry.createdAt) >= new Date(this.filterDate)
            );
        },

        filterList() {
            let tempFilteredOrderList = this.filteredOrderList;

            if (this.filterPaid === true)
                tempFilteredOrderList = this.filterOrderListByPaid(
                    tempFilteredOrderList
                );

            if (this.filterDate != null)
                tempFilteredOrderList = this.filterOrderListByDate(
                    tempFilteredOrderList
                );

            this.list = tempFilteredOrderList;
        },
    },
    watch: {
        getSelectedDoctor: async function() {
            if (this.getSelectedDoctor != "") {
                this.isDoctorSelected = true;
                const payload = {
                    doctorId: this.getSelectedDoctor.id,
                    patientId:
                        this.getSelectedDoctor !== ""
                            ? this.getSelectedPatient.id
                            : "",
                };
                await this.filterOrderList(payload);
                this.list = this.filteredOrderList;
            } else {
                this.isDoctorSelected = false;
                if (this.isPatientSelected === false) {
                    this.emptyFilteredOrderList();
                    this.list = [];
                }
            }
        },

        getSelectedPatient: async function() {
            if (this.getSelectedPatient != "") {
                this.isPatientSelected = true;
                const payload = {
                    doctorId:
                        this.getSelectedDoctor !== ""
                            ? this.getSelectedDoctor.id
                            : "",
                    patientId: this.getSelectedPatient.id,
                };
                await this.filterOrderList(payload);
                this.list = this.filteredOrderList;
            } else {
                this.isPatientSelected = false;
                if (this.isDoctorSelected === false) {
                    this.emptyFilteredOrderList();
                    this.list = [];
                }
            }
        },

        isPatientSelected: function() {
            if (
                this.isPatientSelected === false &&
                this.isDoctorSelected === false
            )
                this.isOrderListActive = false;
            else this.isOrderListActive = true;
        },

        isDoctorSelected: function() {
            if (
                this.isDoctorSelected === false &&
                this.isDoctorSelected === false
            )
                this.isOrderListActive = false;
            else this.isOrderListActive = true;
        },

        selectedOrder: function() {
            if (this.selectedOrder.length != 0)
                this.setSelectedOrder(this.selectedOrder[0]);
            else this.removeSelectedOrder();
        },

        getConfirmationProceedFlag: function() {
            if (this.getConfirmationProceedFlag === true)
                this.proceedDeleteItem(this.orderToDelete);
        },

        menu(val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
        },

        filterPaid: function() {
            this.filterList();
        },

        filterDate: function() {
            this.filterList();
        },
    },
};
</script>

<style scoped>
.filter {
    width: 100%;
}

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
    background: var(--color-lightgrey-2);
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
    grid-template-columns: 4fr 1fr 1fr;
    grid-gap: calc(var(--padding-small) / 2);
}

.filter__element {
    justify-self: center;
    align-self: center;
}

#filter__checkbox {
    justify-self: center;
    align-items: center;
}

.filter__date {
    display: flex;
    justify-content: center;
    align-items: center;
}

.filter__date .v-input__slot {
    margin-bottom: 0px;
}

.table {
    text-align: left;
}
</style>
