<script>
  import { onMount } from "svelte";
  let image = "starfield.jpg";
  onMount(() => {
    image = 'http://192.168.178.38:7777/stream.mjpg';
  });

</script>

<div id="camera-stream">
    <img id="telescope-stream" src={image} alt="Telescope stream" width="640" height="480"/>
</div>

<style>
    #camera-stream {
        width: 100%;
        height: 100%;
    }
    #telescope-stream {
        object-fit: cover;
        object-position: center center;
        height: 100%;
        width: 100%;
    }
</style>