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
    <div id="viewfinder-stream">
        <img id="stream-object" src={imageB} alt="Viewfinder stream" width="640" height="480"/>
    </div>
    <img id="stream-object" src={imageA} alt="Telescope stream" width="640" height="480"/>
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
    }
    #stream-object {
        object-fit: cover;
        object-position: center center;
        height: 100%;
        width: 100%;
    }
</style>