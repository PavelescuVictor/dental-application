<template>
    <div class="orderTypeEntriesDashboard">
        <div class="orderTypeEntriesDashboard__content">
            <OrderTypeEntriesDashboardNavbar
                @updatePage="changeDisplayedPage"
            />
            <div class="content__wrapper">
                <div class="list" v-if="isListActive">
                    <OrderTypeEntriesList @redirectEdit="displayEdit" />
                </div>
                <div class="details" v-if="isDetailsActive">
                    <OrderTypeEntriesDetails />
                </div>
                <div class="edit" v-if="isEditActive">
                    <OrderTypeEntriesEdit @updatePage="changeDisplayedPage" />
                </div>
                <div class="add" v-if="isAddActive">
                    <OrderTypeEntriesAdd @updatePage="changeDisplayedPage" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import OrderTypeEntriesList from "../components/OrderTypeEntriesList.vue";
import OrderTypeEntriesDetails from "../components/OrderTypeEntriesDetails.vue";
import OrderTypeEntriesEdit from "../components/OrderTypeEntriesEdit.vue";
import OrderTypeEntriesAdd from "../components/OrderTypeEntriesAdd.vue";
import OrderTypeEntriesDashboardNavbar from "../components/OrderTypeEntriesDashboardNavbar.vue";
export default {
    name: "OrdersDashboard",
    components: {
        OrderTypeEntriesDashboardNavbar,
        OrderTypeEntriesList,
        OrderTypeEntriesDetails,
        OrderTypeEntriesAdd,
        OrderTypeEntriesEdit,
    },
    data() {
        return {
            showedPage: "list",
            isListActive: true,
            isDetailsActive: false,
            isEditActive: false,
            isAddActive: false,
        };
    },

    destroyed() {
        this.removeSelectedOrderTypeEntry();
    },

    methods: {
        changeDisplayedPage(e) {
            this.showedPage = e;
        },

        displayEdit: function() {
            this.showedPage = "edit";
        },
    },

    watch: {
        showedPage: function(val) {
            if (val === "list") {
                this.isListActive = true;
                this.isDetailsActive = false;
                this.isEditActive = false;
                this.isAddActive = false;
            } else if (val === "details") {
                this.isListActive = false;
                this.isDetailsActive = true;
                this.isEditActive = false;
                this.isAddActive = false;
            } else if (val === "edit") {
                this.isListActive = false;
                this.isDetailsActive = false;
                this.isEditActive = true;
                this.isAddActive = false;
            } else if (val === "add") {
                this.isListActive = false;
                this.isDetailsActive = false;
                this.isEditActive = false;
                this.isAddActive = true;
            }
        },
    },
};
</script>
<style scoped>
.ordersDashboard__content {
    z-index: 2;
    width: 0%;
    height: fit-content;
    display: grid;
    grid-template-rows: auto 1fr;
    padding: var(--padding-1);
    background: var(--color-lightgrey-2);
    border-radius: 15px;
    overflow: hidden;
    animation: ordersDashboard__expand 0.6s ease-in forwards 0.2s;
}

.content__wrapper {
    border-bottom-left-radius: var(--border-radius-1);
    border-bottom-right-radius: var(--border-radius-1);
    overflow: hidden;
}

.list {
    height: 100%;
    background: var(--color-lightgrey-3);
}

.details {
    height: 100%;
    background: var(--color-lightgrey-3);
}

.add {
    height: 100%;
    background: var(--color-lightgrey-3);
}

.edit {
    height: 100%;
    background: var(--color-lightgrey-3);
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
