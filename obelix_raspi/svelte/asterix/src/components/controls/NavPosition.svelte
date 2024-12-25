<script>
  import { onDestroy } from "svelte";
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

  const iconClass = (id) => {
    if (id === 'home') {
      return 'icon-home'
    }
    else if (id === 'polaris') {
      return 'icon-star'
    }
    return 'icon-target'
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

<div class="content-card">
    <div class="nav-curr-pos">
        {#if editPositions}
            <h1><input type="text" id="address" bind:value={address} placeholder="Address" /></h1>
            <div class="flexbox">
                <input type="text" id="latitude" bind:value={latitude} placeholder="Latitude" />
                <input type="text" id="longitude" bind:value={longitude} placeholder="Longitude" />
            </div>
            <button class="button button-small" onclick={saveHeader}>Save location</button> <button class="button" onclick={() => { editPositions = false; }}>Cancel</button>
        {:else}
            {#if address}
                <h1>{address} <button class="edit-button icon-edit" onclick={() => { editPositions = true }} aria-label="Edit"></button></h1>
            {/if}
            {#if latitude && longitude}
                <div>{latitude}°, {longitude}°</div>
            {/if}
        {/if}
    </div>
    <div class="nav-list">
        <ul class="icon-nav">
            {#each items as item}
                <li>
                    <button class="nav-button {iconClass(item.id)}" onclick={(e) => callback(e, `/navi/position/${item.id}`)}>{item.name}</button>
                    {#if editPositions  && (item.id !== 'home') && (item.id !== 'polaris')}
                        <button class="delete-button icon-delete" onclick={() => deletePosition(item.id)} aria-label="Delete" title="Delete"></button>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
    {#if editPositions}
        <div class="nav-add">
            <label for="new-name">Save/update current position as ...</label>
            <input type="text" id="new-name" bind:value={newName} class="input" placeholder="Enter position name" />
            <div class="margin-bottom"><sub>ID: {newNameId}</sub></div>
            <button class="button button-small" disabled={newNameId.length < 3} onclick={savePosition}>Save target</button>
        </div>
    {:else}
        <div class="nav-selector">
            <button class="button button-small" onclick={toggleAdmin}>Change location</button>
        </div>
    {/if}
</div>

<style>
    :global {
        .content-card {
            background: #333;
            padding: 1rem;
            margin: 0 1em 2em;
            border-radius: .75em;
            overflow: hidden;
            box-shadow: 2px 2px 7px 1px rgba(255,255,255,.4);

            h1 {
                margin: -1rem -1rem 1rem -1rem;
                padding: 1rem;
                font-size: 1.25rem;
                line-height: 1.25em;
                background: #000;
            }
        }

        .flexbox {
            display: flex;
            flex-direction: row;

            & > * {
                flex: 1 1 calc(50% - 2rem);
                width: calc(50% - 2rem);
                margin: 1rem;
            }
        }

        input[type="text"] {
            display: block;
            background: rgba(255,255,255,.3);
            border: 2px solid #FFF;
            font-size: 1.25rem;
            color: #FFF;
            padding: .25em;
            margin: .5em 0;
            border-radius: .3em;
            max-width: 100%;
        }
        h1 input[type="text"] {
            margin: 0;
        }
        .button {
            border: .5px solid #999;
            font-size: 1rem;
            padding: .25rem .5rem;
            background: #222;
            border-radius: 5px;
            color: inherit;
        }
        .edit-button {
            all: unset;
            cursor: pointer;
            display: inline-block;
            margin-left: 1em;
            border-radius: 5px;
        }
        .icon-nav {
            list-style: none;
            margin: 1em 0;
            padding: 0;
        }
        .icon-nav > li {
            font-size: 1.25em;
            line-height: 1.75em;

            &.active {
                color: #FC0;
            }
        }

        .nav-button {
            all: unset;
            cursor: pointer;
        }
        .delete-button {
            all: unset;
            cursor: pointer;
            margin-left: .35em;
        }
    }
</style>