<script>
  import {onDestroy, onMount} from "svelte";
  import {swapPreview, sphereControls, crosshairSize, crosshairOffset, sphereScale} from '$lib/data-store.js';
  import Sphere from "./Sphere.svelte";


  let width = $state(0);
  let height = $state(0);

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
  let unsubSphere = sphereControls.subscribe(c => {
    for (let item of c) {
        conf[item.id] = item.value;
    }
  })

  let imageA = $state("starfield-zoom.jpg");
  let imageB = $state("starfield.jpg");

  onMount(() => {
    imageA = `${location.protocol}//${location.hostname}:7777/stream_a.mjpg`;
    imageB = `${location.protocol}//${location.hostname}:7777/stream_b.mjpg`;
  });

  onDestroy(() => {
    if (unsubscribe) {unsubscribe()}
    if (unsubSphere) {unsubSphere()}
  })
</script>

<div id="camera-stream" bind:clientWidth={width} bind:clientHeight={height}>
    <button id="telescope-stream" onclick={() => swapImages('A')} class="stream-wrapper {$swapPreview === 'A' ? 'large' : ''}">
        <svg class="svg-img" {width} {height} viewBox="0 0 1080 810" preserveAspectRatio="xMidYMid slice">
            <image href={imageA} width="1080" height="810" />
            <Sphere scale={conf.SphereScaleTel} steps="1" {width} {height} />
        </svg>
    </button>
    <button id="viewfinder-stream" onclick={() => swapImages('B')} class="stream-wrapper {$swapPreview === 'B' ? 'large' : ''}">
        <svg class="svg-img" {width} {height} viewBox="0 0 1080 810" preserveAspectRatio="xMidYMid slice">
            <image href={imageB} width="1080" height="810" />
            <g transform="translate({width/4 * conf.CrosshairOffsetX} {height/4 * conf.CrosshairOffsetY})">
                <rect class="crosshair" x="540" y="405" transform="translate({width * conf.CrosshairSize * -0.5} {height * conf.CrosshairSize * -0.5})" width={width * conf.CrosshairSize} height={height * conf.CrosshairSize} />
                <Sphere scale={conf.SphereScaleVF} steps="5" {width} {height} />
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

    .crosshair {
        stroke: yellow;
        fill: none;
    }

</style>