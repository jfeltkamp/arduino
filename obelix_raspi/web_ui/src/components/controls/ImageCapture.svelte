<script>
  import obelixAPI from "$lib/obelix-api.js";
  import { swapPreview } from '$lib/data-store.js';

  const captureImage = () => {
    const cam = ($swapPreview === 'B') ? 'cam_b' : 'cam_a';
    obelixAPI(`/cam/capture-img/image/${cam}`, (data) => {
      console.log('Capture image', data);
    })
  }

  let snail_cols = $state(3);
  let snail_rows = $state(3);

  const snailShot = () => {
    const cam = ($swapPreview === 'B') ? 'cam_b' : 'cam_a';
    obelixAPI(`/cam/snail-shot/${snail_cols}/${snail_rows}/${cam}`, (data) => {
      console.log('Snails', data, cam);
    })
  }

</script>

<div id="image-capture">
    <button onclick={ captureImage } aria-label="Capture image">
        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84" height="84" width="84">
            <g transform="translate(42,42)">
                <circle r="28" fill="#C00" stroke="#C00" />
                <circle r="38" fill="none" stroke="#FFF" stroke-width="5" />
            </g>
        </svg>
    </button>

    <button onclick={ snailShot } aria-label="Snail shot">
        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84" height="84" width="84">
            <g transform="translate(42,42)">
                <polyline points="0,0 20,0 20,15 -20,15 -20,-15 40,-15 40,30 -20,30 -12,28 -12,32 -20,30" style="fill:none;stroke:#FFF;stroke-width:3;stroke-linejoin:round;" />
            </g>
        </svg>
    </button>

    <div class="dimensions">
        <label><span>hor</span><select bind:value={snail_cols} onchange={() => (console.log('X:', snail_cols))}>
            {#each Array.from({ length: 7 }) as _, index}
                <option>{index + 3}</option>
            {/each}
        </select></label>
        <label><span>ver</span><select bind:value={snail_rows} onchange={() => (console.log('Y:', snail_rows))}>
            {#each Array.from({ length: 7 }) as _, index}
                <option>{index + 3}</option>
            {/each}
        </select></label>
    </div>

</div>

<style>
    #image-capture {
        display: flex;
        justify-content: center;
    }
    button {
        appearance: none;
        background: transparent;
        border: 0;
        margin: 5vmin;
        padding: 0;
    }
    svg {
        width: 15vmin;
        height: 15vmin;
        max-width: 80px;
        max-height: 80px;
    }
    .dimensions {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;

        label {
            margin: .4em 0;
        }
        span {
            padding: 0 .5em;
        }
        select {
            background: transparent;
            color: inherit;
            font-size: inherit;
            border: 1px solid #FFF;
            border-radius: .3em;
        }
    }
</style>