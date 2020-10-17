import axios from "axios";

const state = {
    statusOrder: "",
    filteredOrderList: [],
    selectedOrder: "",
    requestOrderUrl: "http://127.0.0.1:8000/api/v1/orders/",
};

const getters = {
    filteredOrderList: (state) => state.filteredOrderList,
    selectedOrder: (state) => state.selectedOrder,
    requestOrderUrl: (state) => state.requestOrderUrl,
    requestStatusOrder: (state) => state.statusOrder,
};

const actions = {
    filterOrderList({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            console.log(payload);
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
};

export default {
    state,
    getters,
    actions,
    mutations,
};
