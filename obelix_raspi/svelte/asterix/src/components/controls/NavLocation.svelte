<script>
  import { onMount, onDestroy } from "svelte";
  import {positions, locations} from '$lib/data-store.js';
  import { strToId, getLocationTmpl} from "$lib/helper.js";
  import obelixAPI, {obelixPost} from "$lib/obelix-api.js";

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
        newLocation = '';
        console.log('Added new location', data);
      })
    } else {
      console.error('ID is too short. At least 3 char are required.');
    }
  }

  const deleteLocation = (fid) => {
    if (confirm(`Do you really want to delete location: "${fid}"`)) {
      obelixAPI(`/navi/location/delete/${fid}`, (result) => {
        if (result.response === 200) {
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

<div class="content-card">
    <header>Locations <button class="edit-button icon-edit{(editLocation)?' active':''}"  onclick={toggleEdit} aria-label="Edit"></button></header>
    <div class="nav-curr-pos">
        <div><p>The location is the place where your telescope is placed.</p></div>
    </div>
    <div class="nav-list">
        <ul class="icon-nav">
            {#each $locations as location}
                <li class={(location.fid === current) ? 'active' : ''}>
                    <button class="nav-button icon-location" onclick={() => loadLocation(location.fid)}>{location.addr}</button>
                    {#if editLocation && (location.fid !== current) && (location.fid !== 'index')}
                        <button class="delete-button icon-delete" onclick={() => deleteLocation(location.fid)} aria-label="Delete"></button>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
    {#if editLocation}
        <div class="nav-add">
            <input type="text" id="new-location" bind:value={newLocation} class="input"
                   placeholder="Enter new location name"/>
            <button class="button" onclick={() => addLocation()}>+&nbsp;Add</button>
        </div>
        <div class="">{newLocationFid}</div>
    {:else}
        <div class="nav-selector">
            <button class="button button-small" onclick={toggleAdmin}>&laquo;&nbsp;Back</button>
        </div>
    {/if}
</div>
