<script>
  import {onDestroy} from "svelte";
  import Icon from "../tools/Icon.svelte";
  import {positions, arduinoSettings} from "$lib/data-store.js";
  import obelixAPI from "$lib/obelix-api.js";

  let addPosOpen = $state(false);
  let newName = $state();
  let items = $state([]);

  const unsubscribe = positions.subscribe((pos) => {
    items = [...pos.base]
  })

  const savePosition = () => {
    const id = newName.replace(/\W+/g, "_").toLowerCase();
    if (id) {
      let hasUpdated = false;
      const {x, y, f} = {...$arduinoSettings}
      let updated = items.map((i) => {
        if (i.id !== id) {
          return i;
        } else {
          hasUpdated = true;
          return {
            ...i, pos: {
              x: x,
              y: y,
              f: f
            }
          }
        }
      });
      if (!hasUpdated) {
        updated.push({
          id: id,
          name: newName,
          pos: {
            x: x,
            y: y,
            f: f
          }
        });
      }
      positions.update((pos) => ({ ...pos, base: updated }))
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

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  })
</script>

<div class="nav-grid">
    <div class="nav-curr-pos uk-padding-small">
        <h4>{$positions.geo.addr}</h4>
        <div>{$positions.geo.lat}°, {$positions.geo.lon}°</div>
    </div>
    <div class="nav-selector uk-padding-small">
        <select class="uk-select uk-margin-bottom">
            <option value="">- Your location -</option>
            <option></option>
        </select>
        <button class="uk-button uk-button-primary uk-button-small uk-align-right">+ Add</button>
    </div>
    <div class="nav-list uk-padding-small">
        <ul id="nav-nav" class="uk-iconnav uk-iconnav-vertical">
            {#each items as item}
                <li><a href={`/position/${item.id}`} onclick={(e) => callback(e, `/position/${item.id}`)}><span class="uk-icon" uk-icon=""><Icon type={item.id} size={1.35}/></span> <span>{item.name}</span></a></li>
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
</style>