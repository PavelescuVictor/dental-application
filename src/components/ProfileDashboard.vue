<template>
    <div class="profileDashboard">
        <div class="profileDashboard__overlay">
            <div class="overlay__top"></div>
            <div class="overlay__left"></div>
            <div class="overlay__right"></div>
        </div>
        <div class="profileDashboard__content">
            <ProfileDashboardNavbar @updatePage="changeDisplayedPage" />
            <div class="content__wrapper">
                <div
                    class="details"
                    v-bind:class="{ notDisplayedPage: !isDetailsActive }"
                >
                    <ProfileDetails />
                </div>
                <div
                    class="edit"
                    v-bind:class="{ notDisplayedPage: !isEditActive }"
                ></div>
            </div>
        </div>
    </div>
</template>
<script>
import ProfileDetails from "../components/ProfileDetails.vue";
import ProfileDashboardNavbar from "../components/ProfileDashboardNavbar.vue";
import { mapGetters } from "vuex";
export default {
    name: "ProfileDashboard",

    components: {
        ProfileDetails,
        ProfileDashboardNavbar,
    },

    data() {
        return {
            showedPage: "details",
            isDetailsActive: true,
            isEditActive: false,
        };
    },

    methods: {
        changeDisplayedPage(e) {
            this.showedPage = e;
        },
    },

    computed: {
        ...mapGetters(["userProfile"]),
    },

    watch: {
        userProfile: function() {
            if (this.userProfile != "") {
                console.log(this.userProfile);
            }
        },

        showedPage: function(val) {
            if (val === "details") {
                this.isDetailsActive = true;
                this.isEditActive = false;
            } else if (val === "edit") {
                this.isDetailsActive = false;
                this.isEditActive = true;
            }
        },
    },
};
</script>

<style scoped>
.profileDashboard {
    min-height: var(--banner-height);
    display: flex;
    padding: 16em 4em 6em 4em;
    background-image: var(--banner-background-image);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    justify-content: center;
}

.profileDashboard:before {
    display: block;
    height: 100%;
    width: 100%;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    transition: opacity 3s ease;
    transition-delay: 1s;
    background-color: rgba(var(--color-blue-rgb), 0.9);
    z-index: 1;
}

.profileDashboard__overlay {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
}

.overlay__top {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0%;
    left: 0px;
    background-color: var(--color-blue);
    animation: content__overlay__slide-up 0.8s ease-out forwards 0.2s,
        content__overlay__fade-out 1.4s ease forwards 0.3s;
    z-index: 2;
}

.overlay__left {
    height: 100%;
    width: 50%;
    position: absolute;
    top: 0px;
    left: -100%;
    background-color: white;
    animation: content__overlay__slide-left 1s ease-in forwards;
    z-index: 2;
}

.overlay__right {
    height: 100%;
    width: 50%;
    position: absolute;
    top: 0px;
    right: -100%;
    background-color: white;
    animation: content__overlay__slide-right 1s ease-in forwards;
    z-index: 2;
}

.profileDashboard__content {
    z-index: 2;
    width: 0%;
    height: fit-content;
    display: grid;
    grid-template-rows: auto 1fr;
    padding: var(--padding-1);
    background: var(--color-lightgrey-2);
    border-radius: 15px;
    overflow: hidden;
    animation: profileDashboard__expand 0.6s ease-in forwards 0.2s;
}

.content__wrapper {
    border-bottom-left-radius: var(--border-radius-1);
    border-bottom-right-radius: var(--border-radius-1);
    overflow: hidden;
}

.details {
    height: 100%;
    background: var(--color-lightgrey-3);
}

.edit {
    height: 100%;
    background: var(--color-lightgrey-3);
}

/* UTILITY CLASSES */

.notDisplayedPage {
    display: none;
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

@keyframes profileDashboard__expand {
    from {
        width: 0%;
    }

    to {
        width: 100%;
    }
}
</style>
