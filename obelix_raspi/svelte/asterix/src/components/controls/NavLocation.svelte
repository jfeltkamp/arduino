<script>
  import { onMount, onDestroy } from "svelte";
  import {positions, locations} from '$lib/data-store.js';
  import { strToId, getLocationTmpl} from "$lib/helper.js";
  import obelixAPI, {obelixPost} from "$lib/obelix-api.js";
  import Icon from "../tools/Icon.svelte";

  let {toggleAdmin} = $props();
  let current = $state('');

  const unsubscribe = positions.subscribe(pos => {
    current = pos.fid;
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  })
  // Edit locations
  let editLocation = $state(false);
  const toggleEdit = () => {
    editLocation = !editLocation
  }

  let newLocation = $state('');
  let newLocationFid = $derived(strToId(newLocation));

  // Executed when changing location.
  const loadLocation = (fid) => {
    if (fid !== current) {
      obelixAPI(`/navi/location/${fid}`, (result) => {
        if (result?.fid === fid) {
          positions.update(loc => ({...result}));
          console.log('Loaded location')
        }
      })
    }
  }

  const addLocation = () => {
    if (newLocationFid.length >= 3) {
      const location = getLocationTmpl(newLocationFid, newLocation);
      obelixPost(`/navi/position/update/${newLocationFid}`, location, (data) => {
        positions.update(pos => location);
        locations.update(loc => ([...loc, {fid: newLocationFid, addr: newLocation}]));
        console.log('SVELTE added new location', data);
      })
    } else {
      console.error('ID is too short. At least 3 char are required.');
    }
  }

  const deleteLocation = (fid) => {
    if (confirm(`Do you really want to delete location: "${fid}"`)) {
      obelixAPI(`/navi/location/delete/${fid}`, (result) => {
        if (result.success) {
          locations.update(locs => (locs.filter(loc => (loc.fid !== fid))));
          alert(`Location "${fid}" deleted`);
        }
      });
    } else {
      alert(`Deletion of "${fid}" canceled.`)
    }
  }

  onMount(() => {
    if ($locations.length === 0) {
      obelixAPI("/navi/location-list", (result) => {
        locations.update(loc => [...result])
        console.log('Loaded location list')
      })
    }
  })
</script>

<div class="nav-grid">
    <div class="nav-curr-pos uk-padding-small">
        <h4>Locations <button class={'edit-button' + ((editLocation)?' active':'')}  onclick={toggleEdit}><Icon type="edit" size={1.0}/></button></h4>
        <div><p>The location is the place where your telescope is placed.</p></div>
    </div>
    <div class="nav-selector uk-padding-small">
        <button class="uk-button uk-button-small uk-align-right" onclick={toggleAdmin}>Navigation</button>
    </div>
    <div class="nav-list uk-padding-small">
        <ul>
            {#each $locations as location}
                <li class={(location.fid === current) ? 'active' : ''}>
                    <button class="loc-button" onclick={() => loadLocation(location.fid)}><Icon type="home"/> {location.addr}</button>
                    {#if editLocation && (location.fid !== current) && (location.fid !== 'index')}
                        <button class="del-button" onclick={() => deleteLocation(location.fid)}><Icon type="delete" size={1.0}/></button>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
    {#if editLocation}
        <div class="nav-add uk-padding-small">
            <input type="text" id="new-location" bind:value={newLocation} class="uk-input"
                   placeholder="Enter a location name"/>
            <button class="uk-button uk-align-right uk-margin-remove-vertical" onclick={() => addLocation()}>+&nbsp;Add
            </button>
        </div>
        <div class="uk-padding-small uk-padding-remove-vertical">{newLocationFid}</div>
    {/if}
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

    .nav-list ul {
        all: unset;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
    }
    .nav-list li {
        flex: 1 1 50%;
        list-style: none;
        margin: .55em 0;
    }

    .nav-add {
        flex: 1 1 100%;
        display: flex;
        flex-direction: row;
    }

    .loc-button {
        all: unset;
        display: inline-block;
        cursor: pointer;
    }
    .del-button {
        all: unset;
        cursor: pointer;
        display: inline-block;
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
    .active > .loc-button {
        color: #0a53be;
        font-size: 1.15em;
    }
</style>