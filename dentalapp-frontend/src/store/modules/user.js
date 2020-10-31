import axios from "axios";

const state = {
    authStatus: "",
    profileStatus: "",
    addProfileStatus: "",
    editProfileStatus: "",
    renewTokenStatus: "",
    user: localStorage.getItem("user") || "",
    userToken: localStorage.getItem("userToken") || "",
    userTokenExpiry: localStorage.getItem("userTokenExpiry") || "",
    userProfile: localStorage.getItem("userProfile") || "",
    loginUrl: "http://127.0.0.1:8000/users/auth/login",
    renewTokenUrl: "http://127.0.0.1:8000/users/auth/renewtoken",
    registerUrl: "",
    profileUrl: "http://127.0.1:8000/users/",
    addProfileUrl: "http://127.0.1:8000/users/",
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
    addProfileUrl: (state) => state.addProfileUrl,
    renewTokenUrl: (state) => state.renewTokenUrl,
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
    authStatus: (state) => state.authStatus,
    profileStatus: (state) => state.profileStatus,
    addProfileStatus: (state) => state.addProfileStatus,
    editProfileStatus: (state) => state.editProfileStatus,
    renewTokenStatus: (state) => state.renewTokenStatus,
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
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("userToken", userToken);
                    localStorage.setItem("userTokenExpiry", userTokenExpiry);
                    commit("auth_success");
                    commit("set_user", user);
                    commit("set_user_token", userToken);
                    commit("set_user_token_expiry", userTokenExpiry);
                    resolve(response);
                })
                .catch((error) => {
                    commit("auth_error");
                    commit("set_user_token", "");
                    localStorage.removeItem("user");
                    localStorage.removeItem("userToken");
                    localStorage.removeItem("userTokenExpiry");
                    localStorage.removeItem("userProfile");
                    reject(error);
                });
        });
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit("logout");
            commit("set_user", "");
            commit("set_user_token", "");
            commit("set_user_token_expiry", "");
            commit("edit_profile", "");
            localStorage.removeItem("user");
            localStorage.removeItem("userToken");
            localStorage.removeItem("userTokenExpiry");
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
                    commit("profile_success");
                    if (typeof userProfile != "object") {
                        localStorage.removeItem("userProfile");
                        commit("profile", "");
                    } else {
                        localStorage.setItem("userProfile", userProfile);
                        commit("profile", userProfile);
                    }
                    resolve(response);
                })
                .catch((error) => {
                    commit("profile_error");
                    localStorage.removeItem("userProfile");
                    reject(error);
                });
        });
    },

    addProfile({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("add_profile_request");
            axios({
                url: `${getters.addProfileUrl}${getters.userId}/profile/`,
                method: "PATCH",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
                data: {
                    user: getters.userId,
                    firstName: payload.userFirstName,
                    lastName: payload.userLastName,
                    phone: payload.userPhone,
                    gender: payload.userGender,
                    fccProfileUrl: payload.fccProfileUrl,
                },
            })
                .then((response) => {
                    const userProfile = response.data;
                    commit("add_profile_success");
                    if (typeof userProfile != "object") {
                        localStorage.removeItem("userProfile");
                        commit("add_profile", "");
                    } else {
                        localStorage.setItem("userProfile", userProfile);
                        commit("add_profile", userProfile);
                    }
                    resolve(response);
                })
                .catch((error) => {
                    commit("add_profile_error");
                    localStorage.removeItem("userProfile");
                    reject(error);
                });
        });
    },

    editProfile({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("edit_profile_request");
            axios({
                url: `${getters.addProfileUrl}${getters.userId}/`,
                method: "PATCH",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
                data: {
                    firstName: payload.profileFirstName,
                    lastName: payload.profileLastName,
                    gender: payload.gender,
                    phone: payload.phone,
                    updatedBy: getters.user.id,
                },
            })
                .then((response) => {
                    commit("edit_profile_success");
                    commit("edit_profile", payload);
                    resolve(response);
                })
                .catch((error) => {
                    commit("edit_profile_error");
                    reject(error);
                });
        });
    },

    inspectToken({ dispatch, getters, commit }) {
        commit("inspect_token_request");
        const expiryDate = new Date(Date.parse(getters.userTokenExpiry));
        const currentDate = new Date(Date.now());
        const threshHold = 5 * 24; //hours
        const threshHoldDate = new Date(
            expiryDate.setHours(expiryDate.getHours() - threshHold)
        );
        // SA fac sa fie mai mica decat data expirare
        if (currentDate.getTime() > threshHoldDate.getTime())
            dispatch("renewToken");
        else {
            commit("inspect_token_valid");
        }
    },

    renewToken({ commit, getters }) {
        return new Promise((resolve, reject) => {
            commit("renew_token_request");
            axios({
                url: getters.renewTokenUrl,
                data: {
                    id: getters.userId,
                },
                method: "POST",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
            })
                .then((response) => {
                    console.log(response);
                    const userToken = response.data.token;
                    const user = response.data.user;
                    const userTokenExpiry = response.data.tokenExpiry;
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("userToken", userToken);
                    localStorage.setItem("userTokenExpiry", userTokenExpiry);
                    commit("renew_token_success");
                    commit("set_user", user);
                    commit("set_user_token", userToken);
                    commit("set_user_token_expiry", userTokenExpiry);
                    resolve(response);
                })
                .catch((error) => {
                    commit("renew_token_error");
                    commit("logout");
                    commit("set_user", "");
                    commit("set_user_token", "");
                    commit("set_user_token_expiry", "");
                    commit("edit_profile", "");
                    localStorage.removeItem("userToken");
                    localStorage.removeItem("user");
                    localStorage.removeItem("userProfile");
                    reject(error);
                });
        });
    },
};

const mutations = {
    auth_request(state) {
        state.authStatus = "loading";
    },

    auth_success(state) {
        state.authStatus = "success";
    },

    auth_error(state, error) {
        state.authStatus = error;
    },

    set_user(state, user) {
        state.user = user;
    },

    set_user_token(state, userToken) {
        state.userToken = userToken;
    },

    set_user_token_expiry(state, userTokenExpiry) {
        state.userTokenExpiry = userTokenExpiry;
    },

    profile_request(state) {
        state.profileStatus = "loading";
    },

    profile_success(state) {
        state.profileStatus = "success";
    },

    profile_error(state, error) {
        state.profileStatus = error;
    },

    profile(state, userProfile) {
        state.userProfile = userProfile;
    },

    add_profile_request(state) {
        state.addProfileStatus = "loading";
    },

    add_profile_success(state) {
        state.addProfileStatus = "success";
    },

    add_profile_error(state, error) {
        state.addProfileStatus = error;
    },

    add_profile(state, userProfile) {
        state.userProfile = userProfile;
    },

    edit_profile_request(state) {
        state.editProfileStatus = "loading";
    },

    edit_profile_success(state) {
        state.editProfileStatus = "success";
    },

    edit_profile_error(state) {
        state.editProfileStatus = "error";
    },

    edit_profile(state, editProfile) {
        state.userProfile = editProfile;
    },

    logout(state) {
        state.authStatus = "";
        state.profileStatus = "";
    },

    renew_token_request(state) {
        state.renewTokenStatus = "loading";
    },

    renew_token_success(state) {
        state.renewTokenStatus = "success";
    },

    renew_token_error(state, error) {
        state.renewTokenStatus = error;
    },

    inspect_token_request(state) {
        state.inspectTokenStatus = "loading";
    },

    inspect_token_valid(state) {
        state.inspectTokenStatus = "success";
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
