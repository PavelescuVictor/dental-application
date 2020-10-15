const state = {
    alertTypes: {
        success: "success",
        info: "info",
        alert: "alert",
        error: "error",
    },
    alert: {},
    alertEmpty: true,
};

const getters = {
    getAlertTypes: (state) => state.alertTypes,
    getAlert: (state) => state.alert,
    getAlertEmpty: (state) => state.alertEmpty,
};

const actions = {
    addAlert({ commit }, alert) {
        const newAlert = {
            type: alert.type,
            message: alert.message,
            time: alert.time,
        };
        commit("add_Alert", newAlert);
    },

    deleteAlert({ commit }) {
        commit("delete_Alert");
    },
};

const mutations = {
    add_Alert(state, newAlert) {
        if (state.alertEmpty) {
            state.alert = newAlert;
            state.alertEmpty = false;
        }
    },
    delete_Alert(state) {
        state.alert = {};
        state.alertEmpty = true;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
