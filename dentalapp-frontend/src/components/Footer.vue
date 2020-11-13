<template>
    <div class="footer-wrapper">
        <div class="footer-content">
            <div class="footer-content-top">
                <a href="http://www.facebook.com" alt="Facebook"
                    ><font-awesome-icon :icon="['fab', 'facebook-f']"
                /></a>
                <a href="http://www.twitter.com" alt="Twitter"
                    ><font-awesome-icon :icon="['fab', 'twitter']"
                /></a>
                <a href="http://www.youtube.com" alt="Youtube"
                    ><font-awesome-icon :icon="['fab', 'youtube']"
                /></a>
                <a href="http://www.instagram.com" alt="Instagram"
                    ><font-awesome-icon :icon="['fab', 'instagram']"
                /></a>
                <a href="http://www.linkedIn.com" alt="LinkedIn"
                    ><font-awesome-icon :icon="['fab', 'linkedin-in']"
                /></a>
            </div>
            <div class="footer-content-bottom">
                <h4>© 2020 Pavelescu Victor. All Rights Reserved</h4>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Footer",
};
</script>
<style scoped>
.footer-wrapper {
    height: var(--footer-height);
    background: var(--color-blue);
    z-index: 2;
}
.footer-content {
    height: 100%;
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-rows: 2fr 1fr;
    justify-content: center;
    align-items: center;
}

.footer-content-top {
    height: 100%;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: calc(100 * var(--textBaseSize));
    font-family: var(--nav-font);
    color: var(--color-darkblue-2);
    list-style-type: none;
}

.footer-content-top a {
    position: relative;
    padding: calc(var(--padding-small) / 2.5);
    font-size: 2.2rem;
    transition: padding 0.2s ease-in, box-shadow 0.2s ease-in,
        background 0s ease-in, border-radius 0.2s ease-in, margin 0.2s ease-in;
}

.footer-content-top a:hover {
    background: var(--color-white);
    color: var(--color-blue);
    padding-left: calc(var(--padding-small) / 2.5);
    padding-right: calc(var(--padding-small) / 2.5);
    padding-bottom: 0px;
    padding-top: calc(var(--padding-small) / 2);
    box-shadow: 0px 6px 0px 0px var(--color-white);
    border-radius: 10px;
    margin: 0px 10px;
}

.footer-content-bottom {
    margin: auto;
    font-size: 0.9em;
    color: white;
    cursor: default;
    user-select: none;
}
/*
.footer-wrapper {
    height: var(--footer-height);
    width: 100vw;
    background: var(--color-blue);
}

.footer-content {
    width: 90%;
    height: 100%;
    margin: auto;
    background: var(--color-blue);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.footer-content-top {
    height: 75%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.footer-content-top a {
    font-size: 1.8em;
    margin-right: 2em;
}

.footer-content-top a:last-child {
    margin-right: 0;
}

.footer-content-top a:hover {
    animation: slide-top 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.footer-content-bottom {
    height: 25%;
    width: 100%;
}

.footer-wrapper .footer-content-bottom h4 {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    font-size: 0.9em;
    color: white;
    margin: auto;
}
*/
/* Animations */

@keyframes slide-top {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-10px);
    }
}
</style>
