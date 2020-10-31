import axios from "axios";

const state = {
    orderTypesListStatus: "",
    orderTypesList: [],
    requestOrdersTypesUrl: "http://127.0.0.1:8000/api/v1/order_types/",
};

const getters = {
    getOrderTypesList: (state) => state.orderTypesList,
    requestOrderTypesUrl: (state) => state.requestOrdersTypesUrl,
    requestStatusOrderTypes: (state) => state.orderTypesListStatus,
};

const actions = {
    requestOrderTypesList({ commit, getters }) {
        return new Promise((resolve, reject) => {
            commit("orderTypesList_request");
            axios({
                url: getters.requestOrderTypesUrl,
                method: "GET",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
            })
                .then((response) => {
                    commit("orderTypesList_success", response.data.results);
                    resolve(response);
                })
                .catch((error) => {
                    commit("orderTypesList_error", error);
                    commit("orderTypesList_empty");
                    reject(error);
                });
        });
    },
};

const mutations = {
    orderTypesList_request(state) {
        state.orderTypesListStatus = "loading";
    },

    orderTypesList_success(state, orderTypesList) {
        state.orderTypesListStatus = "success";
        state.orderTypesList = orderTypesList;
    },

    orderTypesList_error(state, error) {
        state.orderTypesListStatus = error;
    },

    orderTypesList_empty(state) {
        state.orderTypesList = [];
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
