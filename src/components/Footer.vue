<template>
    <div class="footer-wrapper">
        <div class="footer-content">
            <div class="footer-content-top">
                <a href="http://www.facebook.com" alt="Facebook"><font-awesome-icon :icon="['fab', 'facebook-f']" /></a>
                <a href="http://www.twitter.com" alt="Twitter"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
                <a href="http://www.youtube.com" alt="Youtube"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
                <a href="http://www.instagram.com" alt="Instagram"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
                <a href="http://www.linkedIn.com" alt="LinkedIn"><font-awesome-icon :icon="['fab', 'linkedin-in']" /></a>
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
}
</script>
<style scoped>
    .footer-wrapper{
        height: var(--footer-height);
        width: 100vw;
        background: var(--color-blue);
    }

    .footer-content{
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

    .footer-content-top a{
        font-size: 1.8em;
        margin-right: 2em;
    }

    .footer-content-top a:last-child{
        margin-right: 0;
    }

    .footer-content-top a:hover {
        animation:  slide-top 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

    .footer-content-bottom{
        height: 25%;
        width: 100%;
    }

    .footer-wrapper .footer-content-bottom h4{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        font-size: 0.9em;
        color: white;
        margin: auto;
    }

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