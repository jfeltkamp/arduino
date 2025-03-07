<script>
    import Manual from "./controls/Manual.svelte";
    import Navigation from "./controls/Navigation.svelte";
    import CamOptions from "./controls/CamOptions.svelte";
    import VideoCapture from "./controls/VideoRecord.svelte";
    import SphereConfig from "./controls/SphereConfig.svelte";
    import ImageCapture from "./controls/ImageCapture.svelte";
    import { toolTab } from '$lib/data-store.js';
</script>


{#if $toolTab}
    <div class="controls">
        <div class="tools">
            {#if $toolTab === 'target'}
                <Manual />
            {:else if $toolTab === 'sphere'}
                <SphereConfig />
            {:else if $toolTab === 'location'}
                <Navigation />
            {:else if $toolTab === 'adjust'}
                <CamOptions />
            {:else if $toolTab === 'video'}
                <VideoCapture />
            {:else if $toolTab === 'picture'}
                <ImageCapture />
            {/if}
        </div>
    </div>
{/if}

<style>
    .controls {
        background: transparent;
        overflow: hidden;
        position: fixed;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        bottom: 52px;
        right: 0;

        @media (orientation: landscape) {
            width: 45vw;
            height: calc(100vh - 52px);
        }

        @media (orientation: portrait) {
            width: 100vw;
            height: calc(45vh - 52px);
        }
    }

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