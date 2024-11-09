<script>
  let { type, size = 1 } = $props()
  let pxSize = $derived(Math.round(20 * size))
</script>


<svg width={pxSize} height={pxSize} viewBox="0 0 20 20">
    {#if type === 'home'}
        <!-- Home -->
        <polygon points="18.65 11.35 10 2.71 1.35 11.35 0.65 10.65 10 1.29 19.35 10.65"/>
        <polygon points="15 4 18 4 18 7 17 7 17 5 15 5"/>
        <polygon points="3 11 4 11 4 18 7 18 7 12 12 12 12 18 16 18 16 11 17 11 17 19 11 19 11 13 8 13 8 19 3 19"/>
    {:else if type === 'polaris'}
        <!-- Polaris -->
        <path fill="none" stroke="#000" d="M1,10.5 L19,10.5"/>
        <path fill="none" stroke="#000" d="M2.35,15.5 L17.65,15.5"/>
        <path fill="none" stroke="#000" d="M2.35,5.5 L17.523,5.5"/>
        <path fill="none" stroke="#000" d="M10,19.46 L9.98,19.46 C7.31,17.33 5.61,14.141 5.61,10.58 C5.61,7.02 7.33,3.83 10,1.7 C10.01,1.7 9.99,1.7 10,1.7 L10,1.7 C12.67,3.83 14.4,7.02 14.4,10.58 C14.4,14.141 12.67,17.33 10,19.46 L10,19.46 L10,19.46 L10,19.46 Z"/>
        <circle fill="none" stroke="#000" cx="10" cy="10.5" r="9"/>
    {:else}
        <!-- Custom -->
        <circle fill="none" stroke="#000" cx="10" cy="10" r="7.5"/>
        <line fill="none" stroke="#000" x1="10" x2="10" y2="8"/>
        <line fill="none" stroke="#000" x1="10" y1="12" x2="10" y2="20"/>
        <line fill="none" stroke="#000" y1="10" x2="8" y2="10"/>
        <line fill="none" stroke="#000" x1="12" y1="10" x2="20" y2="10"/>
    {/if}
</svg>

