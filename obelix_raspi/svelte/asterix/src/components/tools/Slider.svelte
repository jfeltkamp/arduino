<script>
    import { onMount, onDestroy } from 'svelte';
    import SliderController from '$lib/slider.js';

    const { id, name, callback, index, value = 0, minValue = 0, maxValue = 10, steps = 1 } = $props()
    const range = maxValue - minValue
    const initialValue = (value - minValue) / range;
    const pre = precision(steps);

    let slider = null;
    onMount(() => {
      slider = new SliderController(document.getElementById('slider_slide_' + id), (rad) => {
        const valueNew = range * rad + minValue;
        const valueNewStepped = parseFloat((Math.round(valueNew / steps) * steps).toFixed(pre));
        if (typeof callback === 'function') {
            callback(id, valueNewStepped);
        }
      }, initialValue);
    });

    onDestroy(() => {
      if (slider && slider.hasOwnProperty('destroy')) {
        slider.destroy()
      }
    });

    // Get prezision of steps.
    function precision(a) {
      if (!isFinite(a)) return 0;
      let e = 1, p = 0;
      while (Math.round(a * e) / e !== a) { e *= 10; p++; }
      return p;
    }
</script>

<svg viewBox="0 0 780 120">
    <rect class="slider" width="720" height="30" x="30" y="50" rx="15" ry="15" />
    <text class="label" x="40" y="25">{ name }</text>
    <g transform="translate(45 65)">
        <circle id={'slider_slide_' + id} class="slide" r="30"  />
    </g>
</svg>

<style>
    .slider {
        fill: #DDD;
    }
    .slide {
        fill: #1e87f0;
    }
    .label {
        font-size: 1.6666em;
    }
</style>