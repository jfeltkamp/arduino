<script>
    import Manual from "./controls/Manual.svelte";
    import Navigation from "./controls/Navigation.svelte";
    import CamOptions from "./controls/CamOptions.svelte";
    import { toolTab } from '$lib/data-store.js';
    import {onDestroy} from "svelte";


    let active = $state('');
    const unsubscribe = toolTab.subscribe((tab) => {
      active = tab
    });

    onDestroy(() => {
      if (unsubscribe) {
        unsubscribe();
      }
    })


    const switchTab = (e, tab) => {
      e.preventDefault();
      active = tab;
    }
</script>

<div class="tools">
    {#if active === 'target'}
        <Manual />
    {:else if active === 'location'}
        <Navigation />
    {:else if active === 'adjust'}
        <CamOptions />
    {:else if active === 'video'}
        <h1>Video</h1>
    {:else if active === 'picture'}
        <h1>Picture</h1>
    {/if}
</div>

<style>
    .tools {
        overflow: hidden;

        @media (orientation: landscape) {
            width: 100%;
            height: auto;
        }

        @media (orientation: portrait) {
            height: 100%;
            width: auto;
        }
    }
</style>