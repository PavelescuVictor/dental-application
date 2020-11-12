import axios from "axios";

const state = {
    orderTypeEntryList: [],
    getOrderTypeEntryListStatus: "",
    addOrderTypeEntryStatus: "",
    removeOrderTypeEntryStatus: "",
    editOrderTypeEntryStatus: "",
    requestOrderTypeEntryUrl:
        "http://127.0.0.1:8000/api/v1/order_type_entries/",
    addOrderTypeEntryUrl: "http://127.0.0.1:8000/api/v1/order_type_entries/",
    removeOrderTypeEntryUrl: "http://127.0.0.1:8000/api/v1/order_type_entries/",
    editOrderTypeEntryUrl: "http://127.0.0.1:8000/api/v1/order_type_entries/",
    selectedOrderTypeEntry: "",
    isSelectedOrderTypeEntry: false,
};

const getters = {
    orderTypeEntryList: (state) => state.orderTypeEntryList,
    selectedOrderTypeEntry: (state) => state.selectedOrderTypeEntry,
    requestOrderTypeEntryUrl: (state) => state.requestOrderTypeEntryUrl,
    addOrderTypeEntryUrl: (state) => state.addOrderTypeEntryUrl,
    removeOrderTypeEntryUrl: (state) => state.removeOrderTypeEntryUrl,
    editOrderTypeEntryUrl: (state) => state.editOrderTypeEntryUrl,
    requestStatusOrderTypeEntry: (state) => state.statusOrderTypeEntry,
    getSelectedOrderTypeEntry: (state) => state.selectedOrderTypeEntry,
    getIsSelectedOrderTypeEntry: (state) => state.isSelectedOrderTypeEntry,
};

const actions = {
    requestOrderTypeEntryList({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("orderTypeEntryList_request");
            axios({
                url: getters.requestOrderTypeEntryUrl,
                method: "GET",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
                params: {
                    order: payload.orderTypeEntryId,
                },
            })
                .then((response) => {
                    console.log(response);
                    commit("orderTypeEntryList_success", response.data.results);
                    resolve(response);
                })
                .catch((error) => {
                    commit("orderTypeEntryList_error", error);
                    commit("orderTypeEntryList_empty");
                    reject(error);
                });
        });
    },

    emptyOrderTypeEntryList({ commit }) {
        commit("orderTypeEntryList_empty");
    },

    addOrderTypeEntry({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("add_order_type_entry_request");
            axios({
                url: `${getters.addOrderTypeEntryUrl}`,
                method: "POST",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
                data: payload,
            })
                .then((response) => {
                    commit("add_order_type_entry_success");
                    commit("add_order_type_entry");
                    resolve(response);
                })
                .catch((error) => {
                    commit("add_order_type_entry_error");
                    reject(error);
                });
        });
    },

    removeOrderTypeEntry({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("remove_order_type_entry_request");
            axios({
                url: `${getters.removeOrderTypeEntryUrl}${payload.orderTypeEntryId}/`,
                method: "DELETE",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
            })
                .then((response) => {
                    commit("remove_order_type_entry_success");
                    commit("remove_order_type_entry", payload.orderTypeEntryId);
                    resolve(response);
                })
                .catch((error) => {
                    commit("remove_order_type_entry_error");
                    reject(error);
                });
        });
    },

    editOrderTypeEntry({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("edit_order_type_entry_request");
            axios({
                url: `${getters.addOrderTypeEntryUrl}${payload.orderTypeEntryId}/`,
                method: "PATCH",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
                data: payload.data,
            })
                .then((response) => {
                    commit("edit_order_type_entry_success");
                    commit("edit_order_type_entry", payload);
                    resolve(response);
                })
                .catch((error) => {
                    commit("edit_order_type_entry_error");
                    reject(error);
                });
        });
    },

    setSelectedOrderTypeEntry({ commit }, payload) {
        commit("selectedOrderTypeEntry_success", payload);
    },

    removeSelectedOrderTypeEntry({ commit }) {
        commit("selectedOrderTypeEntry_empty");
    },
};

const mutations = {
    orderTypeEntryList_request(state) {
        state.statusOrderTypeEntry = "loading";
    },
    orderTypeEntryList_success(state, orderTypeEntryList) {
        state.statusOrderTypeEntry = "success";
        state.orderTypeEntryList = orderTypeEntryList;
    },
    orderTypeEntryList_error(state, error) {
        state.statusOrderTypeEntry = error;
    },
    orderTypeEntryList_empty(state) {
        state.orderTypeEntryList = [];
    },

    add_order_type_entry_request(state) {
        state.addOrderStatus = "loading";
    },

    add_order_type_entry_success(state) {
        state.addOrderStatus = "success";
    },

    add_order_type_entry_error(state) {
        state.addOrderStatus = "error";
    },

    add_order_type_entry(state, orderTypeEntry) {
        state.orderTypeEntryList.push(orderTypeEntry);
    },

    remove_order_type_entry_request(state) {
        state.removeOrderStatus = "loading";
    },

    remove_order_type_entry_success(state) {
        state.removeOrderStatus = "success";
    },

    remove_order_type_entry_error(state) {
        state.removeOrderStatus = "error";
    },

    remove_order_type_entry(state, orderTypeEntryId) {
        state.orderTypeEntryList = state.orderTypeEntryList.filter(
            (orderTypeEntry) => {
                if (orderTypeEntry.id != orderTypeEntryId)
                    return orderTypeEntry;
            }
        );
    },

    edit_order_type_entry_request(state) {
        state.editOrderStatus = "loading";
    },

    edit_order_type_entry_success(state) {
        state.editOrderStatus = "success";
    },

    edit_order_type_entry_error(state) {
        state.editOrderStatus = "error";
    },

    edit_order_type_entry(state, editedOrderTypeEntry) {
        state.orderTypeEntryList = state.orderTypeEntryList.filter(
            (orderTypeEntry) => {
                if (orderTypeEntry.id === editedOrderTypeEntry.id)
                    return editedOrderTypeEntry;
            }
        );
    },

    selectedOrderTypeEntry_empty(state) {
        state.selectedOrderTypeEntry = "";
        state.isSelectedOrderTypeEntry = false;
    },

    selectedOrderTypeEntry_success(state, payload) {
        state.selectedOrderTypeEntry = payload;
        state.isSelectedOrderTypeEntry = true;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
