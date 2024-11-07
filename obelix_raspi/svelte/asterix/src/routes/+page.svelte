<script>
  import Visuals from "../components/Visuals.svelte";
  import Controls from "../components/Controls.svelte";
</script>

<div class="grid-container">
    <div>
        <Visuals/>
    </div>
    <div>
        <Controls/>
    </div>
</div>

<style>
    .grid-container {
        display: flex;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
        background: #333;

        > div {
            background: #FFF;
            overflow: hidden;
        }

        @media (orientation: landscape) {
            flex-direction: row;
            > div {
                width: 50vw;
                height: 50vw;
                max-height: 100vh;
            }
        }

        @media (orientation: portrait) {
            flex-direction: column;
            > div {
                width: 50vh;
                height: 50vh;
                max-width: 100vw;
            }
        }
    }
</style>