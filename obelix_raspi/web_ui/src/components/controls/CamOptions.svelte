<script>
    import Slider from '../tools/Slider.svelte';
    import { camControls } from '$lib/data-store.js';
    import obelixAPI, { obelixPost } from "$lib/obelix-api.js";

    const callback = (id, value) => {
      camControls.update(controls => controls.map(control => (control.id === id) ? { ...control, value: value } : { ...control }));
      obelixAPI(`/cam/ctrl/${id}/${value}`, (data) => {
        console.log('SVELTE CamCtrl', data);
      })
    }

    const resetDefaults = () => {
      camControls.update(controls => controls.map(control => ({ ...control, value: control.defaultValue })));
      const updater = {}
      for (let control of $camControls) {
        if (control?.id) {
            updater[control.id] = control.defaultValue;
        }
      }
      obelixPost('/cam/controls', updater, (data) => {
        console.log('SVELTE Cam Controls', data);
      })
    }
</script>

<div class="camera-options">
    {#each $camControls as option, i (option.name)}
        <Slider {...option} index={i} onchange={callback} />
    {/each}
    <div class="actions-wrapper">
        <button onclick={resetDefaults}>Reset defaults</button>
    </div>
</div>

<style>
    .camera-options {
        padding: 0.75em;
        max-height: 100%;
    }

    .actions-wrapper {
        margin: .3em 0 .3em auto;
        padding: .3em 0;
        max-width: 350px;
        text-align: center;
    }
    button {
        border: 2px solid var(--border-color);
        background: var(--background);
        border-radius: 5px;
        color: inherit;
    }
</style>