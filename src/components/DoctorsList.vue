<template>
    <div class="doctors">
        <Confirmation />
        <Alert />
        <div class="content">
            <div class="list__wrapper">
                <v-card class="list">
                    <v-toolbar>
                        <v-toolbar-title>Medici</v-toolbar-title>
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
                        :headers="headers"
                        :items="list"
                        item-key="id"
                        hide-default-footer
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
    name: "Doctors",
    components: {
        Confirmation,
        Alert,
    },
    data() {
        return {
            searchBarShowed: false,
            addPageRedirect: "addDoctor",
            filteredInputFirstName: "",
            filteredInputLastName: "",
            filter: false,
            alert: {
                type: "",
                message: "",
                time: 0,
            },
            headers: [
                {
                    text: "Id",
                    align: "end",
                    sortable: true,
                    value: "id",
                },
                {
                    text: "First Name",
                    align: "end",
                    sortable: true,
                    value: "firstName",
                },
                {
                    text: "Last Name",
                    align: "end",
                    sortable: true,
                    value: "lastName",
                },
                {
                    text: "Cabinet",
                    align: "end",
                    sortable: true,
                    value: "cabinet",
                },
                {
                    text: "Phone",
                    align: "end",
                    sortable: true,
                    value: "phone",
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
    mounted: function () {
        this.getDoctors();
    },
    computed: {
        ...mapGetters(["doctorList", "filteredDoctorList"]),
        list: function () {
            return this.filter === true
                ? this.filteredDoctorList
                : this.doctorList;
        },
    },
    methods: {
        ...mapActions([
            "requestDoctorList",
            "filterDoctorList",
            "addAlert",
            "addConfirmationMessage",
        ]),
        getDoctors: function () {
            this.requestDoctorList()
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.alert = {
                        type: type,
                        message: "Doctors data received!",
                        time: 4000,
                    };
                    this.addAlert(this.alert);
                })
                .catch((error) => {
                    this.alert = {
                        type: "error",
                        message: error,
                        time: 4000,
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

        showFilteredDoctors() {
            this.filterDoctorList({
                filteredInputFirstName: this.filteredInputFirstName,
                filteredInputLastName: this.filteredInputLastName,
            });
            this.filter = true;
        },
        editItem(item) {
            const message = `Are you sure you want to edit ${item.lastName} ${item.firstName}?`;
            this.addConfirmationMessage(message);
        },
        deleteItem(item) {
            const message = `Are you sure you want to delete ${item.lastName} ${item.firstName}?`;
            this.addConfirmationMessage(message);
        },
    },
    watch: {
        filteredInputFirstName: function () {
            if (this.filteredInputFirstName.length >= 3)
                this.showFilteredDoctors();
            else {
                if (this.filteredInputLastName.length < 3) this.filter = false;
            }
        },
        filteredInputLastName: function () {
            if (this.filteredInputLastName.length >= 3)
                this.showFilteredDoctors();
            else {
                if (this.filteredInputFirstName.length < 3) this.filter = false;
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
}
</style>
