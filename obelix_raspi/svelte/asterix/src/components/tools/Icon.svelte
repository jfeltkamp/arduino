<script>
  let { type, size = 1 } = $props()
  let pxSize = $derived(Math.round(20 * size))
</script>


<svg width={pxSize} height={pxSize} viewBox="0 0 20 20">
    {#if type === 'home'}
        <!-- Home -->
        <path fill="none" stroke="#000" stroke-width="1.01" d="M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z"/>
        <circle fill="none" stroke="#000" cx="10" cy="6.8" r="2.3"/>
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

