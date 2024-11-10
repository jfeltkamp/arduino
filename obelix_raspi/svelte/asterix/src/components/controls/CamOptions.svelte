<script>
    import Slider from '../tools/Slider.svelte';
    import { camControls } from '$lib/data-store.js';

    const callback = (id, value) => {
      camControls.update(controls => controls.map(control => (control.id === id) ? { ...control, value: value } : { ...control }));
      console.log('SVELTE callback', `/cam/controls/${id}/${value}`)
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