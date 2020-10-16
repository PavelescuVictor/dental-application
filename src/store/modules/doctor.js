import axios from "axios";

const state = {
    statusDoctor: "",
    doctorList: [],
    filteredDoctorList: [],
    requestDoctorUrl: "http://127.0.0.1:8000/api/v1/doctors/",
    selectedDoctor: "",
};

const getters = {
    doctorList: (state) => state.doctorList,
    filteredDoctorList: (state) => state.filteredDoctorList,
    requestDoctorUrl: (state) => state.requestDoctorUrl,
    requestStatusDoctor: (state) => state.statusDoctor,
    getSelectedDoctor: (state) => state.selectedDoctor,
};

const actions = {
    requestDoctorList({ commit, getters }) {
        return new Promise((resolve, reject) => {
            commit("doctorList_request");
            axios({
                url: getters.requestDoctorUrl,
                method: "GET",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
            })
                .then((response) => {
                    commit("doctorList_success", response.data.results);
                    resolve(response);
                })
                .catch((error) => {
                    commit("doctorList_error", error);
                    commit("doctorList_empty");
                    reject(error);
                });
        });
    },

    filterDoctorList({ commit, getters }, query) {
        commit("filteredDoctorList_empty");
        const filteredDoctorList = [];
        getters.doctorList.forEach((item) => {
            if (
                (query.filteredInputFirstName === "") &
                item.lastName.includes(query.filteredInputLastName)
            )
                filteredDoctorList.push(item);
            else if (
                (query.filteredInputLastName === "") &
                item.firstName.includes(query.filteredInputFirstName)
            )
                filteredDoctorList.push(item);
            else if (
                (query.filteredInputFirstName != "") &
                (query.filteredInputLastName != "")
            ) {
                if (
                    item.firstName.includes(query.filteredInputFirstName) &
                    item.lastName.includes(query.filteredInputLastName)
                )
                    filteredDoctorList.push(item);
            }
        });
        commit("filteredDoctorList_success", filteredDoctorList);
    },

    setSelectedDoctor({ commit }, payload) {
        commit("selectedDoctor_success", payload);
    },

    removeSelectedDoctor({commit}) {
        commit("selectedDoctor_empty");
    },
};

const mutations = {
    doctorList_request(state) {
        state.statusDoctor = "loading";
    },
    
    doctorList_success(state, doctorList) {
        state.statusDoctor = "success";
        state.doctorList = doctorList;
    },

    doctorList_error(state, error) {
        state.statusDoctor = error;
    },

    doctorList_empty(state) {
        state.doctorList = [];
    },

    filteredDoctorList_empty(state) {
        state.filteredDoctorList = [];
    },
    
    filteredDoctorList_success(state, filteredDoctorList) {
        state.filteredDoctorList = filteredDoctorList;
    },

    selectedDoctor_empty(state) {
        state.selectedDoctor = "";
    },

    selectedDoctor_success(state, payload) {
        state.selectedDoctor = payload;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
