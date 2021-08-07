<template>
    <div class="confirmationbox" v-show="elementVisible">
        <div class="confirmationbox__underlay"></div>
        <div class="confirmationbox__content">
            <p>
                {{ getConfirmationMessage }}
            </p>
            <div class="confirmationbox__buttons">
                <div class="confirmationbox__buttons__content">
                    <div class="more-btn" @click="proceed">
                        <a>Proceed</a>
                    </div>
                    <div class="more-btn" @click="cancel">
                        <a>Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "Confirmation",
    data() {
        return {
            elementVisible: false,
        };
    },
    computed: {
        ...mapGetters(["getConfirmationVisibleFlag", "getConfirmationMessage"]),
    },
    methods: {
        ...mapActions(["proceedConfirmation", "cancelConfirmation"]),

        proceed: function() {
            this.proceedConfirmation();
        },

        cancel: function() {
            this.cancelConfirmation();
        },
    },
    watch: {
        getConfirmationVisibleFlag: function() {
            if (this.getConfirmationVisibleFlag === true) {
                this.elementVisible = true;
            } else this.elementVisible = false;
        },
    },
};
</script>
<style scooped>
.confirmationbox {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    z-index: 20;
}

.confirmationbox__underlay {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 85%;
    z-index: 20;
}

.confirmationbox__content {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr;
    justify-content: center;
    align-items: center;
    width: fit-content;
    font-size: calc(var(--text-base-size) * 1.3);
    padding: 0.8em 0.5em;
    margin: 1em auto;
    background: -webkit-linear-gradient(
        -90deg,
        transparent 50%,
        var(--color-blue) 50%
    );
    background-size: 200% 200%;
    border: 3px solid var(--color-blue);
    border-radius: 10px;
    animation: confirmationbox__slide-down 0.6s ease-in forwards,
        confirmationbox__fill 1s ease-out forwards;
    user-select: none;
    z-index: 20;
    overflow: hidden;
}

.confirmationbox__content p {
    margin: var(--margin-small);
    text-align: center;
    padding: 0 var(--padding-small);
    color: var(--color-white);
    opacity: 0%;
    letter-spacing: -10px;
    line-height: 100%;
    animation: confirmationbox__text-fade-in 0.4s ease-out forwards 0.4s;
}

.confirmationbox__buttons {
    position: relative;
    margin: auto;
    width: 50%;
    height: 80px;
}

.confirmationbox__buttons__content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translate(-50%, 110%);
    animation: confirmationbox__buttons 0.4s ease forwards 0.6s;
}

.more-btn {
    display: inline-block;
    width: 6.5em;
    margin: auto;
    font-size: var(--text-base-size);
    padding: 0.8em 0.5em;
    margin: 1em auto;
    text-align: center;
    background: -webkit-linear-gradient(
        -90deg,
        transparent 50%,
        var(--color-white) 50%
    );
    background-size: 6.5em 6.5em;
    border: 3px solid var(--color-white);
    border-radius: 10px;
    transition: width 0.2s ease-in, border-radius 0.2s ease-out,
        background-position 0.6s ease;
    cursor: pointer;
}

.more-btn:hover {
    width: 8.5em;
    background-position: 0px -60px;
    border-radius: var(--border-radius-circle);
}

.more-btn a {
    color: var(--color-white);
    transition: color 0.2s ease-in;
}

.more-btn:hover > a {
    color: var(--color-blue);
}

@keyframes confirmationbox__fill {
    from {
        background-position: 0px 0px;
        border-radius: 10px;
    }

    to {
        background-position: 0px -194px;
        border-radius: var(--border-radius-circle);
    }
}

@keyframes confirmationbox__slide-down {
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

@keyframes confirmationbox__text-fade-in {
    from {
        opacity: 0%;
        letter-spacing: -10px;
    }

    to {
        opacity: 100%;
        letter-spacing: 0.1em;
    }
}

@keyframes confirmationbox__buttons {
    from {
        transform: translate(-50%, 110%);
    }

    to {
        transform: translate(-50%, 0%);
    }
}
</style>
