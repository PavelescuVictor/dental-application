<template>
    <div class="alertbox" v-show="elementVisible">
        <p v-if="(getAlert.type === 'success') & (getAlert.message != '')">
            {{ getAlert.message }}
        </p>

        <p v-if="(getAlert.type === 'info') & (getAlert.message != '')">
            {{ getAlert.message }}
        </p>

        <p v-if="(getAlert.type === 'alert') & (getAlert.message != '')">
            {{ getAlert.message }}
        </p>

        <p v-if="(getAlert.type === 'error') & (getAlert.message != '')">
            {{ getAlert.message }} >
        </p>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "Alerts",
    data() {
        return {
            elementVisible: false,
            alert: {},
        };
    },
    methods: {
        ...mapActions(["deleteAlert"]),
        displayAlert: function () {
            this.elementVisible = true;
            setTimeout(() => {
                this.elementVisible = false;
                this.deleteAlert();
            }, this.getAlert.time);
        },
    },
    computed: {
        ...mapGetters(["getAlertTypes", "getAlert", "getAlertEmpty"]),
    },
    watch: {
        getAlertEmpty: function () {
            if (this.getAlertEmpty === false) this.displayAlert();
        },
    },
};
</script>
<style scooped>
.alertbox {
    position: absolute;
    top: var(--navbar-height);
    left: 50%;
    transform: translate(-50%, 0);
    display: inline-block;
    width: fit-content;
    font-size: calc(var(--text-base-size) * 1.3);
    padding: 0.8em 0.5em;
    margin: 1em auto;
    background: -webkit-linear-gradient(
        -90deg,
        transparent 50%,
        var(--color-blue) 50%
    );
    background-size: 6.5em 6.5em;
    border: 3px solid var(--color-white);
    border-radius: 10px;
    animation: alertbox__slide-down 0.6s ease-in forwards,
        alertbox__fill 1s ease-out forwards;
    user-select: none;
}

.alertbox p {
    text-align: center;
    padding: 0 var(--padding-small);
    color: var(--color-white);
    opacity: 0%;
    letter-spacing: -10px;
    animation: alertbox__text-fade-in 0.4s ease-out forwards 0.4s;
}

@keyframes alertbox__fill {
    from {
        background-position: 0px 0px;
        border-radius: 10px;
    }

    to {
        background-position: 0px -70px;
        border-radius: var(--border-radius-circle);
    }
}

@keyframes alertbox__slide-down {
    0% {
        top: var(--navbar-height);
        padding: 0.8em 0.5em;
    }

    50% {
        top: calc(var(--navbar-height) * 2);
    }

    75% {
        padding: 0.1em 0.5em;
    }

    100% {
        top: calc(var(--navbar-height) * 1.7);
        padding: 0.8em 0.5em;
    }
}

@keyframes alertbox__text-fade-in {
    from {
        opacity: 0%;
        letter-spacing: -10px;
    }

    to {
        opacity: 100%;
        letter-spacing: 0.1em;
    }
}
</style>
