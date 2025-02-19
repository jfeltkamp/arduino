<script>
  import Slider from '../tools/Slider.svelte';
  import { sphereControls } from '$lib/data-store.js';
  import {onDestroy} from "svelte";

  let controls = $state([]);
  const unsubscribe = sphereControls.subscribe((ctrls) => {
    controls = ctrls.map(c => ({...c}));
  });

  const callback = (id, value) => {
    sphereControls.update(controls => controls.map(control => (control.id === id) ? { ...control, value: value } : {...control}));
  }

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  })

</script>

<div class="sphere-config">
    {#each controls as option, i}
        <Slider {...option} index={i} callback={callback} />
    {/each}
</div>

<style>
    .sphere-config {
        padding: 0.75em;
        max-height: 100%;
    }
</style>