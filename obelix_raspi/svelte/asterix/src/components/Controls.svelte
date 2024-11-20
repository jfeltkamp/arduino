<script>
    import Manual from "./controls/Manual.svelte";
    import Navigation from "./controls/Navigation.svelte";
    import CamOptions from "./controls/CamOptions.svelte";

    const tabs = [
      {id: 'manual', name: 'Manual'},
      {id: 'position', name: 'Position'},
      {id: 'camera', name: 'Camera'}
    ]
    let active = $state('manual');

    const switchTab = (e, tab) => {
      e.preventDefault();
      active = tab;
    }
</script>

<div class="uk-card tools-wrapper">
    <ul id="tool-selector" class="uk-tab">
        {#each tabs as tab}
            <li class={(active === tab.id) ? 'uk-active' : ''}><a href="/" onclick={(e) => switchTab(e, tab.id)}>{tab.name}</a></li>
        {/each}
    </ul>
    <div class="tools">
        {#if active === 'manual'}
            <Manual />
        {:else if active === 'position'}
            <Navigation />
        {:else if active === 'camera'}
            <CamOptions />
        {/if}
    </div>
</div>

<style>
    .tools-wrapper {
        height: 100%;
    }

    .tools {
        width: 100%;
        height: calc(100% - 52px);
        overflow: auto;
    }
</style>