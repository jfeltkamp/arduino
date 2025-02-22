<script>
  import { geoPath, geoOrthographic, geoGraticule } from 'd3-geo';
  import { arduinoSettings } from "$lib/data-store.js";
  import { onDestroy } from "svelte";

  // Get current angles from
  let azimuth, altitude;
  const unsubscribe = arduinoSettings.subscribe(conf => {
    azimuth = conf.deg_x;
    altitude = conf.deg_y;
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  })

  const {
    scale = 2000,
    steps = 5,
  } = $props();

  const graticule = geoGraticule()
    .stepMajor([45,45])
    .stepMinor([steps, steps]);

  let projection = $derived(
    geoOrthographic()
      .scale(scale)
      .rotate([azimuth, -altitude])
      .translate([1080 / 2, 810 / 2])
      .clipAngle(40)
  );

  let path = $derived(
    geoPath().projection(projection)
  );
</script>

<path d={path(graticule())} fill="none" stroke="rgb(255,255,255)" stroke-width="0.3" />
