<script>
  import { daylight } from '$lib/data-store.js';
  import { onDestroy } from "svelte";

  let isDaylight = $state(false);
  let unsubscribe = daylight.subscribe((curr) => {
    isDaylight = curr;
  });

  const toggleDaylight = () => {
    daylight.update(curr => !curr);
  }

  onDestroy (() => {
    if (unsubscribe) {unsubscribe()}
  });

</script>

<button class="task--button daylight-button" onclick={toggleDaylight} aria-label="Switch daylight mode"><span class={isDaylight ? 'icon-dark' : 'icon-light'} ></span></button>


<style>
    .daylight-button {
        background: rgba(0,221,255,.7);
        color: #FFFF88;
    }

    :global {
        .daylight .daylight-button {
            background: #000;
            color: #FFF;
        }
    }
</style>