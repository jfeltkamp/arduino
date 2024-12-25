<script>
  import { videoRecord } from '$lib/data-store.js';
  import {onDestroy} from "svelte";

  let recording = $state(false);
  const unRecord = videoRecord.subscribe(curr => {recording = curr})

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
                <circle r="38" fill="none" stroke="#FFF" stroke-width="5"/>
                {#if recording}
                    <polygon points="-15,-15 -15,15 15,15 15,-15" stroke-width="5" fill="#C00" stroke="#C00" stroke-linejoin="round" />
                {:else }
                    <polygon points="-10,-25 -10,25 22,0" stroke-width="5" fill="#C00" stroke="#C00" stroke-linejoin="round" />
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
    svg {
        width: 15vmin;
        height: 15vmin;
        max-width: 80px;
        max-height: 80px;
    }
</style>