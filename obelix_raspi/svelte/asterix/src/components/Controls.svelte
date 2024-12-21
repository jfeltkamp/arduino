<script>
    import Manual from "./controls/Manual.svelte";
    import Navigation from "./controls/Navigation.svelte";
    import CamOptions from "./controls/CamOptions.svelte";

    const tabs = [
      {id: 'manual', name: 'Manual'},
      {id: 'position', name: 'Position'},
      {id: 'camera', name: 'Camera'},
      {id: 'view', name: '<span class="icon-eye"></span>'}
    ]
    let active = $state('manual');

    const switchTab = (e, tab) => {
      e.preventDefault();
      active = tab;
    }
</script>

<div class="tools-wrapper">
    <div class="tools">
        {#if active === 'manual'}
            <Manual />
        {:else if active === 'position'}
            <Navigation />
        {:else if active === 'camera'}
            <CamOptions />
        {/if}
    </div>
    <ul class="tool-selector">
        {#each tabs as tab}
            <li class={(active === tab.id) ? 'active' : ''}><a href="/" onclick={(e) => switchTab(e, tab.id)}>{@html tab.name}</a></li>
        {/each}
    </ul>
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
    .tool-selector {
        margin: 0;
        padding: 0 2em 0 0;
        list-style: none;
        display: flex;
        justify-content: space-around;
        height: 52px;

        a {
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
            margin: 0 .5em;
            padding: 0 .5em;
        }

        .active a {
            color: #FD0;
        }
    }
</style>