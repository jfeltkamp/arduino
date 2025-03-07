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
    <Controls/>
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