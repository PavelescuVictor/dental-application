import axios from "axios";

const state = {
    getOrderListStatus: "",
    addOrderStatus: "",
    removeOrderStatus: "",
    editOrderStatus: "",
    filteredOrderList: [],
    requestOrderUrl: "http://127.0.0.1:8000/api/v1/orders/",
    addOrderUrl: "http://127.0.0.1:8000/api/v1/orders/",
    removeOrderUrl: "http://127.0.0.1:8000/api/v1/orders/",
    editOrderUrl: "http://127.0.0.1:8000/api/v1/orders/",
    selectedOrder: "",
    isSelectedOrder: false,
};

const getters = {
    filteredOrderList: (state) => state.filteredOrderList,
    selectedOrder: (state) => state.selectedOrder,
    requestOrderUrl: (state) => state.requestOrderUrl,
    addOrderUrl: (state) => state.addOrderUrl,
    removeOrderUrl: (state) => state.removeOrderUrl,
    editOrderUrl: (state) => state.editOrderUrl,
    requestStatusOrder: (state) => state.statusOrder,
    getSelectedOrder: (state) => state.selectedOrder,
    getIsSelectedOrder: (state) => state.isSelectedOrder,
};

const actions = {
    filterOrderList({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("filteredOrderList_request");
            axios({
                url: getters.requestOrderUrl,
                method: "GET",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
                params: {
                    doctor: payload.doctorId,
                    patient: payload.patientId,
                },
            })
                .then((response) => {
                    console.log(response);
                    commit("filteredOrderList_success", response.data.results);
                    resolve(response);
                })
                .catch((error) => {
                    commit("filteredOrderList_error", error);
                    commit("filteredOrderList_empty");
                    reject(error);
                });
        });
    },

    emptyFilteredOrderList({ commit }) {
        commit("filteredOrderList_empty");
    },

    addOrder({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("add_order_request");
            axios({
                url: `${getters.addOrderUrl}`,
                method: "POST",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
                data: {
                    doctor: payload.doctorId,
                    patient: payload.patientId,
                    createdBy: JSON.parse(localStorage.getItem("user")).id,
                    updatedBy: JSON.parse(localStorage.getItem("user")).id,
                },
            })
                .then((response) => {
                    commit("add_order_success");
                    commit("add_order");
                    resolve(response);
                })
                .catch((error) => {
                    commit("add_order_error");
                    reject(error);
                });
        });
    },

    removeOrder({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("remove_order_request");
            axios({
                url: `${getters.addOrderUrl}${payload.orderId}/`,
                method: "DELETE",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
            })
                .then((response) => {
                    commit("remove_order_success");
                    commit("remove_order", payload.orderId);
                    resolve(response);
                })
                .catch((error) => {
                    commit("remove_order_error");
                    reject(error);
                });
        });
    },

    setSelectedOrder({ commit }, payload) {
        commit("selectedOrder_success", payload);
    },

    removeSelectedOrder({ commit }) {
        commit("selectedOrder_empty");
    },
};

const mutations = {
    filteredOrderList_request(state) {
        state.statusOrder = "loading";
    },
    filteredOrderList_success(state, filteredOrderList) {
        state.statusOrder = "success";
        state.filteredOrderList = filteredOrderList;
    },
    filteredOrderList_error(state, error) {
        state.statusOrder = error;
    },
    filteredOrderList_empty(state) {
        state.filteredOrderList = [];
    },

    add_order_request(state) {
        state.addOrderStatus = "loading";
    },

    add_order_success(state) {
        state.addOrderStatus = "success";
    },

    add_order_error(state) {
        state.addOrderStatus = "error";
    },

    add_order(state, order) {
        state.orderList.push(order);
    },

    remove_order_request(state) {
        state.removeOrderStatus = "loading";
    },

    remove_order_success(state) {
        state.removeOrderStatus = "success";
    },

    remove_order_error(state) {
        state.removeOrderStatus = "error";
    },

    remove_order(state, orderId) {
        state.filteredOrderList = state.filteredOrderList.filter((order) => {
            if (order.id != orderId) return order;
        });
    },

    selectedOrder_empty(state) {
        state.selectedOrder = "";
        state.isSelectedOrder = false;
    },

    selectedOrder_success(state, payload) {
        state.selectedOrder = payload;
        state.isSelectedOrder = true;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
