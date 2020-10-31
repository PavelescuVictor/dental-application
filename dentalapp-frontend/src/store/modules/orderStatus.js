import axios from "axios";

const state = {
    orderStatusListStatus: "",
    orderStatusList: [],
    requestOrdersStatusUrl: "http://127.0.0.1:8000/api/v1/order_status/",
};

const getters = {
    getOrderStatusList: (state) => state.orderStatusList,
    requestOrderStatusUrl: (state) => state.requestOrdersStatusUrl,
    requestStatusOrderStatus: (state) => state.orderStatusListStatus,
};

const actions = {
    requestOrderStatusList({ commit, getters }) {
        return new Promise((resolve, reject) => {
            commit("orderStatusList_request");
            axios({
                url: getters.requestOrderStatusUrl,
                method: "GET",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
            })
                .then((response) => {
                    commit("orderStatusList_success", response.data.results);
                    resolve(response);
                })
                .catch((error) => {
                    commit("orderStatusList_error", error);
                    commit("orderStatusList_empty");
                    reject(error);
                });
        });
    },
};

const mutations = {
    orderStatusList_request(state) {
        state.orderStatusListStatus = "loading";
    },

    orderStatusList_success(state, orderStatusList) {
        state.orderStatusListStatus = "success";
        state.orderStatusList = orderStatusList;
    },

    orderStatusList_error(state, error) {
        state.orderStatusListStatus = error;
    },

    orderStatusList_empty(state) {
        state.orderStatusList = [];
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
