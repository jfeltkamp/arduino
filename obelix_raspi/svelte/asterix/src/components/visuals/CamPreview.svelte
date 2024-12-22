<script>
  import { onMount } from "svelte";
  import { swapPreview } from '$lib/data-store.js';

  let camOrder = $state(true);

  let imageA = $state("starfield.jpg");
  let imageB = $state("starfield.jpg");
  onMount(() => {
    imageA = 'http://192.168.178.33:7777/stream_a.mjpg';
    imageB = 'http://192.168.178.33:7777/stream_b.mjpg';
  });

</script>

<div id="camera-stream">
    <div id="telescope-stream" class={!$swapPreview ? 'stream-wrapper large' : 'stream-wrapper'}>
        <img id="stream-object" src={imageA} alt="Telescope stream" width="1080" height="810"/>
    </div>
    <div id="viewfinder-stream" class={$swapPreview ? 'stream-wrapper large' : 'stream-wrapper'}>
        <img id="stream-object" src={imageB} alt="Viewfinder stream" width="1080" height="810"/>
    </div>
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
        top: 3%;
        right: 3%;
        z-index: 1;
        border: 1px solid rgba(255,255,255,.4);
        border-radius: 3px;
        overflow: hidden;
        transition: all ease .5s;

        &.large {
            border: 0;
            width: 100%;
            height: 100%;
            top: 0;
            right: 0;
            z-index: 0;
        }
    }

    #viewfinder-stream::after {
        content: '';
        position: absolute;
        width: 4%;
        height: 4%;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border: 1px solid #FD0;
    }
    #stream-object {
        object-fit: cover;
        object-position: center center;
        height: 100%;
        width: 100%;
    }
</style>