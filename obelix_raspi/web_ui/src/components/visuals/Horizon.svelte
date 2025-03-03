<script>
  import { onDestroy } from 'svelte';
  import { arduinoSettings } from '$lib/data-store.js'

  let azimuth;
  let altitude;

  const unsubscribe = arduinoSettings.subscribe(conf => {
    azimuth = conf.deg_x;
    altitude = conf.deg_y;
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  })
</script>


<div id="horizon-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
            <path id="altitude" d="M32 0 108 0" stroke-width="2" stroke-linecap="round"/>
            <path id="altitudeText" d="M40 -4 108 -4" stroke="#000" stroke-linecap="round"/>
        </defs>
        <g id="compass" transform="translate(110 110)">
            <circle r="32" class="compass" stroke-width="2" />
            <circle r="30" class="compass--scale" stroke-dasharray="2 21.5619449019" stroke-dashoffset="1" stroke-width="6" />
            <g transform="rotate({azimuth})">
                <polygon class="compass--needle" points="-10,10 0,-30 0,0" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" fill="#000" />
                <polygon class="compass--needle" points="10,10 0,-30 0,0" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" fill="#FFF" />
            </g>
            <g transform="rotate(-{altitude})">
                <use class="compass--alt" href="#altitude" />
                <text class="compass--text" font-size="20">
                    <textPath href="#altitudeText" >{altitude}°</textPath>
                </text>
            </g>
            <text class="compass--text" font-size="20" text-anchor="middle" y="50">{azimuth}°</text>
        </g>
    </svg>
</div>

<style>
    #horizon-wrapper {
        width: 100vw;
        height: 100vh;
    }
    svg {
        position: absolute;
        left: calc(3% + 33px);
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .compass {
        fill: var(--background);
        stroke: var(--border-color);
    }
    .compass--scale {
        fill: none;
        stroke: var(--border-color);
    }
    .compass--text {
        fill: var(--color);
    }
    .compass--alt {
        stroke: var(--border-color);
    }
    .compass--needle {
        stroke: var(--border-color);
    }
</style>