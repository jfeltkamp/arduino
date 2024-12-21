<script>
  import { onDestroy } from "svelte";
  import Icon from "../tools/Icon.svelte";
  import { positions, arduinoSettings } from "$lib/data-store.js";
  import obelixAPI, { obelixPost } from "$lib/obelix-api.js";
  import {strToId} from "$lib/helper.js";

  let { toggleAdmin } = $props();

  let editPositions = $state(false);
  let newName = $state('');
  let newNameId = $derived(strToId(newName));
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
    editPositions = false;
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

    editPositions = false;
  }

  const deletePosition = (pid) => {
    if (confirm(`Do you really want to delete position: "${pid}"`)) {
      const base = [...$positions.base].filter(item => (item.id !== pid))
      positions.update(pos => ({...pos, base: base}))
      writeStore();
      editPositions = false;
    }
  }

  const callback = (e, path) => {
    e.preventDefault();
    obelixAPI(path, response => {
      console.log('SVELTE position', response)
    })
  }
</script>

<div class="nav-grid">
    <div class="nav-curr-pos">
        <h3>Navigation</h3>
        {#if editPositions}
            <input type="text" id="address" bind:value={address} placeholder="Address" class="input"  />
            <input type="text" id="latitude" bind:value={latitude} placeholder="Latitude" class="input" />
            <input type="text" id="longitude" bind:value={longitude} placeholder="Longitude" class="input" />
            <button class="button button-small" onclick={saveHeader}>Save</button> <button class="button" onclick={() => { editPositions = false; }}>Cancel</button>
        {:else}
            {#if address}
                <h4>{address} <button class="edit-button" onclick={() => { editPositions = true }}><Icon type="edit"/></button></h4>
            {/if}
            {#if latitude && longitude}
                <div>{latitude}°, {longitude}°</div>
            {/if}
        {/if}
    </div>
    <div class="nav-selector">
        <button class="button button-small" onclick={toggleAdmin}>location</button>
    </div>
    <div class="nav-list">
        <ul id="nav-nav" class="iconnav iconnav-vertical">
            {#each items as item}
                <li>
                    <button class="goto-button" onclick={(e) => callback(e, `/navi/position/${item.id}`)}><Icon type={item.id} size={1.35}/> {item.name}</button>
                    {#if editPositions  && (item.id !== 'home') && (item.id !== 'polaris')}
                        <button class="delete-button" onclick={() => deletePosition(item.id)}><Icon type="delete" size={.85}/></button>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
    <div class="nav-add">
        {#if editPositions}
            <label for="new-name">Save/update current position as ...</label>
            <input type="text" id="new-name" bind:value={newName} class="input" placeholder="Enter a position name" />
            <div class="margin-bottom"><sub>ID: {newNameId}</sub></div>
            <button class="button button-small" disabled={newNameId.length < 3} onclick={savePosition}>Save</button>
        {/if}
    </div>
</div>

<style>
    h4 {
        margin-bottom: 0;
        display: flex;
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

    .edit-button {
        all: unset;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.3em;
        height: 1.3em;
        margin-left: 1em;
        border: 1px solid currentColor;
        border-radius: 50%;
    }
    .goto-button {
        all: unset;
        cursor: pointer;
    }
    .delete-button {
        all: unset;
        cursor: pointer;
        margin-left: .35em;
    }
</style>