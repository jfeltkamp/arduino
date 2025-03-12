<script>
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    let goHome = $state(false)
    onMount(() => {
      goHome = window.location.pathname !== '/';
    })
</script>

{#if goHome}
    <button onclick={() => goto('/')} class="task--button" aria-label="Go home, baby."><span class="icon-home"></span></button>
{/if}