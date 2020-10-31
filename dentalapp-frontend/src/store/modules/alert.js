const state = {
    alertStatus: "",
    alertLoading: false,
    alertList: [],
    alertTime: 4000,
};

const getters = {
    getAlertTypes: (state) => state.alertTypes,
    getAlertList: (state) => state.alertList,
    getAlertListEmpty: (state) => (state.alertList.length === 0 ? true : false),
    getAlertTime: (state) => state.alertTime,
    getNewestAlert: (state) => state.alertList[state.alertList.length - 1],
    getAlertLoading: (state) => state.alertLoading,
};

const actions = {
    addAlert({ commit }, alert) {
        commit("add_alert_request");
        const newAlert = {
            type: alert.type,
            message: alert.message,
        };
        commit("add_alert_success");
        commit("add_alert", newAlert);
    },

    deleteAlert({ commit }) {
        commit("delete_alert");
    },
    resetAlertLoading({ commit }) {
        commit("reset_alert_loading");
    },
};

const mutations = {
    add_alert_request(state) {
        state.alertStatus = "loading";
    },

    add_alert_success(state) {
        state.alertStatus = "success";
        state.alertLoading = true;
    },

    add_alert(state, newAlert) {
        state.alertList.push(newAlert);
    },

    delete_alert(state) {
        state.alertList.shift();
    },

    reset_alert_loading(state) {
        state.alertLoading = false;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
