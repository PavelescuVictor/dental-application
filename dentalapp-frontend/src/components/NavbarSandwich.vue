<template>
    <div class="navbar">
        <div class="navbar__wrapper">
            <nav class="nav">
                <div
                    class="nav__logo"
                    :style="logoStyle"
                    @click="redirectToHome"
                >
                    <h4>EviDent</h4>
                </div>
                <div class="nav__menu">
                    <ul :class="menuClass">
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
                        <router-link to="/patients">
                            <li>
                                <a :style="menuStyle">Pacienti</a>
                            </li>
                        </router-link>
                        <router-link to="/orders">
                            <li>
                                <a :style="menuStyle">Lucrari</a>
                            </li>
                        </router-link>
                        <router-link to="/admin" v-if="showAdminButton">
                            <li>
                                <a :style="menuStyle">Administrator</a>
                            </li>
                        </router-link>
                        <router-link to="/logout" v-if="showLogoutButton">
                            <li>
                                <a :style="menuStyle">Logout</a>
                            </li>
                        </router-link>
                        <router-link to="/login" v-if="showLoginButton">
                            <li>
                                <a :style="menuStyle">Login</a>
                            </li>
                        </router-link>
                        <router-link to="/profile" v-if="showProfileButton">
                            <li>
                                <a :style="menuStyle">Profile</a>
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
import { mapGetters, mapActions } from "vuex";
export default {
    name: "Navbar",
    mounted: function() {
        if (this.isLoggedIn) {
            this.showLogoutButton = true;
            this.showProfileButton = true;
            this.showLoginButton = false;
        }
        if (this.isAdmin) this.showAdminButton = true;
        let currentPage = this.$route.name;
        this.logoStyle.color = this.navbarColorScheme[currentPage][0];
        this.menuStyle.color = this.navbarColorScheme[currentPage][1];
        this.menuClass =
            this.menuClass + this.navbarColorScheme[currentPage][2];
    },
    data() {
        return {
            menuStyle: {
                color: "",
            },
            logoStyle: {
                color: "",
            },
            menuClass: "menu__content",
            showLogoutButton: false,
            showAdminButton: false,
            showProfileButton: false,
            showLoginButton: true,
        };
    },
    methods: {
        ...mapActions(["logout"]),
        redirectToHome: function() {
            if (this.$route.name != "home") {
                this.$router.push({ name: "home" });
            }
        },
    },
    computed: {
        ...mapGetters(["isLoggedIn", "isAdmin", "navbarColorScheme"]),
    },
};
</script>
<style scoped>
.navbar {
    height: var(--navbar-height);
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
}

.navbar__wrapper {
    height: 100%;
}

.nav {
    height: 100%;
    width: 90%;
    margin: auto;
    display: flex;
}

.nav__logo {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.nav__logo h4 {
    font-family: var(--text-logo-font);
    font-weight: 400;
    font-size: 1.8em;
    cursor: pointer;
    line-height: 100%;
}

.nav__menu {
    height: 100%;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.menu__content {
    display: flex;
}

.menu__content li {
    list-style-type: none;
    padding: calc(var(--padding-small) / 2);
    transition: box-shadow 0.2s ease-out, border-radius 0.2s ease-in,
        margin 0.1s ease-in;
}

.menu__content li:hover {
    box-shadow: 0px 5px 0px 0px var(--color-white);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin: 0px 6px;
}

.menu__content li a {
    font-size: 1.1em;
    font-family: var(--text-navbar-font);
    font-weight: bold;
    letter-spacing: 0.05em;
    color: white;
}

.menu__content--block {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.menu__content--block li {
    position: relative;
    list-style-type: none;
    padding: calc(var(--padding-small) / 2);
    transition: padding-top 0.2s ease-in, padding-bottom 0.2s ease-in,
        box-shadow 0.2s ease-out, background 0s ease-in,
        border-radius 0.2s ease-in, margin 0.1s ease-in;
}

.menu__content--block li:hover {
    background: var(--color-white);
    padding-top: calc(0.75 * var(--padding-small));
    padding-bottom: calc(0.75 * var(--padding-small));
    box-shadow: 0px 5px 0px 0px var(--color-blue);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin: 0px 6px;
}

.menu__content--block li a {
    font-size: 1.1em;
    font-family: var(--text-navbar-font);
    font-weight: bold;
    letter-spacing: 0.05em;
    color: white;
}
</style>
