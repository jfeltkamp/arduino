<script>
    import Horizon from "./visuals/Horizon.svelte";
    import CamPreview from "./visuals/CamPreview.svelte";

    let display = $state('horizon')
    let toggleDisplay = (e) => {
      e.preventDefault();
      display = (display === 'horizon') ? 'cam1' : 'horizon'
    }
</script>

<div class="uk-card visuals">
    <a href="/" onclick={toggleDisplay}>
        {#if display === 'horizon'}
            <Horizon />
        {:else if display === 'cam1'}
            <CamPreview />
        {/if}
    </a>
</div>

<style>
    .visuals {
        width: 100%;
        height: 100%;
    }
</style>