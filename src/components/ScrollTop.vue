<template>
    <div class="ScrollTop">
        <div class="back-top-button" @click="scrollTop">
            <font-awesome-icon icon="chevron-up" class="icon" />
        </div>
    </div>
</template>
<script>
export default {
    name: "ScrollTop",
    methods: {
        scrollTop() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        },
    },
};
</script>
<style scoped>
.back-top-button {
    position: fixed;
    width: 50px;
    height: 50px;
    right: 0;
    bottom: 0;
    background: var(--color-blue);
    margin: 0 1em 1em 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    animation: button-rotate 0.6s ease-in-out both;
    transition: border-radius 0.3s ease-in-out;
    z-index: 3;
    cursor: pointer;
}

.back-top-button:hover {
    border-radius: var(--border-radius-circle);
}

.back-top-button:hover > .icon {
    transform: rotate(360deg);
}

.back-top-button .icon {
    font-size: 2.3em;
    color: white;
    transition: transform 0.5s ease-in-out;
}

/* Animations */

@keyframes button-rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
