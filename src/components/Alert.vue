<template>
    <div class="alerts">
        <v-alert
            type="success"
            v-if="(alert.type === 'success') & (alert.message != '')"
            v-show="elementVisible"
            dismissible
            >{{ alert.message }}</v-alert
        >

        <v-alert
            type="info"
            v-if="(alert.type === 'info') & (alert.message != '')"
            v-show="elementVisible"
            dismissible
            >{{ alert.message }}</v-alert
        >

        <v-alert
            type="warning"
            v-if="(alert.type === 'alert') & (alert.message != '')"
            v-show="elementVisible"
            dismissible
            >{{ alert.message }}</v-alert
        >

        <v-alert
            type="error"
            v-if="(alert.type === 'error') & (alert.message != '')"
            v-show="elementVisible"
            dismissible
            >{{ alert.message }}</v-alert
        >
    </div>
</template>
<script>
export default {
    name: "Alerts",
    props: ["alert"],
    data() {
        return {
            elementVisible: false,
        };
    },
    watch: {
        alert: function() {
            this.elementVisible = true;
            setTimeout(() => (this.elementVisible = false), this.alert.time);
        },
    },
};
</script>
<style scooped>
.alerts {
    position: absolute;
    top: var(--navbar-height);
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
