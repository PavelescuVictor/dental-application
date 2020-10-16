<template>
    <div class="nav-wrapper">
        <nav class="nav">
            <div class="nav__ul-wrapper">
                <ul class="nav__ul-content">
                    <li id="list" @click="changeDisplayedPage">
                        <a href="#">
                            <font-awesome-icon :icon="['fas', 'list']" />
                        </a>
                        <p>Lista</p>
                    </li>

                    <li id="details" @click="changeDisplayedPage">
                        <a href="#">
                            <font-awesome-icon :icon="['fas', 'user']" />
                        </a>
                        <p>Detalii</p>
                    </li>

                    <router-link to="/doctors/add_doctor">
                        <li id="add" @click="changeDisplayedPage">
                            <a href="#">
                                <font-awesome-icon :icon="['fas', 'plus']" />
                            </a>
                            <p>Adaugare</p>
                        </li>
                    </router-link>

                    <li id="edit" @click="changeDisplayedPage">
                        <a href="#">
                            <font-awesome-icon :icon="['fas', 'edit']" />
                        </a>
                        <p>
                            Editare
                        </p>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    name: "DoctorsDashboardNavbar",
    methods: {
        changeDisplayedPage(event) {
            let id = event.currentTarget.id;
            this.$emit("updatePage", id);
        },
    },
};
</script>
<style scoped>
a {
    color: var(--color-darkblue-2);
}

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
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: 10px;
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
.nav__ul-content li a {
    justify-self: center;
    align-self: center;
    font-size: 1.5rem;
    text-align: center;
    color: var(--color-darkblue);
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
