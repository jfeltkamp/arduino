<script>
  import Slider from '../tools/Slider.svelte';
  import { sphereControls } from '$lib/data-store.js';
  import {onDestroy} from "svelte";
  import {obelixPost} from "$lib/obelix-api.js";

  let message = $state();

  let controls = $state([]);
  const unsubscribe = sphereControls.subscribe((ctrls) => {
    controls = ctrls.map(c => ({...c}));
  });

  const callback = (id, value) => {
    console.log()
    sphereControls.update(controls => controls.map(control => (control.id === id) ? { ...control, value: value } : {...control}));
  }

  const saveSettings = () => {
    const data = {}
    for (let control of $sphereControls) {
      data[control.id] = control.value
    }
    obelixPost('/config/sphere/settings', data, (resp) => {
      message = (resp?.response === 200) ?
        '<span style="color:#090">Successfully saved settings.</span>' :
        '<span style="color:#B00">Failed to save settings.</span>';
      setTimeout(() => { message = null; }, 5000);
    })
  }

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  })

</script>

<div class="sphere-config">

    {#if message}
        <h3 class="message">{@html message}</h3>
    {/if}

    {#each controls as option, i}
        <Slider {...option} index={i} oninput={callback} />
    {/each}

    <div class="actions-wrapper">
        <a href="/system" class="button"><span class="icon-settings"></span>System</a>
        <button class="button" onclick={saveSettings}>Save settings</button>
    </div>
</div>

<style>
    .message {
        background: #FFF;
        padding: 1em;
        border: 2px solid #333;
        max-width: 350px;
        text-shadow: none;
        margin-left: auto;
    }
    .sphere-config {
        padding: 0.75em;
        max-height: 100%;
    }
    .actions-wrapper {
        margin: .3em 0 .3em auto;
        padding: .3em 0;
        max-width: 350px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>