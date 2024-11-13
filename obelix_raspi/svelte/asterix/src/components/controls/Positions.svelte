<script>
  import Icon from "../tools/Icon.svelte";
  import { positions } from "$lib/data-store.js";
  import obelixAPI from "$lib/obelix-api.js";


  const calback = (e, path) => {
    e.preventDefault();
    obelixAPI(path, response => {
        console.log('SVELTE position', response)
    })
  }
</script>

<div class="pos-wrapper uk-padding-small">
    <div id="nav-geo"></div>
    <ul id="nav-nav" class="uk-iconnav uk-iconnav-vertical">
        {#each $positions.base as item}
            <li><a href={`/position/${item.id}`} onclick={(e) => calback(e, `/position/${item.id}`)}><span class="uk-icon" uk-icon=""><Icon type={item.id} size={1.35}/></span> <span>{item.name}</span></a></li>
        {/each}
    </ul>
</div>