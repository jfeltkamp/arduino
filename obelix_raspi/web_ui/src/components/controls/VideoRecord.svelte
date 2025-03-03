<script>
  import { videoRecord } from '$lib/data-store.js';
  import {onDestroy} from "svelte";
  import obelixAPI from "$lib/obelix-api.js";

  let started = $state(false);
  const unRecord = videoRecord.subscribe(recording => {
    if (started !== recording) {
        started = recording;
        const action = (started) ? 'start' : 'stop';
        obelixAPI(`/cam/video-rec/vid/${action}`, (data) => {
          console.log('Video recording', data);
        })
    }
  })

  const toggleRecording = () => {
    videoRecord.update(curr => !curr)
  }

  onDestroy(() => {
    if (unRecord) {
      unRecord()
    }
  })
</script>

<div id="video-recording">
    <button onclick={toggleRecording} aria-label="Record video">
        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84" height="84" width="84" preserveAspectRatio="xMinYMin slice">
            <g transform="translate(42,42)">
                <circle r="38"  stroke-width="5"/>
                {#if started}
                    <polygon points="-15,-15 -15,15 15,15 15,-15" stroke-width="5" fill="#C00" stroke="#C00" stroke-linejoin="round" />
                {:else }
                    <polygon points="-7.5,-22.5 -7.5,22.5 20,0" stroke-width="10" fill="#C00" stroke="#C00" stroke-linejoin="round" />
                {/if}
            </g>
        </svg>
    </button>
</div>

<style>
    #video-recording {
        display: flex;
        justify-content: center;
    }
    button {
        appearance: none;
        background: transparent;
        border: 0;
        margin: 5vmin;
        padding: 0;
    }
    circle {
        fill: none;
        stroke: var(--border-color);
    }
    svg {
        width: 15vmin;
        height: 15vmin;
        max-width: 80px;
        max-height: 80px;
    }
</style>