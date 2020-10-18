const state = {
    alertTypes: {
        success: "success",
        info: "info",
        alert: "alert",
        error: "error",
    },
    alertList: [],
    alertTime: 4000,
};

const getters = {
    getAlertTypes: (state) => state.alertTypes,
    getAlertList: (state) => state.alertList,
    getAlertListEmpty: (state) => (state.alertList.length === 0 ? true : false),
    getAlertTime: (state) => state.alertTime,
    getNewestAlert: (state) => state.alertList[state.alertList.length - 1],
};

const actions = {
    addAlert({ commit }, alert) {
        const newAlert = {
            type: alert.type,
            message: alert.message,
        };
        commit("add_Alert", newAlert);
        setTimeout(() => {
            commit("delete_Alert");
        }, getters.getAlertTime);
    },
};

const mutations = {
    add_Alert(state, newAlert) {
        state.alertList.push(newAlert);
    },

    delete_Alert(state) {
        state.alertList.shift();
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
