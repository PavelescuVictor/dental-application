import axios from "axios";

const state = {
    statusPatient: "",
    patientList: [],
    filteredPatientList: [],
    requestPatientUrl: "http://127.0.0.1:8000/api/v1/patients/",
    selectedPatient: "",
};

const getters = {
    patientList: (state) => state.patientList,
    filteredPatientList: (state) => state.filteredPatientList,
    requestPatientUrl: (state) => state.requestPatientUrl,
    requestStatusPatient: (state) => state.statusPatient,
    selectedPatient: (state) => state.selectedPatient,
};

const actions = {
    requestPatientList({ commit, getters }) {
        return new Promise((resolve, reject) => {
            commit("patientList_request");
            axios({
                url: getters.requestPatientUrl,
                method: "GET",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
            })
                .then((response) => {
                    commit("patientList_success", response.data.results);
                    resolve(response);
                })
                .catch((error) => {
                    commit("patientList_error", error);
                    commit("patientList_empty");
                    reject(error);
                });
        });
    },
    filterPatientList({ commit, getters }, query) {
        commit("filteredPatientList_empty");
        const filteredPatientList = [];
        getters.patientList.forEach((item) => {
            if (
                (query.filteredInputFirstName === "") &
                item.lastName.includes(query.filteredInputLastName)
            )
                filteredPatientList.push(item);
            else if (
                (query.filteredInputLastName === "") &
                item.firstName.includes(query.filteredInputFirstName)
            )
                filteredPatientList.push(item);
            else if (
                (query.filteredInputFirstName != "") &
                (query.filteredInputLastName != "")
            ) {
                if (
                    item.firstName.includes(query.filteredInputFirstName) &
                    item.lastName.includes(query.filteredInputLastName)
                )
                    filteredPatientList.push(item);
            }
        });
        commit("filteredPatientList_success", filteredPatientList);
    },

    setSelectedPatient({ commit }, payload) {
        if (payload.length == 0) commit("selectedPatient_empty");
        else commit("selectedPatient_success", payload[0]);
    },
};

const mutations = {
    patientList_request(state) {
        state.statusPatient = "loading";
    },
    patientList_success(state, patientList) {
        state.statusPatient = "success";
        state.patientList = patientList;
    },
    patientList_error(state, error) {
        state.statusPatient = error;
    },
    patientList_empty(state) {
        state.patientList = [];
    },
    filteredPatientList_empty(state) {
        state.filteredPatientList = [];
    },
    filteredPatientList_success(state, filteredPatientList) {
        state.filteredPatientList = filteredPatientList;
    },
    selectedPatient_empty(state) {
        state.selectedPatient = "";
    },
    selectedPatient_success(state, payload) {
        state.selectedPatient = payload;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
