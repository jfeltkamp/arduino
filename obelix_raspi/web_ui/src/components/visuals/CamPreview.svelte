<script>
  import {onDestroy, onMount} from "svelte";
  import obelixAPI from "$lib/obelix-api.js";
  import {swapPreview, sphereControls, displayCompass} from '$lib/data-store.js';
  import Sphere from "./Sphere.svelte";


  let width = $state(0);
  let height = $state(0);

  const imgWidth = 1080;
  const imgHeight = 810;

  let largeImage = $state();
  const unsubscribe = swapPreview.subscribe(curr => {largeImage = curr})
  const swapImages = (image) => {
    if (largeImage !== image) {
        swapPreview.update(curr => image)
    }
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
  })
</script>

<div id="camera-stream" bind:clientWidth={width} bind:clientHeight={height}>
    <button id="telescope-stream" onclick={() => swapImages('A')} class="stream-wrapper {$swapPreview === 'A' ? 'large' : ''}">
        <svg class="svg-img" {width} {height} viewBox="0 0 {imgWidth} {imgHeight}" preserveAspectRatio="xMidYMid slice">
            <foreignObject class="img-wrap" x="0" y="0" width={imgWidth} height={imgHeight}>
                <img src={imageA} alt="Telescope" class="svg-img" />
            </foreignObject>
            {#if $displayCompass}
                <Sphere scale={conf.SphereScaleTel} steps="1" {width} {height} />
            {/if}
        </svg>
    </button>
    <button id="viewfinder-stream" onclick={() => swapImages('B')} class="stream-wrapper {$swapPreview === 'B' ? 'large' : ''}">
        <svg class="svg-img" {width} {height} viewBox="0 0 {imgWidth} {imgHeight}" preserveAspectRatio="xMidYMid slice">
            <foreignObject class="img-wrap" x="0" y="0" width={imgWidth} height={imgHeight}>
                <img src={imageB} alt="Viewfinder" class="svg-img" />
            </foreignObject>
            <g transform="translate({imgWidth/4 * conf.CrosshairOffsetX} {imgHeight/4 * conf.CrosshairOffsetY})">
                <rect class="crosshair" x="540" y="405"
                      transform="translate({width * conf.CrosshairSize * -0.5} {height * conf.CrosshairSize * -0.5})"
                      width={width * conf.CrosshairSize}
                      height={height * conf.CrosshairSize} />
                {#if $displayCompass}
                    <Sphere scale={conf.SphereScaleVF} steps="5" {width} {height} />
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