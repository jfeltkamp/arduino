<script>
  import { positions } from '$lib/data-store.js';
  import { strToId } from "$lib/helper.js";
  import obelixAPI from "$lib/obelix-api.js";

  let {toggleAdmin} = $props();
  let current = $positions.fid;

  let newLocation = $state('');
  let newLocationFid = $derived(strToId(newLocation));

  const locations = [
    {
      fid: "index",
      name: "Wischhofsweg 4"
    },
    {
      fid: "barsbuettel_4",
      name: "Barsbüttel 4"
    }
  ]

  const isCurrent = (fid) => ((fid === current) ? 'active' : '')

  const setActive = (fid) => {
    console.log('setActive', fid)
    if (!isCurrent(fid)) {
      obelixAPI(`/navi/location/${fid}`, (result) => {
        if (result?.fid === fid) {
          positions.update(result);
          console.log('Updated location from config')
        }
      })
    }
  }

  const addLocation = () => {
    console.log('addLocation')
  }

</script>

<div class="nav-grid">
    <div class="nav-curr-pos uk-padding-small">
        <h4>Locations</h4>
    </div>
    <div class="nav-selector uk-padding-small">
        <button class="uk-button uk-button-small uk-align-right" onclick={toggleAdmin}>Navigation</button>
    </div>
    <div class="nav-list uk-padding-small">
        <ul>
            {#each locations as location}
                <li class={isCurrent(location.fid)}><button class="loc-button" onclick={() => setActive(location.fid)}>{location.name}</button></li>
            {/each}
        </ul>
    </div>
    <div class="nav-add uk-padding-small">
        <input type="text" id="new-location" bind:value={newLocation} class="uk-input" placeholder="Enter a location name"/>
        <button class="uk-button uk-align-right uk-margin-remove-vertical" onclick={() => addLocation()}>+&nbsp;Add</button>
    </div>
    <div class="uk-padding-small uk-padding-remove-vertical">{newLocationFid}</div>
</div>


<style>
    h4 {
        margin-bottom: 0;
    }

    h4 + div {
        margin-bottom: .75em;
    }

    .nav-grid {
        display: flex;
        flex-wrap: wrap;
    }

    .nav-curr-pos,
    .nav-selector {
        flex: 1 1 50%;
        max-width: 50%;
    }

    .nav-list {
        flex: 1 1 100%;
        width: 100%;
    }

    .nav-add {
        flex: 1 1 100%;
        display: flex;
        flex-direction: row;
    }
    .loc-button {
        all: unset;
        cursor: pointer;
    }
    .active > .loc-button {
        color: #0a53be;
        font-size: 1.15em;
    }
</style>