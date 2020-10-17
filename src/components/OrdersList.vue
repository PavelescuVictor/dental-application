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
                        <router-link :to="{ name: addPageRedirect }">
                            <v-btn icon>
                                <font-awesome-icon
                                    :icon="['fas', 'plus-circle']"
                                />
                            </v-btn>
                        </router-link>
                        <v-btn icon @click="showSearchBar">
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <div
                        class="list__filter"
                        v-bind:class="{
                            notDisplayedPage: !isSearchBoardActive,
                        }"
                    >
                        <OrdersListFilterDashBoard />
                    </div>
                    <template v-if="showOrderList">
                        <v-data-table
                            :headers="headers"
                            :items="this.filteredOrderList"
                            item-key="id"
                            hide-default-footer
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
import OrdersListFilterDashBoard from "../components/OrdersListFilterDashboard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Orders",
    components: {
        Confirmation,
        Alert,
        OrdersListFilterDashBoard,
    },
    data() {
        return {
            isSearchBoardActive: false,
            addPageRedirect: "addOrder",
            isDoctorSelected: false,
            isPatientSelected: false,
            showOrderList: false,
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
        ]),

        showSearchBar() {
            if (this.isSearchBoardActive === true) {
                this.isSearchBoardActive = false;
            } else {
                this.isSearchBoardActive = true;
            }
        },

        editItem(item) {
            const message = `Are you sure you want to edit ${item.doctor} ${item.patient}?`;
            this.addConfirmationMessage(message);
        },
        deleteItem(item) {
            const message = `Are you sure you want to delete ${item.doctor} ${item.patient}?`;
            this.addConfirmationMessage(message);
        },
    },
    watch: {
        getSelectedDoctor: function() {
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
        },

        getSelectedPatient: function() {
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
        },

        isPatientSelected: function() {
            if (
                this.isPatientSelected === false &&
                this.isDoctorSelected === false
            )
                this.showOrderList = false;
            else this.showOrderList = true;
        },

        isDoctorSelected: function() {
            if (
                this.isDoctorSelected === false &&
                this.isDoctorSelected === false
            )
                this.showOrderList = false;
            else this.showOrderList = true;
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

.list__filter {
}

/* UTILITY CLASSES */

.notDisplayedPage {
    display: none;
}
</style>
