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

    <button class="button {(status === 'mov') ? 'icon-resize-small' : 'icon-move'}" type="button" onclick={toggleStatus}><span>{(status === 'mov') ? 'ADJ' : 'MOV'}</span></button>
</div>

<style>
    .joystick-wrapper {
        position: relative;
        padding: 0 1em;
        height: 100%;

    }
    .button {
        position: absolute;
        bottom: 1em;
        left: 1em;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba(255,255,255,.3);
        color: #FFF;
        text-align: center;
        border: 2px solid #FFF;

        &::before {
            font-size: 2em;
            margin: 0;
            padding: 0;
        }
        span {
            display: none;
        }
    }
</style>