const state = {
   alertBoxTypes: {
       LIST: 'LIST',
       OVERRIDE: 'OVERRIDE',
   },
   alertBehaviourType: {
       TEMPORARY: "TEMPORARY",
       PERSISTENT: "PERSISTENT"
   },
   alertTypes: {
       SUCCESS: 'SUCCESS',
       ERROR: 'ERROR',
       INFO: 'INFO',
       WARNING: 'WARNING',
   },
   alertDefaultTime: 5000,
   alertList: [],
   isAlertLoading: false,
};

const getters = {
    getAlertTypes: (state) => state.alertTypes,
    getAlertDefaultTime: (state) => state.alertDefaultTime,
    getAlertList: (state) => state.alertList,
    getAlertListEmpty: (state) => (state.alertList.length === 0 ? true : false),
    getLatestAlert: (state) => state.alertList[state.alertList.length - 1],
    getAlertLoading: (state) => state.isAlertLoading,
};

const actions = {
    addAlert({ state, commit, dispatch }, alert) {
        if (alert.time === undefined) alert.time = state.alertDefaultTime,
        alert.id = Math.random().toString(36).substr(2, 9);
        commit("ADD_ALERT", alert);
        if (alert.alertBehaviourType === undefined) setTimeout(() => {
            dispatch("deleteAlert", alert);
        }, alert.time)
    },

    deleteAlert({ commit }, alert) {
        commit("DELETE_ALERT", alert);
    },

    resetAlertBox({commit}) {
        commit('RESET_ALERTLIST');
        commit('RESET_LATEST_ALERT');
    } 
};

const mutations = {
    ADD_ALERT(state, alert) {
        state.alertList.push(alert);
    },

    DELETE_ALERT(state, alertToDelete) {
        state.alertList = state.alertList.filter((alert) => {
            return alert.id !== alertToDelete.id
        })
    },

    RESET_ALERTLIST(state) {
        state.alertList = [];
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
