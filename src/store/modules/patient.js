import axios from "axios";

const state = {
    getPatientListStatus: "",
    addPatientStatus: "",
    removePatientStatus: "",
    editPatientStatus: "",
    patientList: [],
    filteredPatientList: [],
    requestPatientUrl: "http://127.0.0.1:8000/api/v1/patients/",
    addPatientUrl: "http://127.0.0.1:8000/api/v1/patients/",
    removePatientUrl: "http://127.0.0.1:8000/api/v1/patients/",
    editPatientUrl: "http://127.0.0.1:8000/api/v1/patients/",
    selectedPatient: "",
};

const getters = {
    patientList: (state) => state.patientList,
    filteredPatientList: (state) => state.filteredPatientList,
    requestPatientUrl: (state) => state.requestPatientUrl,
    addPatientUrl: (state) => state.addPatientUrl,
    removePatientUrl: (state) => state.removePatientUrl,
    editPatientUrl: (state) => state.editPatientUrl,
    requestStatusPatient: (state) => state.statusPatient,
    getSelectedPatient: (state) => state.selectedPatient,
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

    addPatient({ commit, getters }, payload) {
        console.log(payload);
        return new Promise((resolve, reject) => {
            commit("add_patient_request");
            axios({
                url: `${getters.addPatientUrl}`,
                method: "POST",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
                data: {
                    firstName: payload.patientFirstName,
                    lastName: payload.patientLastName,
                    details: payload.details,
                    phone: payload.phone,
                    createdBy: JSON.parse(localStorage.getItem("user")).id,
                    updatedBy: JSON.parse(localStorage.getItem("user")).id,
                },
            })
                .then((response) => {
                    commit("add_patient_success");
                    commit("add_patient");
                    resolve(response);
                })
                .catch((error) => {
                    commit("add_patient_error");
                    reject(error);
                });
        });
    },

    removePatient({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("remove_patient_request");
            axios({
                url: `${getters.addPatientUrl}${payload.patientId}/`,
                method: "DELETE",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
            })
                .then((response) => {
                    commit("remove_patient_success");
                    commit("remove_patient", payload.patientId);
                    resolve(response);
                })
                .catch((error) => {
                    commit("remove_patient_error");
                    reject(error);
                });
        });
    },

    editPatient({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("edit_patient_request");
            axios({
                url: `${getters.addPatientUrl}${payload.patientId}/`,
                method: "PATCH",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
                data: {
                    firstName: payload.patientFirstName,
                    lastName: payload.patientLastName,
                    cabinet: payload.cabinet,
                    phone: payload.phone,
                    createdBy: JSON.parse(localStorage.getItem("user")).id,
                    updatedByBy: JSON.parse(localStorage.getItem("user")).id,
                },
            })
                .then((response) => {
                    commit("edit_patient_success");
                    commit("edit_patient", payload);
                    resolve(response);
                })
                .catch((error) => {
                    commit("edit_patient_error");
                    reject(error);
                });
        });
    },

    setSelectedPatient({ commit }, payload) {
        commit("selectedPatient_success", payload);
    },

    removeSelectedPatient({ commit }) {
        commit("selectedPatient_empty");
    },
};

const mutations = {
    patientList_request(state) {
        state.getPatientListStatus = "loading";
    },

    patientList_success(state, patientList) {
        state.getPatientListStatus = "success";
        state.patientList = patientList;
    },

    patientList_error(state, error) {
        state.getPatientListStatus = error;
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

    add_patient_request(state) {
        state.addPatientStatus = "loading";
    },

    add_patient_success(state) {
        state.addPatientStatus = "success";
    },

    add_patient_error(state) {
        state.addPatientStatus = "error";
    },

    add_patient(state, patient) {
        state.patientList.push(patient);
    },

    remove_patient_request(state) {
        state.removePatientStatus = "loading";
    },

    remove_patient_success(state) {
        state.removePatientStatus = "success";
    },

    remove_patient_error(state) {
        state.removePatientStatus = "error";
    },

    remove_patient(state, patientId) {
        state.patientList = state.patientList.filter((patient) => {
            if (patient.id != patientId) return patient;
        });
    },

    edit_patient_request(state) {
        state.editPatientStatus = "loading";
    },

    edit_patient_success(state) {
        state.editPatientStatus = "success";
    },

    edit_patient_error(state) {
        state.editPatientStatus = "error";
    },

    edit_patient(state, editPatient) {
        state.patientList = state.patientList.filter((patient) => {
            if (patient.id == editPatient.id) return editPatient;
        });
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
