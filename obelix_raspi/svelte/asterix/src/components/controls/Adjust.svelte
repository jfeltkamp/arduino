<script>
  import { onMount, onDestroy } from 'svelte';
  import AdjustController from '$lib/adjust.js';
  import obelixAPI from "$lib/obelix-api.js";

  let { toggle } = $props()

  let adjust = null;
  onMount(() => {
    adjust = new AdjustController(document.getElementById('adjust'), (path) => {
      obelixAPI(path, (data) => {
        console.log('SVELTE Adjust', data);
      })
    });
  });

  onDestroy(() => {
    if (adjust && adjust.hasOwnProperty('destroy')) {
      adjust.destroy()
    }
  })
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 781 710">
    <defs>
        <path id="arr1" d="M45 45 5 45 10 95 95 95 95 10 45 5z" />
        <path id="arr2" d="M105 105 11 105 17 165 165 165 165 17 105 11z" />
        <path id="arr3" d="M175 175 18 175 25 245 245 245 245 25 175 18z" />
        <circle id="cir1" r="44" cy="73"/>
        <path id="cir2" d="M-54 73 A 75 75 0 1 0 54 73 A 54 54 0 0 1 -54 73z"/>
        <path id="cir3" d="M-85 125 A 108 108 0 1 0 85 125 A 54 54 0 0 1 -85 125z"/>
    </defs>
    <g id="adjust" transform="translate(355 355)">
        <g transform="rotate(135)">
            <use href="#arr1" data-dir="left" data-len="sm" />
            <use href="#arr2" data-dir="left" data-len="md" />
            <use href="#arr3" data-dir="left" data-len="lg" />
        </g>
        <g transform="rotate(-45)">
            <use href="#arr1" data-dir="right" data-len="sm" />
            <use href="#arr2" data-dir="right" data-len="md" />
            <use href="#arr3" data-dir="right" data-len="lg" />
        </g>
        <g transform="rotate(-135)">
            <use href="#arr1" data-dir="up" data-len="sm" />
            <use href="#arr2" data-dir="up" data-len="md" />
            <use href="#arr3" data-dir="up" data-len="lg" />
        </g>
        <g transform="rotate(45)">
            <use href="#arr1" data-dir="down" data-len="sm" />
            <use href="#arr2" data-dir="down" data-len="md" />
            <use href="#arr3" data-dir="down" data-len="lg" />
        </g>

        <g transform="translate(360 -50) rotate(165)">
            <use href="#cir1" data-dir="further" data-len="sm" />
            <use href="#cir2" data-dir="further" data-len="md" />
            <use href="#cir3" data-dir="further" data-len="lg" />
        </g>
        <g transform="translate(360 50) rotate(15)">
            <use href="#cir1" data-dir="closer" data-len="sm" />
            <use href="#cir2" data-dir="closer" data-len="md" />
            <use href="#cir3" data-dir="closer" data-len="lg" />
        </g>
        <a href="#toggle" onclick={toggle} role="button" tabindex="0" aria-label="Change to Joystick">
            <g id="joys-swap" transform="translate(-285,250)">
                <circle class="element" r="36" />
                <g transform="translate(-30,-30) scale(2.5)">
                    <path id="joys-swap" d="M17.707 8.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.293 1.293h-4.586v-4.586l1.293 1.293c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-3.707-3.707-3.707 3.707c-.391.391-.391 1.023 0 1.414s1.023.391 1.414 0l1.293-1.293v4.586h-4.586l1.293-1.293c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-3.707 3.707 3.707 3.707c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-1.293-1.293h4.586v4.586l-1.293-1.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l3.707 3.707 3.707-3.707c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-1.293 1.293v-4.586h4.586l-1.293 1.293c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l3.707-3.707-3.707-3.707z"/>
                </g>
            </g>
        </a>
    </g>
</svg>

<style>
    svg {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center center;
    }
    #adjust use {
        fill: rgba(255,255,255,.3);
        stroke: #FFF;
        stroke-width: 4;
        stroke-linejoin: round;
        cursor: pointer;
    }
    #adjust #joys-swap {
        fill: #FFF;
        cursor: pointer;
    }
    .element {
        fill: rgba(255,255,255,.3);
        stroke: #FFF;
        stroke-width: 4;
        stroke-linejoin: round;
    }
</style>