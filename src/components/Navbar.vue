<template>
    <div class="navbar">
        <div class="nav-wrapper">
            <nav class="nav">
                <div
                    class="nav__logo-text"
                    :style="logoStyle"
                    @click="redirectToHome"
                >
                    <h4>EviDent</h4>
                </div>
                <div class="nav__ul-wrapper">
                    <ul class="nav__ul-content">
                        <router-link to="/home">
                            <li>
                                <a :style="menuStyle">Acasa</a>
                            </li>
                        </router-link>
                        <router-link to="/doctors">
                            <li>
                                <a :style="menuStyle">Doctori</a>
                            </li>
                        </router-link>
                        <router-link to="/pacients">
                            <li>
                                <a :style="menuStyle">Pacienti</a>
                            </li>
                        </router-link>
                        <router-link to="/orders">
                            <li>
                                <a :style="menuStyle">Lucrari</a>
                            </li>
                        </router-link>
                    </ul>
                </div>
                <router-view />
            </nav>
        </div>
    </div>
</template>
<script>
export default {
    name: "Navbar",
    props: ["currentPage"],
    mounted: function() {
        if (this.currentPage === "home") {
            this.menuStyle.color = "var(--color-white)";
            this.logoStyle.color = "var(--color-white)";
        } else if (this.currentPage === "login") {
            this.menuStyle.color = "var(--color-blue)";
            this.logoStyle.color = "var(--color-white)";
        } else if (this.currentPage === "add-doctor") {
            this.menuStyle.color = "var(--color-blue)";
            this.logoStyle.color = "var(--color-white)";
        } else if (this.currentPage === "add-pacient") {
            this.menuStyle.color = "var(--color-blue)";
            this.logoStyle.color = "var(--color-white)";
        } else if (this.currentPage === "add-lucrare") {
            this.menuStyle.color = "var(--color-blue)";
            this.logoStyle.color = "var(--color-white)";
        } else {
            this.menuStyle.color = "var(--color-blue)";
            this.logoStyle.color = "var(--color-blue)";
        }
    },
    data() {
        return {
            isHome: "",
            menuStyle: {
                color: "",
            },
            logoStyle: {
                color: "",
            },
        };
    },
    methods: {
        redirectToHome: function() {
            if (this.$route.name != "home") {
                this.$router.push({ name: "home" });
            }
        },
    },
};
</script>
<style scoped>
.navbar {
    position: absolute;
    top: 0;
    z-index: 2;
    width: 100%;
    height: var(--navbar-height);
}

.nav-wrapper {
    height: 100%;
    transition: height 0.2s ease-in-out;
}

.nav {
    height: 100%;
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-columns: auto 1fr;
}

.nav__logo-text {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav__logo-text h4 {
    font-family: var(--text-logo-font);
    font-weight: 400;
    font-size: 1.8em;
    cursor: pointer;
    line-height: 100%;
}

.nav__ul-wrapper {
    height: 100%;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav__ul-content {
    display: flex;
    flex-direction: row;
}

.nav__ul-content li {
    list-style-type: none;
    padding: calc(var(--padding-small) / 2);
}

.nav__ul-content li a {
    font-size: 1.1em;
    font-family: var(--text-navbar-font);
    font-weight: bold;
    letter-spacing: 0.05em;
}
</style>
