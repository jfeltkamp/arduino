<script>
  import Visuals from "../components/Visuals.svelte";
  import Controls from "../components/Controls.svelte";
  import OptionsMenu from "../components/OptionsMenu.svelte";
</script>

<div class="container">
    <Visuals/>
    <div class="controls">
        <Controls/>
    </div>
    <OptionsMenu/>
</div>

<style>
    .container {
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: #333333;

    }

    .controls {
        background: transparent;
        overflow: hidden;
        position: fixed;
        bottom: 0;
        right: 0;

        @media (orientation: landscape) {
            width: 50vw;
            height: 50vw;
            max-height: 100vh;
        }

        @media (orientation: portrait) {
            width: 50vh;
            height: 50vh;
            max-width: 100vw;
        }
    }
</style>