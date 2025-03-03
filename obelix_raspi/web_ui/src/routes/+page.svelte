<script>
  import Visuals from "../components/Visuals.svelte";
  import Controls from "../components/Controls.svelte";
  import OptionsMenu from "../components/OptionsMenu.svelte";
  import Tasks from "../components/Tasks.svelte";

  let daylight = $state(false);

  function toggleDaylight() {
    daylight = !daylight;
  }

</script>

<div class={'container' + (daylight ? ' daylight' : '')}>
    <button class="daylightButton" onclick={toggleDaylight} aria-label="Switch daylight mode"><span class={daylight ? 'icon-dark' : 'icon-light'} ></span></button>
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
        background: #333;
        color: var(--color);
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

    .daylightButton {
        position: fixed;
        top: 3%;
        right: 3%;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 20%;
        background: #FFF;
        border: none;
        font-size: 20px;
    }
</style>