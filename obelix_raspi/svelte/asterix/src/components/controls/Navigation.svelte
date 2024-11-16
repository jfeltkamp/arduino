<script>
  import { onMount } from 'svelte'
  import NavPosition from "./NavPosition.svelte";
  import NavLocation from "./NavLocation.svelte";
  import obelixAPI from "$lib/obelix-api.js";
  import {positions} from "$lib/data-store.js";

  let admin = $state(false);
  const toggleAdmin = () => { admin = !admin }

  onMount(() => {
    obelixAPI('/nav/location/index', (result) => {
      if (result?.fid === 'index') {
        positions.update(result);
        console.log('Updated location from config')
      }
    })
  })

</script>

{#if admin}
    <NavLocation toggleAdmin={toggleAdmin} />
{:else}
    <NavPosition toggleAdmin={toggleAdmin} />
{/if}

<style>

</style>