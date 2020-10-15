const state = {
    scrollTopColorScheme: {
        // backgroundColor, iconColor
        home: ["var(--color-white)", "var(--color-blue)"],
        login: ["var(--color-blue)", "var(--color-white)"],
        profile: ["var(--color-white)", "var(--color-blue)"],
        doctors: ["var(--color-white)", "var(--color-blue)"],
        patients: ["var(--color-white)", "var(--color-blue)"],
        orders: ["var(--color-white)", "var(--color-blue)"],
        addDoctor: ["var(--color-blue)", "var(--color-white)"],
        addPatient: ["var(--color-blue)", "var(--color-white)"],
        addOrder: ["var(--color-blue)", "var(--color-white)"],
        addProfile: ["var(--color-blue)", "var(--color-white)"],
    },
};

const getters = {
    scrollTopColorScheme: (state) => state.scrollTopColorScheme,
};

const actions = {};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations,
};
