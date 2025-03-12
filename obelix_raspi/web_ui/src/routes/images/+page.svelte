<script>
  import obelixAPI from "$lib/obelix-api.js";
  import { daylight } from '$lib/data-store.js';
  import {onMount} from "svelte";
  import Gallery from "../../components/gallery/Gallery.svelte";
  import Tasks from "../../components/Tasks.svelte";

  let items = $state([]);
  onMount(() => {
    obelixAPI('/gallery/images', (data) => {
      items = data
    })
  })
</script>

<div class="container {($daylight ? 'daylight' : '')}">
    <Tasks />
    <Gallery {items} />
</div>

<style>
    .container {
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        overflow-y: auto;
        background: #333;
        color: var(--color);
    }
</style>