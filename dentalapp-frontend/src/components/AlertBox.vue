<template>
    <div class="alertbox" v-if="!getAlertListEmpty" :class="getLatestAlert.type">
        <p v-if="(getLatestAlert.type === 'success') & (getLatestAlert.message != '')"  @click="removeAlert(getLatestAlert)">
            {{ getLatestAlert.message }}
        </p>

        <p v-if="(getLatestAlert.type === 'info') & (getLatestAlert.message != '')"  @click="removeAlert(getLatestAlert)">
            {{ getLatestAlert.message }}
        </p>

        <p v-if="(getLatestAlert.type === 'alert') & (getLatestAlert.message != '')"  @click="removeAlert(getLatestAlert)">
            {{ getLatestAlert.message }}
        </p>

        <p v-if="(getLatestAlert.type === 'error') & (getLatestAlert.message != '')"  @click="removeAlert(getLatestAlert)">
            {{ getLatestAlert.message }}
        </p>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "AlertBox",
    props: ['alertBoxType'],

    data() {
        return {};
    },

    methods: {
        ...mapActions(["deleteAlert", "resetAlertBox"]),

        removeAlert: function(alert) {
            this.deleteAlert(alert);
        },
    },
    computed: {
        ...mapGetters(["getLatestAlert", "getAlertListEmpty"]),
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
    z-index: 10;
}

.alertbox p {
    cursor: pointer;
    text-align: center;
    padding: 0 var(--padding-small);
    color: var(--color-white);
    font-size: 1.2rem;
    opacity: 0%;
    letter-spacing: -10px;
    animation: alertbox__text-fade-in 0.4s ease-out forwards 0.4s;
}

.success {
    background: -webkit-linear-gradient(
        -90deg,
        transparent 50%,
        var(--color-green) 50%
    );
    background-size: 6.5em 6.5em;
    border-color: var(--color-green);
}

.success p {
    color: var(--color-white);
}

.info {
    background: -webkit-linear-gradient(
        -90deg,
        transparent 50%,
        var(--color-white) 50%
    );
    background-size: 6.5em 6.5em;
    border-color: var(--color-white);
}

.info p {
    color: var(--color-darkblue);
}

.alert {
    background: -webkit-linear-gradient(
        -90deg,
        transparent 50%,
        var(--color-yellow) 50%
    );
    background-size: 6.5em 6.5em;
    border-color: var(--color-yellow);
}

.alert p {
    color: var(--color-white);
}

.error {
    background: -webkit-linear-gradient(
        -90deg,
        transparent 50%,
        var(--color-red) 50%
    );
    background-size: 6.5em 6.5em;
    border-color: var(--color-red);
}

.error p {
    color: var(--color-white);
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
        opacity: 0;
        letter-spacing: -10px;
    }

    to {
        opacity: 1;
        letter-spacing: 0.1em;
    }
}
</style>
