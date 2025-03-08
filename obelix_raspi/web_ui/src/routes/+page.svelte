<script>
  import Visuals from "../components/Visuals.svelte";
  import Controls from "../components/Controls.svelte";
  import OptionsMenu from "../components/OptionsMenu.svelte";
  import Tasks from "../components/Tasks.svelte";
  import { daylight } from '$lib/data-store.js';
</script>

<div class={'container' + ($daylight ? ' daylight' : '')}>
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

</style>