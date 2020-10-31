import axios from "axios";

const state = {
    orderColorsListStatus: "",
    orderColorsList: [],
    requestOrdersColorsUrl: "http://127.0.0.1:8000/api/v1/order_colors/",
};

const getters = {
    getOrderColorsList: (state) => state.orderColorsList,
    requestOrderColorsUrl: (state) => state.requestOrdersColorsUrl,
    requestStatusOrderColors: (state) => state.orderColorsListStatus,
};

const actions = {
    requestOrderColorsList({ commit, getters }) {
        return new Promise((resolve, reject) => {
            commit("orderColorsList_request");
            axios({
                url: getters.requestOrderColorsUrl,
                method: "GET",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
            })
                .then((response) => {
                    commit("orderColorsList_success", response.data.results);
                    resolve(response);
                })
                .catch((error) => {
                    commit("orderColorsList_error", error);
                    commit("orderColorsList_empty");
                    reject(error);
                });
        });
    },
};

const mutations = {
    orderColorsList_request(state) {
        state.getOrderColorsListStatus = "loading";
    },

    orderColorsList_success(state, orderColorsList) {
        state.getOrderColorsListStatus = "success";
        state.orderColorsList = orderColorsList;
    },

    orderColorsList_error(state, error) {
        state.getOrderColorsListStatus = error;
    },

    orderColorsList_empty(state) {
        state.orderColorsList = [];
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
