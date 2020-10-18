const state = {
    confirmationMessage: "",
    confirmationVisibleFlag: false,
    proceedFlag: false,
};

const getters = {
    getConfirmationMessage: (state) => state.confirmationMessage,
    getConfirmationVisibleFlag: (state) => state.confirmationVisibleFlag,
    getConfirmationProceedFlag: (state) => state.proceedFlag,
};

const actions = {
    addConfirmation({ commit }, message) {
        commit("add_confirmation", message);
    },

    cancelConfirmation({ commit }) {
        commit("empty_confirmation");
        commit("cancel_confirmation");
    },

    proceedConfirmation({ commit }) {
        commit("empty_confirmation");
        commit("proceed_confirmation");
    },

    resetConfirmation({ commit }) {
        commit("reset_confirmation");
    },
};

const mutations = {
    add_confirmation(state, message) {
        state.confirmationMessage = message;
        state.confirmationVisibleFlag = true;
        state.proceedFlag = false;
    },

    empty_confirmation(state) {
        state.confirmationMessage = "";
        state.confirmationVisibleFlag = false;
    },

    cancel_confirmation(state) {
        state.proceedFlag = false;
    },

    proceed_confirmation(state) {
        state.proceedFlag = true;
    },

    reset_confirmation(state) {
        state.proceedFlag = false;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
