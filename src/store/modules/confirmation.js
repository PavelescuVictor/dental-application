const state = {
    confirmationMessage: "",
    confirmationVisibleFlag: false,
};

const getters = {
    getConfirmationMessage: (state) => state.confirmationMessage,
    getVisibleFlag: (state) => state.confirmationVisibleFlag,
};

const actions = {
    addConfirmationMessage({ commit }, message) {
        commit("add_confirmation_message", message);
    },
    removeConfirmationMessage({ commit }) {
        commit("remove_confirmation_message");
    },
};

const mutations = {
    add_confirmation_message(state, message) {
        state.confirmationMessage = message;
        state.confirmationVisibleFlag = true;
        console.log(state);
    },
    remove_confirmation_message(state) {
        state.confirmationMessage = "";
        state.confirmationVisibleFlag = false;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
