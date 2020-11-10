<template>
    <div class="orderTypeEntriesAdd">
        <Confirmation />
        <Alert />
        <v-app id="vapp" v-if="showEdit">
            <div class="content">
                <div class="form__wrapper">
                    <v-form
                        class="form"
                        ref="form"
                        v-model="valid"
                        :lazy-validation="lazy"
                        @submit="handleSubmit"
                    >
                        <v-container class="form__entries__wrapper">
                            <div class="form__entries">
                                <v-row>
                                    <v-col>
                                        <v-select
                                            v-model="selectedType"
                                            :items="types"
                                            label="Type"
                                            item-text="type"
                                            item-value="type"
                                            return-object
                                            single-line
                                            :rules="rules.selectedType"
                                        ></v-select>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" md="3">
                                        <v-select
                                            v-model="selectedColor"
                                            :items="colors"
                                            label="Color"
                                            item-text="color"
                                            item-value="color"
                                            return-object
                                            single-line
                                            :rules="rules.selectedColor"
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" md="3">
                                        <v-select
                                            v-model="selectedStatus"
                                            :items="status"
                                            label="Status"
                                            item-text="status"
                                            item-value="status"
                                            return-object
                                            single-line
                                            :rules="rules.selectedStatus"
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" md="2">
                                        <v-text-field
                                            v-model="unitCount"
                                            type="number"
                                            label="Unit Count"
                                            :rules="rules.unitCount"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2">
                                        <v-text-field
                                            v-model="warranty"
                                            type="number"
                                            label="Warranty"
                                            :rules="rules.warranty"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="1">
                                        <v-checkbox
                                            v-model="paid"
                                            label="Paid"
                                        ></v-checkbox>
                                    </v-col>

                                    <v-col cols="12" md="1">
                                        <v-checkbox
                                            v-model="redo"
                                            label="Redo"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-container>

                        <div class="form__buttons">
                            <button
                                class="more-btn"
                                :disabled="!valid"
                                @click="handleSubmit"
                                type="submit"
                            >
                                <a>Submit</a>
                            </button>
                            <button
                                class="more-btn"
                                @click="handleReset"
                                type="reset"
                                :disabled="!empty"
                            >
                                <a>Reset Form</a>
                            </button>
                        </div>
                    </v-form>
                </div>
            </div>
        </v-app>
    </div>
</template>

<script>
import Alert from "../components/Alert.vue";
import Confirmation from "../components/Confirmation.vue";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "OrderTypeEntryEdit",

    components: {
        Alert,
        Confirmation,
    },

    data: () => ({
        showEdit: false,
        valid: true,
        empty: true,
        selectedType: "",
        selectedStatus: "",
        selectedColor: "",
        types: [],
        colors: [],
        status: [],
        unitCount: 1,
        warranty: 0,
        redo: false,
        paid: false,
        rules: {
            required: [(value) => !!value || "Required"],
            selectedColor: [(value) => !!value || `First name is required.`],
            selectedType: [(value) => !!value || `Last name is required.`],
            selectedStatus: [(value) => !!value || `First name is required.`],
            unitCount: [
                (value) => value > 1 || `Unit count cannot be bellow 1.`,
            ],
            warranty: [(value) => value >= 0 || `Warranty cannot be bellow 0.`],
        },
        lazy: false,
    }),

    async mounted() {
        if (this.getSelectedOrder != "") {
            this.showEdit = true;

            this.order = this.getSelectedOrder;

            this.alert = {
                type: "success",
                message: "Selected order type entry received",
            };

            this.addAlert(this.alert);

            await this.getData();
        } else {
            this.alert = {
                type: "alert",
                message: "No order type selected",
            };

            this.addAlert(this.alert);

            this.showEdit = false;
        }
    },

    computed: {
        ...mapGetters([
            "getSelectedOrderTypeEntry",
            "getSelectedOrder",
            "getSelectedDoctor",
            "getSelectedPatient",
            "getOrderColorsList",
            "getOrderTypesList",
            "getOrderStatusList",
            "userId",
        ]),
    },

    methods: {
        ...mapActions([
            "addAlert",
            "requestOrderColorsList",
            "requestOrderTypesList",
            "requestOrderStatusList",
            "addOrderTypeEntry",
            "removeSelectedOrderTypeEntry",
        ]),

        handleSubmit(e) {
            e.preventDefault();

            let payload = {
                order: this.order.id,
                color: this.selectedColor.id,
                type: this.selectedType.id,
                status: this.selectedStatus.id,
                unitCount: this.unitCount,
                warranty: this.warranty,
                paid: this.paid,
                redo: this.redo,
                createdBy: this.userId,
                updatedBy: this.userId,
            };

            this.addOrderTypeEntry(payload)
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.alert = {
                        type: type,
                        message: "Order Type Entries edited!",
                    };
                    this.addAlert(this.alert);
                    this.$emit("updatePage", "list");
                })
                .catch((error) => {
                    let message = "";
                    let errors = error.response.data;

                    for (let prop in errors) {
                        message = message + prop + ": " + errors[prop] + "\n";
                    }

                    this.alert = {
                        type: "error",
                        message: message,
                    };
                    this.addAlert(this.alert);
                });
        },

        handleReset() {
            this.$refs.form.reset();
        },

        getData: async function() {
            await this.requestOrderColorsList()
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.alert = {
                        type: type,
                        message: "Order Colors data received!",
                    };
                    this.addAlert(this.alert);
                })
                .catch((error) => {
                    this.alert = {
                        type: "error",
                        message: error,
                    };
                    this.addAlert(this.alert);
                });

            await this.requestOrderStatusList()
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.newAlert = {
                        type: type,
                        message: "Order Status data received!",
                    };
                    this.addAlert(this.alert);
                })
                .catch((error) => {
                    this.alert = {
                        type: "error",
                        message: error,
                    };
                    this.addAlert(this.alert);
                });

            await this.requestOrderTypesList()
                .then((response) => {
                    const status = response.status;
                    let type;
                    if (status == "200") type = "success";
                    this.newAlert = {
                        type: type,
                        message: "Order Types data received!",
                    };
                    this.addAlert(this.alert);
                })
                .catch((error) => {
                    this.alert = {
                        type: "error",
                        message: error,
                    };
                    this.addAlert(this.alert);
                });

            this.colors = this.getOrderColorsList;
            this.status = this.getOrderStatusList;
            this.types = this.getOrderTypesList;
        },
    },
};
</script>
<style scoped>
#vapp {
    font-family: var(--text-base-font);
    background: var(--color-lightgrey-1);
    color: var(--color-darkblue);
    margin: 0px;
    padding: 0px;
    display: block;
    line-height: inherit;
}

.content {
    position: relative;
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.form__wrapper {
    height: 100%;
    display: grid;
    grid-template-rows: auto;
    padding: var(--padding-small) 0px;
}

.form__wrapper p {
    justify-self: center;
    align-self: center;
    color: var(--color-darkblue);
    font-size: 1.8rem;
    line-height: 1.8rem;
    padding: var(--padding-small);
    animation: form__wrapper__p__scale 0.5s ease-in-out forwards;
}

.form {
    width: 100%;
    display: grid;
    margin: auto;
    grid-template-rows: auto auto auto 1fr;
    align-content: space-between;
    animation: form__wrapper__form__width 0.5s ease-in-out forwards;
}

.form__entries__wrapper {
    padding: 0px;
}

.form__entries {
    background: white;
    margin-bottom: 6px;
    padding: var(--padding-small);
    border-radius: 15px;
}

.form__entries__button {
    display: flex;
    justify-content: center;
}

.entry__remove-btn {
    display: inline-block;
    font-size: calc(var(--text-base-size) * 2);
    border: 3px solid var(--color-white);
    border-radius: var(--border-radius-circle);
    transition: border-color 0.1s ease-in-out, background-color 0.1s ease-in-out,
        transform 0.4s ease-out;
}

.entry__remove-btn:hover {
    transform: rotate(360deg);
    background-color: var(--color-blue);
    border-color: var(--color-blue);
}

.entry__remove-btn a {
    color: var(--color-blue);
    transition: color 0.1s ease-in-out;
}

.entry__remove-btn:hover > a {
    color: var(--color-white);
}

.form__buttons {
    justify-self: center;
}

.form__add-button {
    margin: auto;
}

.more-btn {
    display: inline-block;
    width: 8.5em;
    font-size: calc(var(--text-base-size) * 1.2);
    background: -webkit-linear-gradient(
        -90deg,
        var(--color-white) 50%,
        var(--color-blue) 50%
    );
    background-size: 6.5em 6.5em;
    border: 3px solid var(--color-white);
    border-radius: 10px;
    margin: calc(var(--padding-small) / 2);
    transition: width 0.2s ease-in, border-radius 0.2s ease-out,
        background-position 0.6s ease, border-color 0s ease-in;
}

.more-btn:hover {
    width: 8.5em;
    background-position: 0px -70px;
    border-radius: var(--border-radius-circle);
    border-color: var(--color-blue);
}

.more-btn a {
    color: var(--color-blue);
    transition: color 0.2s ease-in;
}

.more-btn:hover > a {
    color: var(--color-white);
}

@keyframes form__wrapper__p__scale {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes form__wrapper__form__width {
    from {
        padding-top: calc(var(--padding-high) * 1);
    }

    to {
        padding-top: 0px;
    }
}
</style>
