<script>
    import Horizon from "./visuals/Horizon.svelte";
    import CamPreview from "./visuals/CamPreview.svelte";
    import { displayCompass } from '$lib/data-store.js';
</script>

<div class="visuals">
    <CamPreview />
    {#if $displayCompass}
        <div class="layer">
            <Horizon />
        </div>
    {/if}
</div>

<style>
    .visuals {
        width: 100vw;
        height: 100vh;
        position: relative;
    }
    .layer {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
    }
</style>