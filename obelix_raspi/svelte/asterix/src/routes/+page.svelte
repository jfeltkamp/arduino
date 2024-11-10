<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import Visuals from "../components/Visuals.svelte";
  import Controls from "../components/Controls.svelte";
  import { arduinoSettings } from "$lib/data-store.js"

  let socketIo;
  const connectIO = (io) => {
    socketIo = io.connect('http://192.168.178.38:5000');
    // io.connect('http://' + location.hostname + ':' + location.port);

    socketIo.on('connect', () => {
      console.log('Websocket connected.');
    });

    socketIo.on('message', (data) => {
      if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
        arduinoSettings.update((storeData) => { return { ...storeData, ...data }; });
      }
    });
  }

  onMount(() => {
    if (browser && (typeof io === 'function')) {
        connectIO(io);
    }
  })
</script>

<div class="grid-container">
    <div>
        <Visuals/>
    </div>
    <div>
        <Controls/>
    </div>
</div>

<style>
    .grid-container {
        display: flex;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
        background: #333;

        > div {
            background: #FFF;
            overflow: hidden;
        }

        @media (orientation: landscape) {
            flex-direction: row;
            > div {
                width: 50vw;
                height: 50vw;
                max-height: 100vh;
            }
        }

        @media (orientation: portrait) {
            flex-direction: column;
            > div {
                width: 50vh;
                height: 50vh;
                max-width: 100vw;
            }
        }
    }
</style>