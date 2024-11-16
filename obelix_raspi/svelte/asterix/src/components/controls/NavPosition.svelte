<script>
  import { onDestroy } from "svelte";
  import Icon from "../tools/Icon.svelte";
  import { positions, arduinoSettings } from "$lib/data-store.js";
  import obelixAPI, { obelixPost } from "$lib/obelix-api.js";
  import {strToId} from "$lib/helper.js";

  let { toggleAdmin } = $props();

  let editHeaderOpen = $state(false);
  let addPosOpen = $state(false);
  let newName = $state();
  let address = $state('');
  let latitude = $state('');
  let longitude = $state('');
  let items = $state([]);


  const unsubscribe = positions.subscribe((pos) => {
    if (pos?.fid) {
        address = pos.geo.addr;
        latitude = pos.geo.lat;
        longitude = pos.geo.lon;
        items = [...pos.base];
    }
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  })

  const writeStore = () => {
    const posClone = {...$positions}
    obelixPost(`/navi/position/update/${posClone.fid}`, posClone, (data) => {
      console.log('SVELTE saved', data)
    })
  }

  const saveHeader = () => {
    const geo = {
      addr: address,
      lat: parseFloat(latitude),
      lon: parseFloat(longitude)
    }
    positions.update((pos) => ({ ...pos, geo: geo }));
    writeStore();
    editHeaderOpen = false;
  }

  const savePosition = () => {
    const id = strToId(newName);
    if (id) {
      let hasUpdated = false;
      const pos = (({ x, y, f }) => ({  x, y, f }))($arduinoSettings);
      let updated = items.map((i) => {
        if (i.id !== id) {
          return i;
        } else {
          hasUpdated = true;
          return {...i, pos: pos }
        }
      });
      if (!hasUpdated) {
        updated.push({
          id: id,
          name: newName,
          pos: pos
        });
      }
      positions.update((pos) => ({ ...pos, base: updated }));
      writeStore();
      newName = ''
    }

    addPosOpen = false;
  }

  const callback = (e, path) => {
    e.preventDefault();
    obelixAPI(path, response => {
      console.log('SVELTE position', response)
    })
  }
</script>

<div class="nav-grid">
    <div class="nav-curr-pos uk-padding-small">
        {#if editHeaderOpen}
            <input type="text" id="address" bind:value={address} placeholder="Address" class="uk-input uk-margin-small-bottom"  />
            <input type="text" id="latitude" bind:value={latitude} placeholder="Latitude" class="uk-input uk-margin-small-bottom" />
            <input type="text" id="longitude" bind:value={longitude} placeholder="Longitude" class="uk-input uk-margin-small-bottom" />
            <button class="uk-button uk-button-small" onclick={saveHeader}>Save</button>
        {:else}
            <div class="editable" onclick={() => { editHeaderOpen = true }} role="button" tabindex="0">
                <h4>{address}</h4>
                <div>{latitude}°, {longitude}°</div>
            </div>
        {/if}
    </div>
    <div class="nav-selector uk-padding-small">
        <button class="uk-button uk-button-small uk-align-right" onclick={toggleAdmin}>location</button>
    </div>
    <div class="nav-list uk-padding-small">
        <ul id="nav-nav" class="uk-iconnav uk-iconnav-vertical">
            {#each items as item}
                <li><a href={`/navi/position/${item.id}`} onclick={(e) => callback(e, `/navi/position/${item.id}`)}><span class="uk-icon" uk-icon=""><Icon type={item.id} size={1.35}/></span> <span>{item.name}</span></a></li>
            {/each}
        </ul>
    </div>
    <div class="nav-add uk-padding-small">
        {#if addPosOpen}
            <label for="new-name">Save/update current position as ...</label>
            <input type="text" id="new-name" bind:value={newName} class="uk-input uk-margin-bottom" placeholder="Enter a position name" />
            <button class="uk-button uk-button-small" onclick={savePosition}>Save</button>
        {:else}
            <button class="uk-button uk-button-small" onclick={() => { addPosOpen = true }}>+ Add</button>
        {/if}
    </div>
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
    .editable:hover {
        background: rgba(0,0,0,.2);
        border-radius: 5px;
        box-shadow: 0 0 0 .5em rgba(0,0,0,.2);

        &::after {
            content: 'EDIT';
            color: #FFF;
        }
    }
</style>