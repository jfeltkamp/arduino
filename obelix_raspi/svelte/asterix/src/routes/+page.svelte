<script>
  import Visuals from "../components/Visuals.svelte";
  import Controls from "../components/Controls.svelte";
  import OptionsMenu from "../components/OptionsMenu.svelte";
  import Tasks from "../components/Tasks.svelte";
</script>

<div class="container">
    <Tasks/>
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

</style>