<template>
    <div class="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: "App",
  components: {
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style>

    /* Fonts import */

    @import url('https://fonts.googleapis.com/css2?family=Fjalla+One&family=Pacifico&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

    :root {
        /* Variables */

        /* Text/Font */

        --text-base-size: 16px;
        --text-base-font: 'Fjalla One', sans-serif;
        --text-logo-font: 'Fredoka One', cursive;;
        --text-navbar-font: 'Roboto Condensed', sans-serif;
        --text-base-line-height: var(--text-base-size);

        /* Color */

        --color-blue: #4C84FF;
        --color-blue-rgb: 76, 132, 255;
        --color-lightgrey-1: #E7E9EE;
        --color-lightgrey-2: #F5F6FA;
        --color-darkblue: #454D61;
        --color-green: #40CB9E;
        --color-yellow: #F9C108;
        --color-lightyellow: #FFF4CC;
        --color-white: #fff;

        /* Border */

        --border-radius-circle: 50px;

        /* Margin */

        --margin-small: 30px;
        --margin-medium: 60px;
        --margin-high: 90px;

        /* Padding */

        --padding-small: 30px;
        --padding-medium: 60px;
        --padding-high: 90px;

        /* Custom */

        --navbar-height: 7vh;
        --content-height: 100vh;
        --banner-height: 100vh;
        --footer-height: 12vh;
        --weather-height: 20vh;
        --gallery-height: calc(100vh - (var(--footer-height) + var(--banner-height) + var(--weather-height)));
        --banner-background-image: url("./assets/asdasd.png");
    }

    * {
        box-sizing: border-box;
        margin: 0px;
        padding: 0px;
    } 

    body, html {
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
</style>
