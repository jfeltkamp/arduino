<script>
  let fullscreen = $state(false);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      fullscreen = true;
    } else {
      document.exitFullscreen();
      fullscreen = false;
    }
  }
</script>

<button class="task--button" onclick={toggleFullscreen} aria-label="Switch fullscreen mode"><span class={fullscreen ? "icon-viewport" : "icon-fullscreen"}></span></button>
