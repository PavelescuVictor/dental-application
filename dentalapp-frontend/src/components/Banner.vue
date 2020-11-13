<template>
    <div class="banner">
        <div class="banner__overlay">
            <div class="overlay__top"></div>
            <div class="overlay__left"></div>
        </div>
        <Background class="background" />
        <div class="banner__gradient">
            <div class="gradient__left"></div>
            <div class="gradient__right"></div>
        </div>
        <div class="banner-inner">
            <div class="banner-inner-content">
                <div class="logo__wrapper">
                    <svg
                        id="logo"
                        width="873"
                        height="200"
                        viewBox="0 0 873 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M137.12 125.88C137.12 129.72 136.88 133.72 136.4 137.88H43.52C44.16 146.2 46.8 152.6 51.44 157.08C56.24 161.4 62.08 163.56 68.96 163.56C79.2 163.56 86.32 159.24 90.32 150.6H134C131.76 159.4 127.68 167.32 121.76 174.36C116 181.4 108.72 186.92 99.92 190.92C91.12 194.92 81.28 196.92 70.4 196.92C57.28 196.92 45.6 194.12 35.36 188.52C25.12 182.92 17.12 174.92 11.36 164.52C5.59997 154.12 2.71997 141.96 2.71997 128.04C2.71997 114.12 5.51997 101.96 11.12 91.56C16.88 81.16 24.88 73.16 35.12 67.56C45.36 61.96 57.12 59.16 70.4 59.16C83.36 59.16 94.88 61.88 104.96 67.32C115.04 72.76 122.88 80.52 128.48 90.6C134.24 100.68 137.12 112.44 137.12 125.88ZM95.12 115.08C95.12 108.04 92.72 102.44 87.92 98.28C83.12 94.12 77.12 92.04 69.92 92.04C63.04 92.04 57.2 94.04 52.4 98.04C47.76 102.04 44.88 107.72 43.76 115.08H95.12Z"
                            stroke="white"
                            stroke-width="5"
                        />
                        <path
                            d="M203.411 156.6L232.451 61.08H276.131L228.611 195H177.971L130.451 61.08H174.371L203.411 156.6Z"
                            stroke="white"
                            stroke-width="5"
                        />
                        <path
                            d="M305.645 47.16C298.445 47.16 292.525 45.08 287.885 40.92C283.405 36.6 281.165 31.32 281.165 25.08C281.165 18.68 283.405 13.4 287.885 9.24001C292.525 4.92001 298.445 2.76001 305.645 2.76001C312.685 2.76001 318.445 4.92001 322.925 9.24001C327.565 13.4 329.885 18.68 329.885 25.08C329.885 31.32 327.565 36.6 322.925 40.92C318.445 45.08 312.685 47.16 305.645 47.16ZM326.045 61.08V195H285.005V61.08H326.045Z"
                            stroke="white"
                            stroke-width="5"
                        />
                        <path
                            d="M405.706 26.52C423.466 26.52 438.986 30.04 452.266 37.08C465.546 44.12 475.786 54.04 482.986 66.84C490.346 79.48 494.026 94.12 494.026 110.76C494.026 127.24 490.346 141.88 482.986 154.68C475.786 167.48 465.466 177.4 452.026 184.44C438.746 191.48 423.306 195 405.706 195H342.586V26.52H405.706ZM403.066 159.48C418.586 159.48 430.666 155.24 439.306 146.76C447.946 138.28 452.266 126.28 452.266 110.76C452.266 95.24 447.946 83.16 439.306 74.52C430.666 65.88 418.586 61.56 403.066 61.56H383.626V159.48H403.066Z"
                            stroke="white"
                            stroke-width="5"
                        />
                        <path
                            d="M636.001 125.88C636.001 129.72 635.761 133.72 635.281 137.88H542.401C543.041 146.2 545.681 152.6 550.321 157.08C555.121 161.4 560.961 163.56 567.841 163.56C578.081 163.56 585.201 159.24 589.201 150.6H632.881C630.641 159.4 626.561 167.32 620.641 174.36C614.881 181.4 607.601 186.92 598.801 190.92C590.001 194.92 580.161 196.92 569.281 196.92C556.161 196.92 544.481 194.12 534.241 188.52C524.001 182.92 516.001 174.92 510.241 164.52C504.481 154.12 501.601 141.96 501.601 128.04C501.601 114.12 504.401 101.96 510.001 91.56C515.761 81.16 523.761 73.16 534.001 67.56C544.241 61.96 556.001 59.16 569.281 59.16C582.241 59.16 593.761 61.88 603.841 67.32C613.921 72.76 621.761 80.52 627.361 90.6C633.121 100.68 636.001 112.44 636.001 125.88ZM594.001 115.08C594.001 108.04 591.601 102.44 586.801 98.28C582.001 94.12 576.001 92.04 568.801 92.04C561.921 92.04 556.081 94.04 551.281 98.04C546.641 102.04 543.761 107.72 542.641 115.08H594.001Z"
                            stroke="white"
                            stroke-width="5"
                        />
                        <path
                            d="M727.252 59.64C742.932 59.64 755.412 64.76 764.692 75C774.132 85.08 778.852 99 778.852 116.76V195H738.052V122.28C738.052 113.32 735.732 106.36 731.092 101.4C726.452 96.44 720.212 93.96 712.372 93.96C704.532 93.96 698.292 96.44 693.652 101.4C689.012 106.36 686.692 113.32 686.692 122.28V195H645.652V61.08H686.692V78.84C690.852 72.92 696.452 68.28 703.492 64.92C710.532 61.4 718.452 59.64 727.252 59.64Z"
                            stroke="white"
                            stroke-width="5"
                        />
                        <path
                            d="M870.011 160.2V195H849.131C834.251 195 822.651 191.4 814.331 184.2C806.011 176.84 801.851 164.92 801.851 148.44V95.16H785.531V61.08H801.851V28.44H842.891V61.08H869.771V95.16H842.891V148.92C842.891 152.92 843.851 155.8 845.771 157.56C847.691 159.32 850.891 160.2 855.371 160.2H870.011Z"
                            stroke="white"
                            stroke-width="5"
                        />
                    </svg>
                </div>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi nemo, debitis amet laborum nam corrupti.
                </p>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quam, nam!
                </p>

                <div class="more-btn">
                    <a href="https://www.google.com">Learn More</a>
                </div>
            </div>
        </div>
        <Main class="main" />
        <TopLeftLeaves class="topLeftLeaves" />
        <TopRightLeaves class="topRightLeaves" />
        <Girl class="girl" />
        <Guy class="guy" />
    </div>
</template>
<script>
import Background from "../assets/Background.svg";
import Main from "../assets/Main.svg";
import TopLeftLeaves from "../assets/Left Top Leaves.svg";
import TopRightLeaves from "../assets/Top Right Leaves.svg";
import Girl from "../assets/Girl.svg";
import Guy from "../assets/Guy.svg";
export default {
    name: "Banner",
    components: {
        Background,
        Main,
        TopLeftLeaves,
        TopRightLeaves,
        Girl,
        Guy,
    },

    /*
    created() {
        const logo = document.querySelectorAll("#logo path");
        console.log(logo);
        for (let i = 0; i < logo.length; i++) {
            console.log(`Letter ${i + 1} is ${logo[i].getTotalLength()}`);
        }
    },
    */
};
</script>
<style scoped>
.banner {
    min-height: var(--banner-height);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8em 4em 6em 4em;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
}

.banner__overlay {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 4;
}

.overlay__top {
    height: 100%;
    width: 100%;
    position: absolute;
    top: -100%;
    left: 0px;
    background-color: var(--color-blue);
    animation: banner__overlay__slide-down 0.8s ease forwards,
        banner__overlay__fade-out 1.1s ease forwards;
    z-index: 5;
}

.overlay__left {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: -100%;
    background-color: white;
    animation: banner__overlay__slide-right 1.2s ease-out forwards 0.4s;
    z-index: 5;
}

.banner__gradient {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 3;
}

.gradient__left {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(255, 255, 255, 0) 25%
    );
    opacity: 0%;
    animation: banner__gradient__fade-in 0.8s ease-out forwards;
    z-index: 4;
}

.gradient__right {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0%;
    right: 0%;
    background: linear-gradient(
        270deg,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(255, 255, 255, 0) 25%
    );
    opacity: 0%;
    animation: banner__gradient__fade-in 0.8s ease-out forwards;
    z-index: 4;
}

.banner-inner {
    position: absolute;
    bottom: var(--padding-small);
    z-index: 4;
    width: 100%;
}

.banner-inner-content {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.background {
    transform: translateY(0%) scale(1, 0.87);
    position: absolute;
    top: 0px;
    left: 0px;
    transform-origin: top left;
}

.main {
    transform: scale(0.8) translate(-50%, 0%);
    position: absolute;
    top: 7%;
    left: 50%;
    z-index: 2;
    transform-origin: top left;
}

.topLeftLeaves {
    transform: scale(0.9);
    position: absolute;
    top: 9%;
    left: 0%;
    z-index: 2;
    transform-origin: top left;
}

.topRightLeaves {
    transform: scale(0.9);
    position: absolute;
    top: 2%;
    right: 0%;
    z-index: 2;
    transform-origin: top right;
}

.girl {
    transform: scale(0.9);
    position: absolute;
    bottom: 0px;
    left: 0%;
    z-index: 2;
    transform-origin: bottom left;
}

.guy {
    transform: scale(0.9);
    position: absolute;
    bottom: 0px;
    right: 2%;
    z-index: 2;
    transform-origin: bottom right;
}

.logo__wrapper {
    height: 100%;
    width: 100%;
    transform: scale(0.95);
    transform-origin: center;
}

#logo {
    padding: var(--padding-small) var(--padding-high) 0px var(--padding-high);
    animation: banner__logo__slide-forward 0.6s
            cubic-bezier(0.25, 0.46, 0.45, 0.94) both 2.2s,
        banner__logo__color-change 0.9s ease-in-out forwards 0.55s,
        banner__logo__fill 0.5s ease forwards 2.2s;
}

#logo path:nth-child(1) {
    stroke-dasharray: 752.4971313476562px;
    stroke-dashoffset: 752.4971313476562px;
    animation: banner__logo 1.5s ease forwards,
        banner__logo__stroke-change 0.9s ease-in-out forwards 0.55s;
}

#logo path:nth-child(2) {
    stroke-dasharray: 622.1158447265625px;
    stroke-dashoffset: 622.1158447265625px;
    animation: banner__logo 1.5s ease forwards 0.15s,
        banner__logo__stroke-change 0.9s ease-in-out forwards 0.55s;
}

#logo path:nth-child(3) {
    stroke-dasharray: 497.4835510253906px;
    stroke-dashoffset: 497.4835510253906px;
    animation: banner__logo 1.5s ease forwards 0.3s,
        banner__logo__stroke-change 0.9s ease-in-out forwards 0.55s;
}

#logo path:nth-child(4) {
    stroke-dasharray: 864.15185546875px;
    stroke-dashoffset: 864.15185546875px;
    animation: banner__logo 1.5s ease forwards 0.45s,
        banner__logo__stroke-change 0.9s ease-in-out forwards 0.55s;
}

#logo path:nth-child(5) {
    stroke-dasharray: 752.49755859375px;
    stroke-dashoffset: 752.49755859375px;
    animation: banner__logo 1.5s ease forwards 0.6s,
        banner__logo__stroke-change 0.9s ease-in-out forwards 0.55s;
}

#logo path:nth-child(6) {
    stroke-dasharray: 718.4203491210938px;
    stroke-dashoffset: 718.4203491210938px;
    animation: banner__logo 1.5s ease forwards 0.75s,
        banner__logo__stroke-change 0.9s ease-in-out forwards 0.55s;
}

#logo path:nth-child(7) {
    stroke-dasharray: 534.0693359375px;
    stroke-dashoffset: 534.0693359375px;
    animation: banner__logo 1.5s ease forwards 0.9s,
        banner__logo__stroke-change0.9s ease-in-out forwards 0.55s;
}

.banner-inner-content p {
    color: #fff;
    font-size: calc(var(--text-base-size) * 1.2);
    line-height: calc(var(--text-base-line-height) * 1.2);
    padding: 10px 10px 0px 10px;
    animation: banner__text__p 1s 1,
        banner__logo__stroke-change 0.9s ease-in-out forwards 0.55s;
}

.more-btn {
    display: inline-block;
    width: 6.5em;
    margin: auto;
    font-size: var(--text-base-size);
    padding: 0.8em 0.5em;
    margin: 1em auto;
    background: -webkit-linear-gradient(
        -90deg,
        transparent 50%,
        var(--color-white) 50%
    );
    background-size: 6.5em 6.5em;
    border: 3px solid var(--color-white);
    border-radius: 10px;
    transition: width 0.2s ease-in, border-radius 0.2s ease-out,
        background-position 0.6s ease;
    animation: banner__text__button 1s;
}

.more-btn:hover {
    width: 8.5em;
    background-position: 0px -60px;
    border-radius: var(--border-radius-circle);
}

.more-btn a {
    color: var(--color-white);
    transition: color 0.2s ease-in;
}

.more-btn:hover > a {
    color: var(--color-blue);
}

/* Media Queries */

@media screen and (max-width: 1700px) {
    .banner p {
        display: none;
    }

    .banner-inner {
        bottom: var(--padding-high);
    }
}

/* Animations */

@keyframes banner__text__p {
    0% {
        opacity: 0%;
        margin-top: -3.5em;
    }

    30% {
        letter-spacing: 0.05em;
    }

    40% {
        opacity: 0%;
    }

    50% {
        letter-spacing: -0.1em;
    }
}

@keyframes banner__text__p__color-change {
    0% {
        color: white;
    }

    50% {
        color: var(--color-blue);
    }

    100% {
        color: white;
    }
}

@keyframes banner__text__logo {
    0% {
        opacity: 0%;
    }

    30% {
        letter-spacing: 0.05em;
    }

    50% {
        letter-spacing: -0.1em;
    }
}

@keyframes banner__text__button {
    0% {
        opacity: 0%;
    }

    30% {
        width: 10em;
        letter-spacing: -0.1em;
    }

    100% {
        width: 6.5em;
    }
}

@keyframes banner__logo {
    to {
        stroke-dashoffset: 0;
    }
}

@keyframes banner__logo__fill {
    from {
        fill: transparent;
    }
    to {
        fill: white;
    }
}
@keyframes banner__logo__slide-forward {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.08);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes banner__logo__color-change {
    0% {
        fill: white;
        stroke: white;
    }

    50% {
        fill: var(--color-blue);
        stroke: var(--color-blue);
    }

    100% {
        fill: transparent;
        stroke: white;
    }
}

@keyframes banner__logo__stroke-change {
    0% {
        stroke: white;
    }

    50% {
        stroke: var(--color-blue);
    }

    100% {
        stroke: white;
    }
}

@keyframes banner__overlay__slide-down {
    from {
        top: -100%;
    }

    to {
        top: 0%;
    }
}

@keyframes banner__overlay__fade-out {
    0% {
        opacity: 100%;
    }

    75% {
        opacity: 100%;
    }

    100% {
        opacity: 0%;
    }
}

@keyframes banner__overlay__slide-right {
    from {
        left: -100%;
    }

    to {
        left: 100%;
    }
}

@keyframes banner__gradient__fade-in {
    0% {
        opacity: 0%;
    }

    75% {
        opacity: 50%;
    }

    100% {
        opacity: 100%;
    }
}
</style>
