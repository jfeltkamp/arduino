<script>
    import Joystick from "./Joystick.svelte";
    import Adjust from "./Adjust.svelte";

    let status = $state('mov');
    const toggleStatus = (e) => {
      e.preventDefault();
      status = (status === 'mov') ? 'adj' : 'mov';
    }
</script>


<div class="joystick-wrapper">
    {#if status === 'mov'}
        <Joystick toggle={toggleStatus} />
    {:else}
        <Adjust toggle={toggleStatus} />
    {/if}
</div>

<style>
    .joystick-wrapper {
        position: relative;
        margin: 0 1em;
        height: 100%;
        overflow: hidden;
    }
</style>