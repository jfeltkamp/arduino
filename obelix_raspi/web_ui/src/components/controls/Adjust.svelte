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
        <path id="arr1" d="M0 -80 40 -60 40 0 0 -20 -40 0 -40 -60z" />

        <!-- path id="arr1" d="M45 45 10 45 10 95 95 95 95 10 45 10z" / -->
        <path id="arr2" d="M95 95 70 95 70 165 165 165 165 70 95 70z" />
        <path id="arr3" d="M165 165 130 165 130 245 245 245 245 130 165 130z" />
        <circle id="cir1" r="40" cy="30"/>
        <circle id="cir2" r="50" cy="120"/>
        <circle id="cir3" r="60" cy="230"/>

        <path id="cir3" d="M-85 125 A 108 108 0 1 0 85 125 A 54 54 0 0 1 -85 125z"/>
    </defs>
    <g id="adjust" transform="translate(355 355)">
        <g transform="rotate(0)">
            <use href="#arr1" transform="translate(0 -50)" data-dir="up" data-len="sm" />
            <use href="#arr1" transform="translate(0 -120)" data-dir="up" data-len="md" />
            <use href="#arr1" transform="translate(0 -190)" data-dir="up" data-len="lg" />
        </g>
        <g transform="rotate(90)">
            <use href="#arr1" transform="translate(0 -50)" data-dir="right" data-len="sm" />
            <use href="#arr1" transform="translate(0 -120)" data-dir="right" data-len="md" />
            <use href="#arr1" transform="translate(0 -190)" data-dir="right" data-len="lg" />
        </g>
        <g transform="rotate(180)">
            <use href="#arr1" transform="translate(0 -50)" data-dir="down" data-len="sm" />
            <use href="#arr1" transform="translate(0 -120)" data-dir="down" data-len="md" />
            <use href="#arr1" transform="translate(0 -190)" data-dir="down" data-len="lg" />
        </g>
        <g transform="rotate(270)">
            <use href="#arr1" transform="translate(0 -50)" data-dir="left" data-len="sm" />
            <use href="#arr1" transform="translate(0 -120)" data-dir="left" data-len="md" />
            <use href="#arr1" transform="translate(0 -190)" data-dir="left" data-len="lg" />
        </g>

        <g transform="translate(360 0)">
            <use href="#arr1" transform="translate(0 -50)" data-dir="further" data-len="sm" />
            <use href="#arr1" transform="translate(0 -120)" data-dir="further" data-len="md" />
            <use href="#arr1" transform="translate(0 -190)" data-dir="further" data-len="lg" />
        </g>
        <g transform="translate(360 0) rotate(180)">
            <use href="#arr1" transform="translate(0 -50)" data-dir="closer" data-len="sm" />
            <use href="#arr1" transform="translate(0 -120)" data-dir="closer" data-len="md" />
            <use href="#arr1" transform="translate(0 -190)" data-dir="closer" data-len="lg" />
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
        fill: var(--background);
        stroke: var(--border-color);
        stroke-width: 4;
        stroke-linejoin: round;
        cursor: pointer;
    }
    #adjust #joys-swap {
        fill: var(--color);
        cursor: pointer;
    }
    .element {
        fill: var(--background);
        stroke: var(--border-color);;
        stroke-width: 4;
        stroke-linejoin: round;
    }
</style>