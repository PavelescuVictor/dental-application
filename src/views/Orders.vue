<template>
    <div class="orders">
        <Navbar :currentPage="currentPage" />
        <div class="content">
            <div class="list__wrapper">
                <v-card class="list">
                    <v-toolbar>
                        <v-toolbar-title>{{ listName }}</v-toolbar-title>
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
                            label="Nume"
                            @keyup.enter="showFilteredMedics"
                        ></v-text-field>
                    </v-toolbar>
                    <v-list three-line>
                        <template v-for="(order, index) in filteredOrders">
                            <v-divider
                                v-if="index > 0"
                                :key="index"
                            ></v-divider>
                            <v-list-item :key="order.firstName">
                                <v-list-item-content>
                                    <v-list-item-title
                                        v-html="order.firstName"
                                    ></v-list-item-title>
                                    <v-list-item-subtitle
                                        v-html="order.cabinet"
                                    ></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-card>
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
import axios from "axios";

export default {
    name: "Orders",
    components: {
        Navbar,
        ScrollTop,
        Footer,
    },
    data() {
        return {
            currentPage: "orders",
            listName: "Lucrari",
            orders: "",
            pacients: "",
            doctors: "",
            ordersDataReceived: false,
            filteredOrders: [],
            searchBarShowed: false,
            addPageRedirect: "add-pacient",
            filteredDoctorInput: "",
            filteredPacientInput: "",
        };
    },
    methods: {
        getOrders: function() {
            let url = "http://127.0.0.1:8000/api/v1/orders/";
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
                    this.orders = response.data.results;
                    this.ordersdataReceived = true;
                    this.filteredOrders = this.items;
                })
                .catch((error) => {
                    console.error(error.response);
                });
        },

        showSearchBar() {
            this.searchBarShowed = !this.searchBarShowed;
        },

        showFilteredOrders() {
            this.filteredOrders = [];
            this.orders.forEach((order) => {
                let fullName = order.firstName + order.listName;
                if (fullName.includes(this.filtered))
                    this.filteredOrders.push(order);
            });
        },
    },
    mounted: function() {
        this.getOrders();
    },
    watch: {
        filteredPacient: function() {
            this.showFilteredOrders();
        },
        filteredDoctorInput: function() {
            this.showFilteredOrders();
        },
    },
};
</script>

<style scoped>
.content {
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: var(--navbar-height);
}
.list__wrapper {
    min-height: 100%;
    width: 70%;
    padding: var(--padding-high);
}
.list {
    min-height: 100%;
}
</style>
