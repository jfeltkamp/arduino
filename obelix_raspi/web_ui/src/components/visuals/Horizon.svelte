<script>
  import { onDestroy } from 'svelte';
  import { arduinoSettings } from '$lib/data-store.js'

  let focus;
  let azimuth;
  let altitude;
  let sphere;

  const unsubscribe = arduinoSettings.subscribe(conf => {
    // Calc focus arrow (asymptotic growth).
    const stepsF = conf.f + conf.mpf;
    const rangeF = conf.mpf - (conf.mpf / Math.pow((1.5/conf.mpf) * stepsF + 1,2));
    const rateF = rangeF / conf.mpf;
    focus = (1-rateF) * 133;

    azimuth = conf.deg_x;
    altitude = conf.deg_y;
    sphere = altitude / 90 * 400
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  })
</script>


<div id="horizon-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMinYMin slice">
        <defs>
            <g id="horizon">
                <line x1="0" x2="0" y1="-600" y2="600" stroke="#FFF" stroke-dashoffset="6.75" stroke-dasharray="0.5,44" stroke-width="10"/>
                <line x1="-200" x2="200" y1="150" y2="150" stroke="#FFF" stroke-dashoffset="30" stroke-dasharray="40.5,9.5,0.5,9.5" stroke-width=".5"/>
            </g>
        </defs>

        <defs>
            <polygon id="focusArrow" points="0,400 180,65 100,65 200,35 300,65 220,65 400,400"/>
            <linearGradient id="focusArrowGradClip" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stop-color="#005" />
                <stop offset="50%" stop-color="#039" stop-opacity=".8" />
                <stop offset="100%" stop-color="#07f" stop-opacity=".4" />
            </linearGradient>
        </defs>
        <clipPath id="arrowStripesClip">
            <polygon points="200,0 -390,400 -370,400 200,0 -350,400 -330,400 200,0 -310,400 -290,400 200,0 -270,400 -250,400 200,0 -230,400 -210,400 200,0 -190,400 -170,400 200,0 -150,400 -130,400 200,0 -110,400 -90,400 200,0 -70,400 -50,400 200,0 -30,400 -10,400 200,0 10,400 30,400 200,0 50,400 70,400 200,0 90,400 110,400 200,0 130,400 150,400 200,0 170,400 190,400 200,0 210,400 230,400 200,0 250,400 270,400 200,0 290,400 310,400 200,0 330,400 350,400 200,0 370,400 390,400 200,0 410,400 430,400 200,0 450,400 470,400 200,0 490,400 510,400 200,0 530,400 550,400 200,0 570,400 590,400 200,0 610,400 630,400 200,0 650,400 670,400 200,0 690,400 710,400 200,0 730,400 750,400 200,0 770,400 790,400"/>
        </clipPath>
        <clipPath id="focusRangeMeterClip">
            <!-- Adjust here                    v -->
            <rect id="focus-range-meter" style="y:{focus}%" width="400" height="400"/>
        </clipPath>
        <!-- Adjust here (0-90), formular: arc * 400 / 90°  -->
        <use id="azimuth-sphere" href="#horizon" style="transform: translate(200px, {sphere}px)" />
        <!--g transform="translate(125 150) scale(0.375)">
            <use clip-path="url(#focusRangeMeterClip)" href="#focusArrow" fill="url(#focusArrowGradClip)" />
            <use clip-path="url(#arrowStripesClip)" href="#focusArrow" fill="rgba(255,255,255,.5)" />
        </g -->
        <g transform="translate(200 150)">
            <!-- Adjust here                                 v  -->
            <g id="altitude-visual" style="transform: rotate({altitude}deg)">
                <circle r="1" fill="#FFF"/>
                <path d="M-70 0 -10 0 A 10 10 0 0 0 10 0 " fill="none" stroke-width="1.2" stroke="#FFF"/>
                <text id="altitude-text" text-anchor="middle" transform="translate(-45 -5)" fill="#FFF" font-size="10">∠ {altitude}°</text>
            </g>
        </g>
        <g transform="translate(200 150)">
            <path d="M-10 0 A 10 10 0 0 0 10 0 L 70 0" fill="none" stroke-width="1.22" stroke="#FFF"/>
            <path d="M -4,-150 0,-140 4,-150" fill="#FFF" stroke="#FFF" stroke-width=".5" />
            <text id="azimuth-text" transform="translate(30 -5)" text-anchor="middle" fill="#FFF" font-size="10">➢ {azimuth}°</text>
        </g>

        <g transform="translate(200 -390)">
            <g id="compass" transform="rotate({azimuth})">
                <circle r="400" class="grade" stroke-dasharray=".5 6.48131701" stroke-dashoffset=".15" stroke-width="20"/>
                <circle r="400" class="grade" stroke-dasharray=".5 34.40658504" stroke-dashoffset=".15" stroke-width="30"/>
                <circle r="400" class="grade" stroke-dasharray=".5 104.21975512" stroke-dashoffset=".15" stroke-width="40"/>
                <circle r="400" fill="none" stroke-dasharray=".5 156.57963268" stroke-dashoffset=".15" stroke="#F00" stroke-width="40"/>
                <text class="cmp-text" transform="rotate(0) translate(0 432)">N</text>
                <text class="cmp-text" transform="rotate(-15) translate(0 432)">15</text>
                <text class="cmp-text" transform="rotate(-30) translate(0 432)">30</text>
                <text class="cmp-text" transform="rotate(-45) translate(0 432)">45</text>
                <text class="cmp-text" transform="rotate(-60) translate(0 432)">60</text>
                <text class="cmp-text" transform="rotate(-75) translate(0 432)">75</text>
                <text class="cmp-text" transform="rotate(-90) translate(0 432)">E</text>
                <text class="cmp-text" transform="rotate(-105) translate(0 432)">105</text>
                <text class="cmp-text" transform="rotate(-120) translate(0 432)">120</text>
                <text class="cmp-text" transform="rotate(-135) translate(0 432)">135</text>
                <text class="cmp-text" transform="rotate(-150) translate(0 432)">150</text>
                <text class="cmp-text" transform="rotate(-165) translate(0 432)">165</text>
                <text class="cmp-text" transform="rotate(-180) translate(0 432)">S</text>
                <text class="cmp-text" transform="rotate(-195) translate(0 432)">195</text>
                <text class="cmp-text" transform="rotate(-210) translate(0 432)">210</text>
                <text class="cmp-text" transform="rotate(-225) translate(0 432)">225</text>
                <text class="cmp-text" transform="rotate(-240) translate(0 432)">240</text>
                <text class="cmp-text" transform="rotate(-255) translate(0 432)">255</text>
                <text class="cmp-text" transform="rotate(-270) translate(0 432)">W</text>
                <text class="cmp-text" transform="rotate(-285) translate(0 432)">285</text>
                <text class="cmp-text" transform="rotate(-300) translate(0 432)">300</text>
                <text class="cmp-text" transform="rotate(-315) translate(0 432)">315</text>
                <text class="cmp-text" transform="rotate(-330) translate(0 432)">330</text>
                <text class="cmp-text" transform="rotate(-345) translate(0 432)">345</text>
                <text class="cmp-text-sm" transform="rotate(0) translate(0 422)">0</text>
                <text class="cmp-text-sm" transform="rotate(-5) translate(0 422)">5</text>
                <text class="cmp-text-sm" transform="rotate(-10) translate(0 422)">10</text>
                <text class="cmp-text-sm" transform="rotate(-20) translate(0 422)">20</text>
                <text class="cmp-text-sm" transform="rotate(-25) translate(0 422)">25</text>
                <text class="cmp-text-sm" transform="rotate(-22.5) translate(0 422)">NNE</text>
                <text class="cmp-text-sm" transform="rotate(-35) translate(0 422)">35</text>
                <text class="cmp-text-sm" transform="rotate(-40) translate(0 422)">40</text>
                <text class="cmp-text-sm left" transform="rotate(-45) translate(0 422)">NE</text>
                <text class="cmp-text-sm" transform="rotate(-50) translate(0 422)">50</text>
                <text class="cmp-text-sm" transform="rotate(-55) translate(0 422)">55</text>
                <text class="cmp-text-sm" transform="rotate(-65) translate(0 422)">65</text>
                <text class="cmp-text-sm" transform="rotate(-70) translate(0 422)">70</text>
                <text class="cmp-text-sm" transform="rotate(-67.5) translate(0 422)">NEE</text>
                <text class="cmp-text-sm" transform="rotate(-80) translate(0 422)">80</text>
                <text class="cmp-text-sm" transform="rotate(-85) translate(0 422)">85</text>
                <text class="cmp-text-sm left" transform="rotate(-90) translate(0 422)">90</text>
                <text class="cmp-text-sm" transform="rotate(-95) translate(0 422)">95</text>
                <text class="cmp-text-sm" transform="rotate(-95) translate(0 422)">95</text>
                <text class="cmp-text-sm" transform="rotate(-100) translate(0 422)">100</text>
                <text class="cmp-text-sm" transform="rotate(-110) translate(0 422)">110</text>
                <text class="cmp-text-sm" transform="rotate(-112.5) translate(0 422)">SEE</text>
                <text class="cmp-text-sm" transform="rotate(-115) translate(0 422)">115</text>
                <text class="cmp-text-sm" transform="rotate(-125) translate(0 422)">125</text>
                <text class="cmp-text-sm" transform="rotate(-130) translate(0 422)">130</text>
                <text class="cmp-text-sm left" transform="rotate(-135) translate(0 422)">SE</text>
                <text class="cmp-text-sm" transform="rotate(-140) translate(0 422)">140</text>
                <text class="cmp-text-sm" transform="rotate(-145) translate(0 422)">145</text>
                <text class="cmp-text-sm" transform="rotate(-155) translate(0 422)">155</text>
                <text class="cmp-text-sm" transform="rotate(-157.5) translate(0 422)">SSE</text>
                <text class="cmp-text-sm" transform="rotate(-160) translate(0 422)">160</text>
                <text class="cmp-text-sm" transform="rotate(-170) translate(0 422)">170</text>
                <text class="cmp-text-sm" transform="rotate(-175) translate(0 422)">175</text>
                <text class="cmp-text-sm left" transform="rotate(-180) translate(0 422)">180</text>
                <text class="cmp-text-sm" transform="rotate(-185) translate(0 422)">185</text>
                <text class="cmp-text-sm" transform="rotate(-190) translate(0 422)">190</text>
                <text class="cmp-text-sm" transform="rotate(-200) translate(0 422)">200</text>
                <text class="cmp-text-sm" transform="rotate(-202.5) translate(0 422)">SSW</text>
                <text class="cmp-text-sm" transform="rotate(-205) translate(0 422)">205</text>
                <text class="cmp-text-sm" transform="rotate(-215) translate(0 422)">215</text>
                <text class="cmp-text-sm" transform="rotate(-220) translate(0 422)">220</text>
                <text class="cmp-text-sm left" transform="rotate(-225) translate(0 422)">SW</text>
                <text class="cmp-text-sm" transform="rotate(-230) translate(0 422)">230</text>
                <text class="cmp-text-sm" transform="rotate(-235) translate(0 422)">235</text>
                <text class="cmp-text-sm" transform="rotate(-245) translate(0 422)">245</text>
                <text class="cmp-text-sm" transform="rotate(-247.5) translate(0 422)">SWW</text>
                <text class="cmp-text-sm" transform="rotate(-250) translate(0 422)">250</text>
                <text class="cmp-text-sm" transform="rotate(-260) translate(0 422)">260</text>
                <text class="cmp-text-sm" transform="rotate(-265) translate(0 422)">265</text>
                <text class="cmp-text-sm left" transform="rotate(-270) translate(0 422)">270</text>
                <text class="cmp-text-sm" transform="rotate(-275) translate(0 422)">275</text>
                <text class="cmp-text-sm" transform="rotate(-280) translate(0 422)">280</text>
                <text class="cmp-text-sm" transform="rotate(-290) translate(0 422)">290</text>
                <text class="cmp-text-sm" transform="rotate(-292.5) translate(0 422)">NWW</text>
                <text class="cmp-text-sm" transform="rotate(-295) translate(0 422)">295</text>
                <text class="cmp-text-sm" transform="rotate(-305) translate(0 422)">305</text>
                <text class="cmp-text-sm" transform="rotate(-310) translate(0 422)">310</text>
                <text class="cmp-text-sm left" transform="rotate(-315) translate(0 422)">NW</text>
                <text class="cmp-text-sm" transform="rotate(-320) translate(0 422)">320</text>
                <text class="cmp-text-sm" transform="rotate(-325) translate(0 422)">325</text>
                <text class="cmp-text-sm" transform="rotate(-335) translate(0 422)">335</text>
                <text class="cmp-text-sm" transform="rotate(-340) translate(0 422)">340</text>
                <text class="cmp-text-sm" transform="rotate(-350) translate(0 422)">350</text>
                <text class="cmp-text-sm" transform="rotate(-355) translate(0 422)">355</text>
                <text class="cmp-text-sm" transform="rotate(-337.5) translate(0 422)">NNW</text>
            </g>
        </g>
    </svg>
</div>

<style>
    #horizon-wrapper {
        width: 100vw;
        height: 100vh;
    }
    svg {
        min-height: 100vh;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .grade {
        fill: none;
        stroke: #FFF;
    }
    .cmp-text {
        fill: #FFF;
        font-size: 10px;
        text-anchor: middle;
    }
    .cmp-text-sm {
        fill: #FFF;
        font-size: 8px;
        text-anchor: middle;
    }
    .cmp-text-sm.left {
        text-anchor: start;
    }

    #compass,
    #azimuth-sphere,
    #altitude-visual {
        transition: transform .25s linear;
    }
    #focus-range-meter {
        transition: y .25s linear;
    }
</style>