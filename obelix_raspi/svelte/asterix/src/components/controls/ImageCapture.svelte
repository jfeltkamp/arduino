<script>

  const captureImage = () => {
    console.log('Capture image ==> ;-)')
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