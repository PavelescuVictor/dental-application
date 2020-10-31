import axios from "axios";

const state = {
    getDoctorListStatus: "",
    addDoctorStatus: "",
    removeDoctorStatus: "",
    editDoctorStatus: "",
    doctorList: [],
    filteredDoctorList: [],
    requestDoctorUrl: "http://127.0.0.1:8000/api/v1/doctors/",
    addDoctorUrl: "http://127.0.0.1:8000/api/v1/doctors/",
    removeDoctorUrl: "http://127.0.0.1:8000/api/v1/doctors/",
    editDoctorUrl: "http://127.0.0.1:8000/api/v1/doctors/",
    selectedDoctor: "",
    isSelectedDoctor: false,
};

const getters = {
    doctorList: (state) => state.doctorList,
    filteredDoctorList: (state) => state.filteredDoctorList,
    requestDoctorUrl: (state) => state.requestDoctorUrl,
    addDoctorUrl: (state) => state.addDoctorUrl,
    removeDoctorUrl: (state) => state.removeDoctorUrl,
    editDoctorUrl: (state) => state.editDoctorUrl,
    requestStatusDoctor: (state) => state.statusDoctor,
    getSelectedDoctor: (state) => state.selectedDoctor,
    getIsSelectedDoctor: (state) => state.isSelectedDoctor,
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

    addDoctor({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("add_doctor_request");
            axios({
                url: `${getters.addDoctorUrl}`,
                method: "POST",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
                data: {
                    firstName: payload.doctorFirstName,
                    lastName: payload.doctorLastName,
                    cabinet: payload.cabinet,
                    phone: payload.phone,
                    createdBy: JSON.parse(localStorage.getItem("user")).id,
                    updatedBy: JSON.parse(localStorage.getItem("user")).id,
                },
            })
                .then((response) => {
                    commit("add_doctor_success");
                    commit("add_doctor");
                    resolve(response);
                })
                .catch((error) => {
                    commit("add_doctor_error");
                    reject(error);
                });
        });
    },

    removeDoctor({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("remove_doctor_request");
            axios({
                url: `${getters.addDoctorUrl}${payload.doctorId}/`,
                method: "DELETE",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
            })
                .then((response) => {
                    commit("remove_doctor_success");
                    commit("remove_doctor", payload.doctorId);
                    resolve(response);
                })
                .catch((error) => {
                    commit("remove_doctor_error");
                    reject(error);
                });
        });
    },

    editDoctor({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("edit_doctor_request");
            axios({
                url: `${getters.addDoctorUrl}${payload.doctorId}/`,
                method: "PATCH",
                headers: {
                    Authorization: `Token ${getters.userToken}`,
                },
                data: {
                    firstName: payload.doctorFirstName,
                    lastName: payload.doctorLastName,
                    cabinet: payload.cabinet,
                    phone: payload.phone,
                    updatedBy: JSON.parse(localStorage.getItem("user")).id,
                },
            })
                .then((response) => {
                    commit("edit_doctor_success");
                    commit("edit_doctor", payload);
                    resolve(response);
                })
                .catch((error) => {
                    commit("edit_doctor_error");
                    reject(error);
                });
        });
    },

    setSelectedDoctor({ commit }, payload) {
        commit("selectedDoctor_success", payload);
    },

    removeSelectedDoctor({ commit }) {
        commit("selectedDoctor_empty");
    },
};

const mutations = {
    doctorList_request(state) {
        state.getDoctorListStatus = "loading";
    },

    doctorList_success(state, doctorList) {
        state.getDoctorListStatus = "success";
        state.doctorList = doctorList;
    },

    doctorList_error(state, error) {
        state.getDoctorListStatus = error;
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

    add_doctor_request(state) {
        state.addDoctorStatus = "loading";
    },

    add_doctor_success(state) {
        state.addDoctorStatus = "success";
    },

    add_doctor_error(state) {
        state.addDoctorStatus = "error";
    },

    add_doctor(state, doctor) {
        state.doctorList.push(doctor);
    },

    remove_doctor_request(state) {
        state.removeDoctorStatus = "loading";
    },

    remove_doctor_success(state) {
        state.removeDoctorStatus = "success";
    },

    remove_doctor_error(state) {
        state.removeDoctorStatus = "error";
    },

    remove_doctor(state, doctorId) {
        state.doctorList = state.doctorList.filter((doctor) => {
            if (doctor.id != doctorId) return doctor;
        });
    },

    edit_doctor_request(state) {
        state.editDoctorStatus = "loading";
    },

    edit_doctor_success(state) {
        state.editDoctorStatus = "success";
    },

    edit_doctor_error(state) {
        state.editDoctorStatus = "error";
    },

    edit_doctor(state, editDoctor) {
        state.doctorList = state.doctorList.filter((doctor) => {
            if (doctor.id == editDoctor.id) return editDoctor;
        });
    },

    selectedDoctor_empty(state) {
        state.selectedDoctor = "";
        state.isSelectedDoctor = false;
    },

    selectedDoctor_success(state, payload) {
        state.selectedDoctor = payload;
        state.isSelectedDoctor = true;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
