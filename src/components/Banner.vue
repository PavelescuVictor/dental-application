<template>
    <div class="banner">
        <div class="banner-inner">
            <div class="banner-inner-content">
                <h1>Evident</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae atque ex quas nam recusandae repellat!</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque molestiae error fugit blanditiis consequatur praesentium.</p>
                <div class="more-btn">
                    <a href="https://www.google.com">Learn More</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Banner",
    }
</script>
<style scoped>
    .banner {
        min-height: var(--banner-height);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 8em 4em 6em 4em;
        background-image: var(--banner-background-image);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        overflow: hidden;
    }

    .banner-inner {
        z-index: 2;
        width: 100%;
    }

    .banner-inner-content{
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .banner-inner-content h1 {
        color: #fff;
        font-size: calc(var(--text-base-size) * 6);
        font-family: var(--text-logo-font);
        line-height: calc(var(--text-base-line-height) * 6);
        padding: var(--padding-small) var(--padding-high);
        font-weight: 400;
        animation: banner__text__logo 1s 1;
    }

    .banner-inner-content p {
        color: #fff;
        font-size: calc(var(--text-base-size) * 1.2);
        line-height: calc(var(--text-base-line-height) * 1.2);
        padding: 10px;
        animation: banner__text__p 1s 1;
    }

    .more-btn {
        width: 6.5em;
        margin: auto;
        font-size: var(--text-base-size);
        padding: .8em 1em;
        margin-top: 1em;
        background: var(--color-blue);
        border-radius: var(--border-radius-circle);
        transition: width 0.2s ease-in;
        animation: banner__text__button 1s;
    }

    .more-btn:hover {
        width: 7.5em;
    }

    .more-btn a {
        color: black;
        transition: color 0.2s ease-in;
    }

    .banner .banner-inner .banner-inner-content .more-btn:hover > a {
        color: #fff;
    }

    .banner:before {
        transition: opacity 3s ease;
        transition-delay: 1s;
        content: '';
        background-color: rgba(var(--color-blue-rgb), .85);
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
    }

    /* Media Queries */

    @media screen and (max-width: 980px) {

        .banner h1 {
            font-size: 5em;
        }

    }

    @media screen and (max-width: 736px) {

        .banner h1 {
            font-size: 3em;
        }

    }

    @media screen and (max-width: 980px) {

        .banner p {
            font-size: 1.5em;
        }

    }

    @media screen and (max-width: 480px) {

        .banner p {
            font-size: 1.25em;
        }

    }

    /* Animations */

    @keyframes banner__text__p{
        0%{
            opacity: 0%;
            margin-top: -3.5em;
        }

        30%{
            letter-spacing: 0.05em;

        }

        40%{
            opacity: 0%;
        }

        50%{
            letter-spacing: -0.1em;
        }
    }


    @keyframes banner__text__logo{
        0%{
            opacity: 0%;
        }

        30%{
            letter-spacing: 0.05em;
        }

        50%{
            letter-spacing: -0.1em;
        }
    }


    @keyframes banner__text__button{
        0%{
            opacity: 0%;
        }

        30%{
            width: 10em;
            letter-spacing: -0.1em;
        }

        100%{
            width: 6.5em;
        }

    }
</style>>