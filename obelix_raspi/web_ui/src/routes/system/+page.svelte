<script>
    import { goto } from '$app/navigation';
    import obelixAPI from "$lib/obelix-api.js";
    import { daylight } from '$lib/data-store.js';
    import Tasks from "../../components/Tasks.svelte";
</script>

<div class={'container' + ($daylight ? ' daylight' : '')}>
    <Tasks />

    <div class="system-commands">
        <button class="button btn-danger" type="button" onclick={() => {obelixAPI('/system/shutdown')}}>Shutdown</button>
        <button class="button btn-warn" type="button" onclick={() => {obelixAPI('/system/reboot')}}>Reboot System</button>
        <button class="button btn-info" type="button" onclick={() => {obelixAPI('/system/restart')}}>Restart Service</button>
        <button class="button" type="button" onclick={() => {obelixAPI('/debug')}}>Debug Mode</button>
    </div>
</div>

<style>
    .container {
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
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