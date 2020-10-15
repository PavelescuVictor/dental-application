import axios from "axios";

const state = {
    status: "",
    profileStatus: "",
    user: localStorage.getItem("user") || "",
    userToken: localStorage.getItem("userToken") || "",
    userTokenExpiry: "",
    userProfile: "",
    loginUrl: "http://127.0.0.1:8000/users/auth/login",
    registerUrl: "",
    profileUrl: "http://127.0.1:8000/users/",
};

const getters = {
    user: (state) => state.user,
    userToken: (state) => state.userToken,
    userTokenExpiry: (state) => state.userTokenExpiry,
    userId: (state) => {
        if (state.user != "") {
            if (typeof state.user === "object") {
                return state.user.id;
            } else {
                return JSON.parse(state.user).id;
            }
        } else {
            return -1;
        }
    },
    userProfile: (state) => state.userProfile,
    loginUrl: (state) => state.loginUrl,
    registerUrl: (state) => state.registerUrl,
    profileUrl: (state) => state.profileUrl,
    isLoggedIn: (state) => !!state.userToken,
    isAdmin: (state) => {
        if (state.user != "") {
            if (typeof state.user === "object") {
                return state.user.is_admin;
            } else {
                return JSON.parse(state.user).is_admin;
            }
        } else {
            return false;
        }
    },
    authStatus: (state) => state.status,
    profileStatus: (state) => state.profileStatus,
};

const actions = {
    login({ commit, getters }, user) {
        return new Promise((resolve, reject) => {
            commit("auth_request");
            axios({
                url: getters.loginUrl,
                data: user,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    console.log(response);
                    const userToken = response.data.token;
                    const user = response.data.user;
                    const userTokenExpiry = response.data.tokenExpiry;
                    localStorage.setItem("userToken", userToken);
                    localStorage.setItem("user", JSON.stringify(user));
                    commit("auth_success", {
                        user,
                        userToken,
                        userTokenExpiry,
                    });
                    resolve(response);
                })
                .catch((error) => {
                    commit("auth_error");
                    localStorage.removeItem("user-token"); // if the request fails, remove any possible user token if possible
                    reject(error);
                });
        });
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit("logout");
            localStorage.removeItem("userToken");
            localStorage.removeItem("user");
            localStorage.removeItem("userProfile");
            resolve();
            reject();
        });
    },
    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit("auth_request");
            axios({
                url: "http://127.0.0.1:8000/users/auth/register",
                data: user,
                method: "POST",
            })
                .then((resp) => {
                    const userToken = resp.data.token;
                    const user = resp.data.user;
                    localStorage.setItem("userToken", userToken);
                    commit("auth_success", {
                        user: user,
                        usertoken: userToken,
                    });
                    resolve(resp);
                })
                .catch((err) => {
                    commit("auth_error", err);
                    localStorage.removeItem("userToken");
                    reject(err);
                });
        });
    },
    profile({ commit, getters }) {
        return new Promise((resolve, reject) => {
            commit("profile_request");
            axios({
                url: `${getters.profileUrl}${getters.userId}/profile/`,
                method: "GET",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
            })
                .then((response) => {
                    const userProfile = response.data;
                    commit("profile_success", userProfile);
                    resolve(response);
                })
                .catch((error) => {
                    commit("profile_error");
                    reject(error);
                });
        });
    },
};

const mutations = {
    auth_request(state) {
        state.status = "loading";
    },
    auth_success(state, payload) {
        state.status = "success";
        state.userToken = payload.userToken;
        state.user = payload.user;
        state.userTokenExpiry = payload.userTokenExpiry;
    },
    auth_error(state, error) {
        state.status = error;
    },

    profile_request(state) {
        state.profileStatus = "loading";
    },
    profile_success(state, userProfile) {
        state.profileStatus = "success";
        state.userProfile = userProfile;
    },
    profile_error(state, error) {
        state.status = error;
    },
    logout(state) {
        state.status = "";
        state.userToken = "";
        state.user = "";
        state.profileStatus = "";
        state.userProfile = "";
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
