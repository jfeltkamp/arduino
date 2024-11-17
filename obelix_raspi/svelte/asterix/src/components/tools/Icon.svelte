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
    {:else if type === 'edit'}
        <!-- Edit -->
        <path fill="none" stroke="#000" d="M17.25,6.01 L7.12,16.1 L3.82,17.2 L5.02,13.9 L15.12,3.88 C15.71,3.29 16.66,3.29 17.25,3.88 C17.83,4.47 17.83,5.42 17.25,6.01 L17.25,6.01 Z"/>
        <path fill="none" stroke="#000" d="M15.98,7.268 L13.851,5.148"/>
    {:else if type === 'delete'}
        <!-- Delete -->
        <polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3"/>
        <polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4"/>
        <rect width="1" height="9" x="8" y="7"/>
        <rect width="1" height="9" x="11" y="7"/>
        <rect width="16" height="1" x="2" y="3"/>
    {:else if type === 'settings'}
        <!-- Settings -->
        <ellipse fill="none" stroke="#000" cx="6.11" cy="3.55" rx="2.11" ry="2.15"/>
        <ellipse fill="none" stroke="#000" cx="6.11" cy="15.55" rx="2.11" ry="2.15"/>
        <circle fill="none" stroke="#000" cx="13.15" cy="9.55" r="2.15"/>
        <rect width="3" height="1" x="1" y="3"/>
        <rect width="8" height="1" x="10" y="3"/>
        <rect width="8" height="1" x="1" y="9"/>
        <rect width="3" height="1" x="15" y="9"/>
        <rect width="3" height="1" x="1" y="15"/>
        <rect width="8" height="1" x="10" y="15"/>
    {:else if type === 'config'}
        <!-- Config -->
        <circle fill="none" stroke="#000" cx="9.997" cy="10" r="3.31"/>
        <path fill="none" stroke="#000" d="M18.488,12.285 L16.205,16.237 C15.322,15.496 14.185,15.281 13.303,15.791 C12.428,16.289 12.047,17.373 12.246,18.5 L7.735,18.5 C7.938,17.374 7.553,16.299 6.684,15.791 C5.801,15.27 4.655,15.492 3.773,16.237 L1.5,12.285 C2.573,11.871 3.317,10.999 3.317,9.991 C3.305,8.98 2.573,8.121 1.5,7.716 L3.765,3.784 C4.645,4.516 5.794,4.738 6.687,4.232 C7.555,3.722 7.939,2.637 7.735,1.5 L12.263,1.5 C12.072,2.637 12.441,3.71 13.314,4.22 C14.206,4.73 15.343,4.516 16.225,3.794 L18.487,7.714 C17.404,8.117 16.661,8.988 16.67,10.009 C16.672,11.018 17.415,11.88 18.488,12.285 L18.488,12.285 Z"/>
    {:else}
        <!-- Custom -->
        <circle fill="none" stroke="#000" cx="10" cy="10" r="7.5"/>
        <line fill="none" stroke="#000" x1="10" x2="10" y2="8"/>
        <line fill="none" stroke="#000" x1="10" y1="12" x2="10" y2="20"/>
        <line fill="none" stroke="#000" y1="10" x2="8" y2="10"/>
        <line fill="none" stroke="#000" x1="12" y1="10" x2="20" y2="10"/>
    {/if}
</svg>

