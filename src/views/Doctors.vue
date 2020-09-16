<template>
    <div class="doctors">
        <Navbar :currentPage="currentPage" />
        <div class="content">
            <Alert :alert="alert" />
            <div class="list__wrapper">
                <v-card class="list">
                    <v-toolbar>
                        <v-toolbar-title>Doctori</v-toolbar-title>
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
                            @keyup.enter="showFilteredDoctors"
                        ></v-text-field>
                        <v-text-field
                            v-model="filteredInputLastName"
                            label="Last Name"
                            @keyup.enter="showFilteredDoctors"
                        ></v-text-field>
                    </v-toolbar>
                </v-card>
                <template>
                    <v-data-table
                        :headers="headers"
                        :items="filteredList"
                        item-key="id"
                        hide-default-footer
                    >
                        <template v-slot:item.actions="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon small @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </template>
            </div>
        </div>
        <ScrollTop />
        <Footer />
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import ScrollTop from "../components/ScrollTop.vue";
import Alert from "../components/Alert.vue";
import axios from "axios";

export default {
    name: "Doctors",
    components: {
        Navbar,
        ScrollTop,
        Footer,
        Alert,
    },
    data() {
        return {
            currentPage: "doctors",
            listName: "Medici",
            items: "",
            dataReceived: false,
            searchBarShowed: false,
            filteredList: [],
            addPageRedirect: "add-doctor",
            filteredInputFirstName: "",
            filteredInputLastName: "",
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
                    text: "Cabinet",
                    align: "start",
                    sortable: true,
                    value: "cabinet",
                },
                {
                    text: "Phone",
                    align: "start",
                    sortable: true,
                    value: "phone",
                },
                {
                    text: "Created By",
                    align: "start",
                    sortable: true,
                    value: "createdBy",
                },
                {
                    text: "Created At",
                    align: "start",
                    sortable: true,
                    value: "createdAt",
                },
                {
                    text: "Modified By",
                    align: "start",
                    sortable: true,
                    value: "modifiedBy",
                },
                {
                    text: "Updated At",
                    align: "start",
                    sortable: true,
                    value: "updatedAt",
                },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                },
            ],
        };
    },
    methods: {
        getDoctors: function() {
            let url = "http://127.0.0.1:8000/api/v1/doctors/";
            const token = localStorage.getItem("userToken");
            console.log(token);
            axios
                .get(url, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response);
                    this.items = response.data.results;
                    this.dataReceived = true;
                    this.items.forEach((item) => {
                        // Created At
                        var createdAt = new Date(item.createdAt);
                        createdAt = createdAt.toLocaleString();

                        // Modified At
                        var updatedAt = new Date(item.updatedAt);
                        updatedAt = updatedAt.toLocaleString();

                        item.createdAt = createdAt;
                        item.updatedAt = updatedAt;
                    });
                    this.filteredList = this.items;
                    this.alert = {
                        type: "info",
                        message: "Doctors data received!",
                        time: 4000,
                    };
                })
                .catch((error) => {
                    console.error(error.response);
                });
        },
        showSearchBar() {
            this.searchBarShowed = !this.searchBarShowed;
        },

        showFilteredDoctors() {
            this.filteredList = [];
            this.items.forEach((item) => {
                if (
                    (this.filteredInputFirstName === "") &
                    item.lastName.includes(this.filteredInputLastName)
                )
                    this.filteredList.push(item);
                else if (
                    (this.filteredInputLastName === "") &
                    item.firstName.includes(this.filteredInputFirstName)
                )
                    this.filteredList.push(item);
                else if (
                    (this.filteredInputFirstName != "") &
                    (this.filteredInputLastName != "")
                ) {
                    if (
                        item.firstName.includes(this.filteredInputFirstName) &
                        item.lastName.includes(this.filteredInputLastName)
                    )
                        this.filteredList.push(item);
                }
            });
        },
        editItem(item) {
            console.log(item);
        },
        deleteItem(item) {
            console.log(item);
        },
    },
    mounted: function() {
        this.getDoctors();
    },
    watch: {
        filteredInputFirstName: function() {
            this.showFilteredDoctors();
        },
        filteredInputLastName: function() {
            this.showFilteredDoctors();
        },
    },
};
</script>

<style scoped>
.content {
    position: relative;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: var(--navbar-height);
}
.list__wrapper {
    margin: auto;
    width: 70%;
    min-height: 100%;
}
.list {
    min-height: 100%;
}
</style>
