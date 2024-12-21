<script>
    import { onMount, onDestroy } from 'svelte';
    import obelixAPI from '$lib/obelix-api.js'
    import JoystickController from '$lib/joystick.js';
    import FocusController from '$lib/focus.js';

    let joystick = null;
    let focus = null;

    onMount(() => {
      joystick = new JoystickController(document.getElementById('joys-stick'), (path) => {
        obelixAPI(path, (data) => {
          console.log('SVELTE Joystick', data);
        })
      });
      focus = new FocusController(document.getElementById("joys-slide"), (path) => {
        obelixAPI(path, (data) => {
          console.log('SVELTE Focus', data);
        })
      });
    });

    onDestroy(() => {
      if (joystick && joystick.hasOwnProperty('destroy')) {
        joystick.destroy()
      }
      if (focus && focus.hasOwnProperty('destroy')) {
        focus.destroy()
      }
    })
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 781 710">
    <defs>
        <circle id="joys-def-cir1" r="280" cy="0"/>
        <circle id="joys-def-cir2" r="80" cy="0"/>
        <path id="joys-def-arrow" d="M0 -120 -40 -100 40 -100z"/>
        <rect id="joys-def-slider" width="70" height="560" transform="translate(350 -280)" rx="15" ry="15" />
        <rect id="joys-def-slide" width="100" height="100" transform="translate(335 -50)" rx="15" ry="15" />
    </defs>
    <g id="joys" transform="translate(320 355)">
        <use id="joys-plate" href="#joys-def-cir1"/>
        <use id="joys-arrow-top" href="#joys-def-arrow"/>
        <use id="joys-arrow-right" href="#joys-def-arrow" transform="rotate(90)"/>
        <use id="joys-arrow-left" href="#joys-def-arrow" transform="rotate(-90)"/>
        <use id="joys-arrow-bottom" href="#joys-def-arrow" transform="rotate(180)"/>
        <!-- Adjust here                                  v -->
        <use id="joys-stick" href="#joys-def-cir2" style="transform: translate(0px, 0px)"/>

        <use id="joys-slider" href="#joys-def-slider"/>
        <!-- Adjust here                                    v -->
        <use id="joys-slide" href="#joys-def-slide"  style="transform: translateY(0px)"/>
    </g>
</svg>

<style>
    svg {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center center;
    }
    #joys use {
        fill: rgba(255,255,255,.3);
        stroke: #FFF;
        stroke-width: 4;
        stroke-linejoin: round;
    }
    #joys #joys-slide,
    #joys #joys-stick {
        fill: #7c7c7c;
        cursor: pointer;
    }
</style>