const state = {
    navbarColorScheme: {
        // logoColor, menuListColor, menuStyle(static/block)
        home: ["var(--color-white)", "var(--color-white)", ""],
        login: ["var(--color-white)", "var(--color-blue)", "--block"],
        profile: ["var(--color-white)", "var(--color-white)", ""],
        doctors: ["var(--color-white)", "var(--color-white)", ""],
        patients: ["var(--color-white)", "var(--color-white)", ""],
        orders: ["var(--color-white)", "var(--color-white)", ""],
        addDoctor: ["var(--color-white)", "var(--color-blue)", "--block"],
        addPatient: ["var(--color-white)", "var(--color-blue)", "--block"],
        editDoctor: ["var(--color-white)", "var(--color-blue)", "--block"],
        editPatient: ["var(--color-white)", "var(--color-blue)", "--block"],
        addOrder: ["var(--color-white)", "var(--color-blue)", "--block"],
        addProfile: ["var(--color-white)", "var(--color-blue)", "--block"],
    },
};

const getters = {
    navbarColorScheme: (state) => state.navbarColorScheme,
};

const actions = {};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations,
};
