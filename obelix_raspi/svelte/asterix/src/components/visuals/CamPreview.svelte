<script>
  import { onMount } from "svelte";
  let imageA = "starfield.jpg";
  let imageB = "starfield.jpg";
  onMount(() => {
    imageA = 'http://192.168.178.33:7777/stream_a.mjpg';
    imageB = 'http://192.168.178.33:7777/stream_b.mjpg';
  });

</script>

<div id="camera-stream">
    <img id="stream-object" src={imageA} alt="Telescope stream" width="1080" height="810"/>
    <div id="viewfinder-stream">
        <img id="stream-object" src={imageB} alt="Viewfinder stream" width="1080" height="810"/>
    </div>
</div>

<style>
    #camera-stream {
        position: relative;
        width: 100%;
        height: 100%;
    }
    #viewfinder-stream {
        position: absolute;
        width: 25%;
        height: 25%;
        top: 3%;
        right: 3%;
        z-index: 1;
        border: 1px solid rgba(255,255,255,.4);
        border-radius: 3px;
        overflow: hidden;

        &::after {
            content: '';
            position: absolute;
            width: 4%;
            height: 4%;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            border: 1px solid yellow;
        }
    }
    #stream-object {
        object-fit: cover;
        object-position: center center;
        height: 100%;
        width: 100%;
    }
</style>