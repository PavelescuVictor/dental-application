<template>
    <div class="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    components: {},
};
</script>

<style>
/* IMPORT FONTS */

@import url("https://fonts.googleapis.com/css2?family=Fjalla+One&family=Pacifico&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");

:root {
    /* VARIABLES */

    /* TEXT/FONT */

    --text-base-size: 16px;
    --text-base-font: "Fjalla One", sans-serif;
    --text-logo-font: "Fredoka One", cursive;
    --text-navbar-font: "Roboto Condensed", sans-serif;
    --text-navbar-font: "Fredoka One", cursive;
    --text-base-line-height: var(--text-base-size);

    /* COLOR */

    --color-blue: #4c84ff;
    --color-blue-rgb: 76, 132, 255;
    --color-blue: #5602ca;
    --color-blue-rgb: 86, 2, 202;
    --color-darkblue: #454d61;
    --color-lightblue: #bedede;
    --color-lightgrey: #edf0ee;
    --color-lightgrey-2: #e7e9ee;
    --color-lightgrey-3: #f5f6fa;
    --color-green: #40cb9e;
    --color-lightgreen: #d1f1e6;
    --color-yellow: #f9c108;
    --color-red: #e63d3d;
    --color-lightyellow: #fff4cc;
    --color-white: #fff;
    --color-grey: #7e8989;

    /* BORDER */

    --border-radius-circle: 50px;

    /* MARGIN */

    --margin-small: 30px;
    --margin-medium: 60px;
    --margin-high: 90px;

    /* PADDING */

    --padding-small: 30px;
    --padding-medium: 60px;
    --padding-high: 90px;

    /* CUSTOM */

    --navbar-height: 8vh;
    --content-height: 100vh;
    --banner-height: 100vh;
    --footer-height: 12vh;
    --weather-height: 20vh;
    --gallery-height: calc(
        100vh -
            (
                var(--footer-height) + var(--banner-height) +
                    var(--weather-height)
            )
    );
    --banner-background-image: url("./assets/Background.svg");
    --banner-main: url("./assets/Main.svg");
    --banner-girl: url("./assets/Girl.svg");
    --banner-guy: url("./assets/Guy.svg");
}

* {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
}

body,
html {
    scroll-behavior: smooth;
    height: 100%;
    width: 100%;
    font-family: var(--text-base-font);
    font-size: var(--text-base-size);
    line-height: var(--text-base-line-height);
    background: rgb(249, 249, 249);
    color: #000;
}

a {
    color: white;
    text-decoration: none;
}

#app {
    min-height: 100vh;
    width: 100vw;
}

button:focus {
    outline: none;
}
</style>
