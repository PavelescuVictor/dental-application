<template>
    <div class="ordersListFilterDashboard">
        <div class="ordersListFilterDashboard__content">
            <OrdersListFilterDashboardNavbar
                @updatePage="changeDisplayedPage"
            />
            <div class="content__wrapper">
                <div class="doctors-list" v-if="isDoctorActive">
                    <OrdersListFilterDoctorsList />
                </div>
                <div class="patients-list" v-if="isPatientActive">
                    <OrdersListFilterPatientsList />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OrdersListFilterDashboardNavbar from "../components/OrdersListFilterDashboardNavbar.vue";
import OrdersListFilterDoctorsList from "../components/OrdersListFilterDoctorsList";
import OrdersListFilterPatientsList from "../components/OrdersListFilterPatientsList";

export default {
    name: "OrderListFilterDashboard",

    components: {
        OrdersListFilterDashboardNavbar,
        OrdersListFilterDoctorsList,
        OrdersListFilterPatientsList,
    },

    data() {
        return {
            showedPage: "doctor",
            isDoctorActive: true,
            isPatientActive: false,
            alert: {
                type: "",
                message: "",
                time: 0,
            },
        };
    },

    methods: {
        changeDisplayedPage(e) {
            this.showedPage = e;
        },
    },

    watch: {
        showedPage: function(val) {
            if (val === "doctor") {
                this.isDoctorActive = true;
                this.isPatientActive = false;
            } else if (val === "patient") {
                this.isPatientActive = true;
                this.isDoctorActive = false;
            }
        },
    },
};
</script>

<style scoped>
.ordersListFilterDashboard {
    display: flex;
    position: relative;
    overflow: hidden;
    justify-content: center;
    background: var(--color-lightgrey-2);
}

.ordersListFilterDashboard__content {
    z-index: 2;
    width: 0%;
    height: fit-content;
    display: grid;
    grid-template-rows: auto 1fr;
    padding: var(--padding-1);
    background: var(--color-lightgrey-2);
    overflow: hidden;
    animation: ordersDashboard__expand 0.4s ease-in forwards;
}

.content__wrapper {
    border-bottom-left-radius: var(--border-radius-1);
    border-bottom-right-radius: var(--border-radius-1);
    overflow: hidden;
}

/* ANIMATIONS*/

@keyframes content__overlay__slide-up {
    from {
        top: 0%;
    }

    to {
        top: -100%;
    }
}

@keyframes content__overlay__fade-out {
    0% {
        opacity: 100%;
    }

    100% {
        opacity: 0%;
    }
}

@keyframes content__overlay__slide-right {
    from {
        right: 0%;
    }

    to {
        right: -100%;
    }
}

@keyframes content__overlay__slide-left {
    from {
        left: 0%;
    }

    to {
        left: -100%;
    }
}

@keyframes ordersDashboard__expand {
    from {
        width: 0%;
    }

    to {
        width: 100%;
    }
}
</style>
