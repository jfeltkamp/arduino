<script>
  import obelixAPI from "$lib/obelix-api.js";

  const captureImage = () => {
    obelixAPI('/cam/capture-img/image', (data) => {
      console.log('Capture image', data);
    })
  }

  const snailShot = () => {
    obelixAPI('/cam/snail-shot/3/3/cam_a', (data) => {
      console.log('Snails', data);
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
</style>