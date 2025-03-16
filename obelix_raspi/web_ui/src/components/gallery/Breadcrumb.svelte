<script>
    const {
      reset = () => {},
      item
    } = $props();

    const addr = $derived((item && item?.location?.addr) ? item.location.addr : '');
    const datetime = $derived((item && item?.datetime) ? (new Date(item.datetime)).toLocaleString() : '');

</script>


<div class="breadcrumb">
    {#if item}
        <button class="button breadcrumb--item" type="button" onclick={reset}>Start</button>
        <h2 class="breadcrumb--item" type="button"> &raquo; {datetime} ({addr})</h2>
    {/if}
</div>

<style>
    .breadcrumb {
        width: 100%;
        display: flex;
        height: 50px;
        gap: 20px;
        justify-content: flex-start;
        align-items: center;
    }
    .breadcrumb--item {
        margin: 0;
    }
</style>