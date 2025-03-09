<script>
  import { goto } from '$app/navigation';
  import obelixAPI from "$lib/obelix-api.js";
  import { daylight } from '$lib/data-store.js';
</script>

<div class={'container' + ($daylight ? ' daylight' : '')}>
    <div class="tasks">
        <button onclick={() => goto('/')} class="task--button" aria-label="Goto home page"><span class="icon-home"></span></button>
    </div>
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

    .system-commands {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 80px;
    }

</style>