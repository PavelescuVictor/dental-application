<template>
    <div class="orders">
        <Confirmation />
        <Alert />
        <div class="content">
            <div class="list__wrapper">
                <v-card class="list">
                    <v-toolbar>
                        <v-toolbar-title>Lucrari</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="showAddBar" id="plus">
                            <font-awesome-icon :icon="['fas', 'plus-circle']" />
                        </v-btn>
                        <v-btn icon @click="showSearchBar" id="search">
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <div v-if="isSearchBoardActive">
                        <OrdersListFilterDashboard />
                    </div>
                    <div v-if="isAddBoardActive">
                        <OrdersListAddDashboard />
                    </div>
                    <template v-if="showOrderList">
                        <v-data-table
                            :headers="headers"
                            :items="this.filteredOrderList"
                            item-key="id"
                            hide-default-footer
                            :single-select="singleSelect"
                            show-select
                            class="table"
                        >
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
import OrdersListFilterDashboard from "../components/OrdersListFilterDashboard.vue";
import OrdersListAddDashboard from "../components/OrdersListAddDashboard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Orders",
    components: {
        Confirmation,
        Alert,
        OrdersListFilterDashboard,
        OrdersListAddDashboard,
    },
    data() {
        return {
            isSearchBoardActive: false,
            isAddBoardActive: false,
            isDoctorSelected: false,
            isPatientSelected: false,
            showOrderList: false,
            singleSelect: true,
            alert: {
                type: "",
                message: "",
                time: 0,
            },
            confirmation: {
                message: "",
            },
            headers: [
                {
                    text: "Id",
                    align: "end",
                    sortable: true,
                    value: "id",
                },
                {
                    text: "Doctor",
                    align: "end",
                    sortable: true,
                    value: "doctor",
                },
                {
                    text: "Patient",
                    align: "end",
                    sortable: true,
                    value: "patient",
                },
                {
                    text: "Created By",
                    align: "end",
                    sortable: true,
                    value: "createdBy",
                },
                {
                    text: "Created At",
                    align: "end",
                    sortable: true,
                    value: "createdAt",
                },
                {
                    text: "Updated By",
                    align: "end",
                    sortable: true,
                    value: "updatedBy",
                },
                {
                    text: "Updated At",
                    align: "end",
                    sortable: true,
                    value: "updatedAt",
                },
                {
                    text: "Actions",
                    align: "end",
                    value: "actions",
                    sortable: false,
                },
            ],
        };
    },
    created() {
        this.getData();
    },

    computed: {
        ...mapGetters([
            "getSelectedPatient",
            "getSelectedDoctor",
            "filteredOrderList",
        ]),
    },
    methods: {
        ...mapActions([
            "requestOrderList",
            "filterOrderList",
            "addAlert",
            "addConfirmationMessage",
            "emptyFilteredOrderList",
            "requestDoctorList",
            "requestPatientList",
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
                    this.alert = {
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

        showSearchBar() {
            if (this.isSearchBoardActive === true)
                this.isSearchBoardActive = false;
            else {
                if (this.isAddBoardActive === true) {
                    this.isSearchBoardActive = true;
                    this.isAddBoardActive = false;
                } else {
                    this.isSearchBoardActive = true;
                }
            }
        },

        showAddBar() {
            if (this.isAddBoardActive === true) this.isAddBoardActive = false;
            else {
                if (this.isSearchBoardActive === true) {
                    this.isAddBoardActive = true;
                    this.isSearchBoardActive = false;
                } else {
                    this.isAddBoardActive = true;
                }
            }
        },

        editItem(item) {
            //const message = `Are you sure you want to edit ${item.lastName} ${item.firstName}?`;
            //this.addConfirmationMessage(message);
            this.setSelectedOrder(item);
            if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
            } else {
                this.$router.push({ name: "editOrder" });
            }
        },

        deleteItem(item) {
            this.inspectToken();
            //const message = `Are you sure you want to delete ${item.lastName} ${item.firstName}?`;
            //this.addConfirmation(message);
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
        },
    },
    watch: {
        getSelectedDoctor: function() {
            if (this.isSearchBoardActive === true) {
                if (this.getSelectedDoctor != "") {
                    this.isDoctorSelected = true;
                    const payload = {
                        doctorId:
                            this.getSelectedDoctor.length != 0
                                ? this.getSelectedDoctor[0].id
                                : "",
                        patientId:
                            this.getSelectedPatient.length != 0
                                ? this.getSelectedPatient[0].id
                                : "",
                    };
                    this.filterOrderList(payload);
                } else {
                    this.isDoctorSelected = false;
                    if (this.isPatientSelected === false) {
                        this.emptyFilteredOrderList();
                    }
                }
            }
        },

        getSelectedPatient: function() {
            if (this.isSearchBoardActive === true) {
                if (this.getSelectedPatient != "") {
                    this.isPatientSelected = true;
                    const payload = {
                        doctorId:
                            this.getSelectedDoctor.length != 0
                                ? this.getSelectedDoctor[0].id
                                : "",
                        patientId:
                            this.getSelectedPatient.length != 0
                                ? this.getSelectedPatient[0].id
                                : "",
                    };
                    this.filterOrderList(payload);
                } else {
                    this.isPatientSelected = false;
                    if (this.isDoctorSelected === false) {
                        this.emptyFilteredOrderList();
                    }
                }
            }
        },

        isPatientSelected: function() {
            if (
                this.isPatientSelected === false &&
                this.isDoctorSelected === false
            )
                this.showOrderList = false;
            else if (this.isSearchBoardActive) this.showOrderList = true;
        },

        isDoctorSelected: function() {
            if (
                this.isDoctorSelected === false &&
                this.isDoctorSelected === false
            )
                this.showOrderList = false;
            else if (this.isSearchBoardActive) this.showOrderList = true;
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
}

.table {
    text-align: left;
}
</style>
