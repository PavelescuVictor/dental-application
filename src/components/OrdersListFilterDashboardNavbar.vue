<template>
    <div class="nav-wrapper">
        <nav class="nav">
            <div class="nav__ul-wrapper">
                <ul class="nav__ul-content">
                    <li id="doctor" @click="changeDisplayedPage">
                        <p>Doctor</p>
                    </li>
                    <li id="patient" @click="changeDisplayedPage">
                        <p>Pacient</p>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    name: "OrdersListFilterDashboardNavbar",
    methods: {
        changeDisplayedPage(event) {
            let id = event.currentTarget.id;
            this.$emit("updatePage", id);
        },
    },
};
</script>
<style scoped>
.nav-wrapper {
    height: 100%;
    background: #ffffff;
}
.nav {
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 6px solid var(--color-lightgrey-2);
}

.nav__ul-wrapper {
    height: 100%;
    margin: auto;
}

.nav__ul-content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    background: var(--color-lightgrey-2);
}

.nav__ul-content li {
    padding: 20px;
    background: #ffffff;
    transition: padding-top 0.1s ease-in, padding-bottom 0.1s ease-in,
        box-shadow 0.1s ease-in, background 0s ease-in,
        border-radius 0.1s ease-in, margin 0.1s ease-in;
    cursor: pointer;
}

.nav__ul-content li:hover {
    padding-top: 15px;
    padding-bottom: 25px;
    background: var(--color-lightgrey-3);
    box-shadow: 0px 6px 0px 0px var(--color-blue);
    border-radius: 10px;
    margin: 0px 6px;
}

.nav__ul-content li p {
    justify-self: center;
    align-self: center;
    font-size: 1.2rem;
    line-height: 1em;
    text-align: center;
    color: var(--color-darkblue);
}
</style>
