<script>
    const {
      pages,
      listMax = 7,
      callback = () => {}
    } = $props();

    let width = $state(1080);

    let page = $state(1);
    let listPages = $derived(Math.min(pages, listMax));
    let listStart = $derived((Math.max(1, Math.min((page - Math.floor(listMax/2)), (pages - listMax + 1)))));


    function pageSwitch(i) {
      page = i;
      callback(i);
    }
</script>

{#if pages > 1}
    <div class="pager" bind:clientWidth={width}>
        {#if page > 2}
            <button class="pager-button" onclick={() => pageSwitch(1)}>&laquo;</button>
        {:else}
            <div class="ghost">&nbsp;</div>
        {/if}
        {#if page > 1}
            <button class="pager-button" onclick={() => pageSwitch(page-1)}>&lsaquo;</button>
        {:else}
            <div class="ghost">&nbsp;</div>
        {/if}
        {#each Array(listPages) as _, row}
            <button class="pager-button{(row+listStart === page) ? ' active' : ''}" onclick={() => pageSwitch(row+listStart)}>{row+listStart}</button>
        {/each}
        {#if page < pages}
            <button class="pager-button" onclick={() => pageSwitch(page + 1)}>&rsaquo;</button>
        {:else}
            <div class="ghost">&nbsp;</div>
        {/if}
        {#if page < (pages - 1)}
            <button class="pager-button" onclick={() => pageSwitch(pages)}>&raquo;</button>
        {:else}
            <div class="ghost">&nbsp;</div>
        {/if}
    </div>
{/if}

<style>
    .pager {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        min-height: 5rem;
        border-radius: 3px;
        background: transparent;
        width: 100%;
    }
    .ghost,
    .pager-button {
        font-size: 1.5em;
        width: 2em;
    }
    .pager-button {
        background: var(--background);
        color: var(--color);
        border-width: 0 0 0 1px;
        border-radius: 0;

        &.active {
            color: var(--color-highlight);
        }

        &:first-child {
            border-left: 0;
        }
    }
</style>