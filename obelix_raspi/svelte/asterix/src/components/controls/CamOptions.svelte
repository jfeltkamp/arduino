<script>
    import Slider from '../tools/Slider.svelte';

    const options = $state([
      {
        id: 'brightness',
        name: 'Brightness',
        value: 0,
        minValue: -1,
        maxValue: 1,
        steps: 0.01,
      },
      {
        id: 'contrast',
        name: 'Contrast',
        value: 1,
        minValue: 0,
        maxValue: 32,
        steps: 0.1,
      },
      {
        id: 'saturation',
        name: 'Saturation',
        value: 1,
        minValue: 0,
        maxValue: 32,
        steps: 0.1,
      },
      {
        id: 'sharpness',
        name: 'Sharpness',
        value: 1,
        minValue: 0,
        maxValue: 16,
        steps: 0.1,
      }
    ]);

    const callback = (index, value) => {
      options[index].value = value;
      console.log('SVELTE callback', `/cam/controls/${options[index].name}/${value}`)
    }
</script>

<div class="camera-options">
    {#each options as option, i (option.name)}
        <Slider {...option} index={i} callback={callback} />
    {/each}
</div>

<style>
    .camera-options {
        padding: 0.75em
    }
</style>