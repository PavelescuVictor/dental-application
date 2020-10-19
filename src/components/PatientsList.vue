<template>
    <div class="patients">
        <Confirmation />
        <Alert />
        <div class="content">
            <div class="list__wrapper">
                <v-card class="list">
                    <v-toolbar>
                        <v-toolbar-title>Pacienti</v-toolbar-title>
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
                    <v-toolbar v-if="searchBarShowed === true">
                        <v-text-field
                            v-model="filteredInputFirstName"
                            label="First Name"
                        ></v-text-field>
                        <v-text-field
                            v-model="filteredInputLastName"
                            label="Last Name"
                        ></v-text-field>
                    </v-toolbar>
                </v-card>
                <template>
                    <v-data-table
                        v-model="selectedPatient"
                        :headers="headers"
                        :items="list"
                        item-key="id"
                        hide-default-footer
                        :single-select="singleSelect"
                        show-select
                        class="table"
                    >
                        <template v-slot:item.actions="{ item }">
                            <v-icon medium class="mr-2" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon medium @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
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
    name: "Patients",
    components: {
        Confirmation,
        Alert,
    },
    data() {
        return {
            searchBarShowed: false,
            addPageRedirect: "addPatient",
            filteredInputFirstName: "",
            filteredInputLastName: "",
            filter: false,
            singleSelect: true,
            selectedPatient: [],
            patientToDelete: "",
            alert: {
                type: "",
                message: "",
                time: 0,
            },
            headers: [
                {
                    text: "First Name",
                    align: "start",
                    sortable: true,
                    value: "firstName",
                },
                {
                    text: "Last Name",
                    align: "start",
                    sortable: true,
                    value: "lastName",
                },
                {
                    text: "Phone",
                    align: "start",
                    sortable: true,
                    value: "phone",
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

    created() {
        this.getPatients();
        this.selectedPatient = [this.getSelectedPatient];
    },

    computed: {
        ...mapGetters([
            "patientList",
            "filteredPatientList",
            "getSelectedPatient",
            "getConfirmationVisibleFlag",
            "getConfirmationProceedFlag",
        ]),

        list: function() {
            return this.filter === true
                ? this.filteredPatientList
                : this.patientList;
        },
    },

    methods: {
        ...mapActions([
            "requestPatientList",
            "filterPatientList",
            "addAlert",
            "addConfirmation",
            "resetConfirmation",
            "setSelectedPatient",
            "removeSelectedPatient",
            "removePatient",
            "inspectToken",
        ]),

        getPatients: function() {
            this.inspectToken();
            this.requestPatientList()
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
            if (this.searchBarShowed === true) {
                this.filteredInputFirstName = "";
                this.filteredInputLastName = "";
                this.searchBarShowed = false;
            } else {
                this.searchBarShowed = true;
            }
        },

        showFilteredPatients() {
            this.filterPatientList({
                filteredInputFirstName: this.filteredInputFirstName,
                filteredInputLastName: this.filteredInputLastName,
            });
            this.filter = true;
        },

        editItem(item) {
            this.setSelectedPatient(item);
            this.$emit("redirectEdit");
        },

        deleteItem(item) {
            this.inspectToken();
            const message = `Are you sure you want to delete ${item.lastName} ${item.firstName}?`;
            this.addConfirmation(message);
            this.patientToDelete = item;
        },

        proceedDeleteItem(item) {
            this.removePatient({ patientId: item.id })
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "204") type = "success";
                    this.alert = {
                        type: type,
                        message: "Patient removed!",
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
            this.patientToDelete = "";
        },
    },

    watch: {
        filteredInputFirstName: function() {
            if (this.filteredInputFirstName.length >= 3)
                this.showFilteredPatients();
            else {
                if (this.filteredInputLastName.length < 3) this.filter = false;
                else {
                    this.filteredInputFirstName = "";
                    this.showFilteredPatients();
                }
            }
        },

        filteredInputLastName: function() {
            if (this.filteredInputLastName.length >= 3)
                this.showFilteredPatients();
            else {
                if (this.filteredInputFirstName.length < 3) this.filter = false;
                else {
                    this.filteredInputLastName = "";
                    this.showFilteredPatients();
                }
            }
        },

        selectedPatient: function() {
            if (this.selectedPatient.length != 0)
                this.setSelectedPatient(this.selectedPatient[0]);
            else this.removeSelectedPatient();
        },

        getConfirmationProceedFlag: function() {
            console.log("da");
            if (this.getConfirmationProceedFlag === true)
                this.proceedDeleteItem(this.patientToDelete);
        },
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
