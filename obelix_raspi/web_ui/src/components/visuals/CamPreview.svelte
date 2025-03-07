<script>
  import {onDestroy, onMount} from "svelte";
  import obelixAPI from "$lib/obelix-api.js";
  import {swapPreview, sphereControls, displayCompass, locHost, arduinoSettings} from '$lib/data-store.js';
  import Sphere from "./Sphere.svelte";


  let width = $state(0);
  let height = $state(0);

  const imgWidth = 1080;
  const imgHeight = 810;

  // Get center position *including* adjustment from crosshair offset.
  let centerB = $state();
  const getAdjustment = () => {
    const center = centerB.getBoundingClientRect();
    return {
      x: (currImage === 'B') ? center.x : (width / 2),
      y: (currImage === 'B') ? center.y : (height / 2),
    }
  }

  let currImage = $state();
  const unsubscribe = swapPreview.subscribe(curr => {currImage = curr})

  // Get current angles from
  let azimuth = $state(0.0);
  let altitude = $state(0.0);
  const unsubSettings = arduinoSettings.subscribe(conf => {
    azimuth = conf.deg_x;
    altitude = conf.deg_y;
  });

  const imageClick = (image, event) => {
    if (currImage !== image) {
        swapPreview.update(curr => image)
    } else {
      // Calculate centered coords.
      const center = getAdjustment()
      const dimScale = Math.max((width/imgWidth), (height/imgHeight))
      const vpCoords = {
        x: Math.round((event.clientX - center.x) / dimScale),
        y: -1 * Math.round((event.clientY - center.y) / dimScale),
      }

      const sphereScale = (currImage === 'B') ? conf.SphereScaleVF : conf.SphereScaleTel;

      const altRad = angleRad(altitude);
      const aziRad = angleRad(azimuth);

      const rho = Math.sqrt(Math.pow(vpCoords.x, 2) + Math.pow(vpCoords.y, 2));
      const c = Math.asin(rho / sphereScale);
      const alt = Math.asin((Math.cos(c) * Math.sin(altRad)) + (vpCoords.y * Math.sin(c) * Math.cos(altRad) / rho));
      const azi = aziRad + Math.atan(vpCoords.x * Math.sin(c) / ((rho * Math.cos(c) * Math.cos(altRad)) - (vpCoords.y * Math.sin(c) * Math.sin(altRad))))


      console.log('POS:', vpCoords, angleDeg(alt), angleDeg(azi))
    }
  }

  function angleRad(deg) {
    return Math.PI * deg / 180;
  }


  function angleDeg(rad) {
    return rad * 180 / Math.PI;
  }

  let conf = $state({
    CrosshairSize: 0.4,
    CrosshairOffsetX: 0.0,
    CrosshairOffsetY: 0.0,
    SphereScaleVF: 1500,
    SphereScaleTel: 24000,
  });
  let unsubSphere = sphereControls.subscribe(controls => {
    for (let control of controls) {
        conf[control.id] = control.value;
    }
  })

  let imageA = $state("starfield-zoom.jpg");
  let imageB = $state("starfield.jpg");

  onMount(() => {
    // imageA = `${$locHost}:7777/stream_a.mjpg`;
    // imageB = `${$locHost}:7777/stream_b.mjpg`;

    obelixAPI('/config/sphere/settings', data => {
      console.log('MOUNT ',data);

      sphereControls.update(controls => controls.map(
        control => (control?.id && Object.hasOwn(data, control.id)) ? {...control, value: data[control.id]} : {...control})
      )
    });
  });

  onDestroy(() => {
    if (unsubscribe) {unsubscribe()}
    if (unsubSphere) {unsubSphere()}
    if (unsubSettings) {unsubSettings()}
  })
</script>

<div id="camera-stream" bind:clientWidth={width} bind:clientHeight={height}>
    <button id="telescope-stream" onclick={(event) => imageClick('A', event)} class="stream-wrapper {$swapPreview === 'A' ? 'large' : ''}">
        <svg class="svg-img" {width} {height} viewBox="0 0 {imgWidth} {imgHeight}" preserveAspectRatio="xMidYMid slice">
            <foreignObject class="img-wrap" x="0" y="0" width={imgWidth} height={imgHeight}>
                <img src={imageA} alt="Telescope" class="svg-img" />
            </foreignObject>
            {#if $displayCompass}
                <Sphere scale={conf.SphereScaleTel} steps="1" {width} {height} />
            {/if}
        </svg>
    </button>
    <button id="viewfinder-stream" onclick={(event) => imageClick('B', event)} class="stream-wrapper {$swapPreview === 'B' ? 'large' : ''}">
        <svg class="svg-img" {width} {height} viewBox="0 0 {imgWidth} {imgHeight}" preserveAspectRatio="xMidYMid slice">
            <foreignObject class="img-wrap" x="0" y="0" width={imgWidth} height={imgHeight}>
                <img src={imageB} alt="Viewfinder" class="svg-img" />
            </foreignObject>
            <g transform="translate({imgWidth/4 * conf.CrosshairOffsetX} {imgHeight/4 * conf.CrosshairOffsetY})">
                <circle bind:this={centerB} r="0.0001" cx={imgWidth/2} cy={imgHeight/2} fill="none" stroke="none"  />
                <rect class="crosshair" x={imgWidth/2} y={imgHeight/2}
                      transform="translate({width * conf.CrosshairSize * -0.5} {height * conf.CrosshairSize * -0.5})"
                      width={width * conf.CrosshairSize}
                      height={height * conf.CrosshairSize} />
                {#if $displayCompass}
                    <Sphere scale={conf.SphereScaleVF} steps="15" {width} {height} />
                {/if}
            </g>
        </svg>
    </button>
</div>

<style>
    #camera-stream {
        border: 0;
        background: transparent;
        width: 100%;
        height: 100%;
    }

    .stream-wrapper {
        position: fixed;
        width: 25%;
        height: 25%;
        z-index: 1;
        border: 1px solid rgba(255,255,255,.4);
        background: transparent;
        color: #FFF;
        border-radius: 5px;
        overflow: hidden;
        transition: all ease .5s;

        @media (orientation: landscape) {
            bottom: calc(52px + 2%);
            left: 3%;

        }

        @media (orientation: portrait) {
            top: 3%;
            right: 3%;
        }


        &.large {
            border: 0;
            width: 100%;
            height: 100%;
            z-index: 0;

            @media (orientation: landscape) {
                bottom: 0;
                left: 0;
            }

            @media (orientation: portrait) {
                top: 0;
                right: 0;
            }
        }
    }

    button {
        padding: 0;
        margin: 0;
        position: relative;
    }

    .svg-img {
        height: 100%;
        width: 100%;
    }
    .img-wrap {
        > img {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .crosshair {
        stroke: yellow;
        fill: none;
    }

</style>