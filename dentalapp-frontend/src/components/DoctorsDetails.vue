<template>
    <div class="doctorDetails">
        <Confirmation />
        <Alert />
        <div class="content">
            <div class="card__wrapper">
                <template>
                    <v-card min-width="100%" v-if="showDetails" class="card">
                        <div class="list__wrapper">
                            <ul class="list__content">
                                <li>
                                    <p>First Name</p>
                                    <p>{{ doctor.firstName }}</p>
                                </li>
                                <li>
                                    <p>Last Name</p>
                                    <p>{{ doctor.lastName }}</p>
                                </li>
                                <li>
                                    <p>Cabinet</p>
                                    <p>{{ doctor.cabinet }}</p>
                                </li>
                                <li>
                                    <p>Phone</p>
                                    <p>{{ doctor.phone }}</p>
                                </li>
                                <li>
                                    <p>Created At</p>
                                    <p>{{ doctor.createdAt }}</p>
                                </li>
                                <li>
                                    <p>Updated At</p>
                                    <p>{{ doctor.updatedAt }}</p>
                                </li>
                                <li>
                                    <p>Created By</p>
                                    <p>{{ doctor.createdBy }}</p>
                                </li>
                                <li>
                                    <p>Updated By</p>
                                    <p>{{ doctor.updatedBy }}</p>
                                </li>
                            </ul>
                        </div>
                    </v-card>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Confirmation from "../components/Confirmation.vue";
import Alert from "../components/Alert.vue";

export default {
    name: "DoctorsDetails",

    components: {
        Confirmation,
        Alert,
    },

    data() {
        return {
            doctor: "",
            showDetails: false,
            alert: {
                type: "",
                message: "",
                time: 0,
            },
        };
    },

    mounted() {
        if (this.getSelectedDoctor != "") {
            this.doctor = this.getSelectedDoctor;
            this.alert = {
                type: "success",
                message: "Selected doctor received",
            };
            this.addAlert(this.alert);
            this.showDetails = true;
        } else {
            this.alert = {
                type: "alert",
                message: "No doctor selected",
            };
            this.addAlert(this.alert);
            this.showDetails = false;
        }
    },

    computed: {
        ...mapGetters(["getSelectedDoctor"]),
    },

    methods: {
        ...mapActions(["addAlert", "addConfirmationMessage"]),
    },
};
</script>

<style scoped>
.content {
    position: relative;
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.card__wrapper {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
}

.card {
    background: var(--color-lightgrey-2);
}

.list__wrapper {
    width: fit-content;
    margin: auto;
}

.list__content {
    list-style-type: none;
    display: grid;
    grid-auto-rows: auto;
}

.list__content li {
    display: grid;
    grid-template-columns: minmax(150px, 1fr) 5fr;
    background: white;
    color: var(--color-darkblue);
    border-bottom: 2px solid var(--color-lightgrey-2);
}

.list__content li:first-child {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

.list__content li:last-child {
    border-bottom: 0px;
}

.list__content li p {
    padding: calc(var(--padding-small) * 0.5) !important;
    text-align: center;
}

.list__content li p:first-child {
    border-right: 2px solid var(--color-lightgrey-2);
}
</style>
