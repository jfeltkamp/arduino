<script>
    import Manual from "./controls/Manual.svelte";
    import Navigation from "./controls/Navigation.svelte";
    import CamOptions from "./controls/CamOptions.svelte";
    import VideoCapture from "./controls/VideoRecord.svelte";
    import { toolTab } from '$lib/data-store.js';
    import {onDestroy} from "svelte";
    import ImageCapture from "./controls/ImageCapture.svelte";


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
        <VideoCapture />
    {:else if active === 'picture'}
        <ImageCapture />
    {/if}
</div>

<style>
    .tools {
        overflow: auto;
        min-width: 45vw;

        @media (orientation: landscape) {
            width: 100%;
            height: auto;
            max-height: 100%;
        }

        @media (orientation: portrait) {
            height: 100%;
            width: auto;
            max-width: 100%;
        }
    }
</style>