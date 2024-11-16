<script>
  import { onMount } from 'svelte'
  import NavPosition from "./NavPosition.svelte";
  import NavLocation from "./NavLocation.svelte";
  import obelixAPI from "$lib/obelix-api.js";
  import {positions} from "$lib/data-store.js";

  let admin = $state(false);
  const toggleAdmin = () => { admin = !admin }

  onMount(() => {
    if (!$positions?.fid) {
        obelixAPI('/navi/location/index', (result) => {
          if (result?.fid === 'index') {
            positions.update(loc => ({ ...result }));
          }
        })
    }
  })

</script>

{#if admin}
    <NavLocation toggleAdmin={toggleAdmin} />
{:else}
    <NavPosition toggleAdmin={toggleAdmin} />
{/if}

<style>

</style>