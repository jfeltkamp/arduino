<script>
    import Joystick from "./Joystick.svelte";
    import Adjust from "./Adjust.svelte";

    let status = $state('mov');
    const toggleStatus = () => {
      status = (status === 'mov') ? 'adj' : 'mov';
    }
</script>


<div class="joystick-wrapper">
    {#if status === 'mov'}
        <Joystick />
    {:else}
        <Adjust />
    {/if}

    <button class="button" type="button" onclick={toggleStatus}>{(status === 'mov') ? 'ADJ' : 'MOV'}</button>
</div>

<style>
    .joystick-wrapper {
        flex: 1 1 80%;
        position: relative;
        padding: 0 15px;
        height: 100%;

    }
    .button {
        position: absolute;
        bottom: 1em;
        left: 1em;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: 2px solid #333;
    }
</style>