<script>
  import obelixAPI from "$lib/obelix-api.js";
  const triggerDangerStop = () => {
    obelixAPI('/danger_stop', (data) => console.log(data))
  }
</script>

<button class="task--button" onclick={triggerDangerStop} aria-label="Danger Stop"><span class="icon-cancel"></span></button>

<style>
    .icon-cancel {
        color: var(--color-danger);
        font-size: 1.3em;
    }
</style>