
<script>

  import {onDestroy} from "svelte";
  import { toolTab, displayCompass } from '$lib/data-store.js';

  let active = $state('');
  const unsubscribe = toolTab.subscribe((tab) => {
    active = tab
  });

  let compass = $state(false)
  const unsubCompass = displayCompass.subscribe((doDisplay) => {
    compass = doDisplay
  });

  const switchTab = (to) => {
    toolTab.update(curr => {
      return (curr === to) ? '' : to;
    })
  }

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
    if (unsubCompass) {
      unsubCompass();
    }
  })


  const tabs = [
    {id: 'sphere', name: 'Sphere', icon: 'icon-settings', callback: () => {switchTab('sphere')}, enabled: () => (active === 'sphere')},
    {id: 'compass', name: 'Compass', icon: 'icon-compass', callback: () => {displayCompass.update(curr => !curr)}, enabled: () => compass},
    {id: 'location', name: 'Location', icon: 'icon-location', callback: () => {switchTab('location')}, enabled: () => (active === 'location')},
    {id: 'target', name: 'Target', icon: 'icon-target', callback: () => {switchTab('target')}, enabled: () => (active === 'target')},
    {id: 'adjust', name: 'Contrast', icon: 'icon-adjust', callback: () => {switchTab('adjust')}, enabled: () => (active === 'adjust')},
    {id: 'video', name: 'Video', icon: 'icon-video', callback: () => {switchTab('video')}, enabled: () => (active === 'video')},
    {id: 'picture', name: 'Picture', icon: 'icon-image', callback: () => {switchTab('picture')}, enabled: () => (active === 'picture')},
  ]
</script>


<div id="options-menu">
    <ul>
        {#each tabs as tab}
            <li class={(tab.enabled()) ? 'active' : ''}>
                <button onclick={tab.callback} class={tab.icon}><span>{tab.name}</span></button>
            </li>
        {/each}
    </ul>
</div>

<style>
    #options-menu {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 58px;
        width: 100vw;
    }
    ul {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;
        margin: 0;
        padding: 0;
        list-style: none;
        height: 100%;
    }
    li {
        flex: 1 1 15%;
        &.active {
            color: #FD0;
        }
    }
    button {
        border: 0;
        background: transparent;
        color: inherit;
        font-size: 1.5em;
        height: 52px;
        width: 90%;
        margin: 0 5%;
        cursor: pointer;

        span {
            display: none;
        }
        @media (min-width: 500px) {
            font-size: 2em;
        }
    }
</style>