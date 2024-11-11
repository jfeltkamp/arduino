<script>
    import Slider from '../tools/Slider.svelte';
    import { camControls } from '$lib/data-store.js';
    import obelixAPI from "$lib/obelix-api.js";

    const callback = (id, value) => {
      camControls.update(controls => controls.map(control => (control.id === id) ? { ...control, value: value } : { ...control }));
      obelixAPI(`/cam/ctrl/${id}/${value}`, (data) => {
        console.log('SVELTE CamCtrl', data);
      })
    }
</script>

<div class="camera-options">
    {#each $camControls as option, i (option.name)}
        <Slider {...option} index={i} callback={callback} />
    {/each}
</div>

<style>
    .camera-options {
        padding: 0.75em
    }
</style>