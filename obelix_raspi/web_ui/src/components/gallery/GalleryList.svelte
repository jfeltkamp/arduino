<script>
  import Thumbnail from "./Thumbnail.svelte";
  import Pager from "./Pager.svelte";

  const {
    items,
    thumbClick
  } = $props()

  const chunk =  12;
  let page = $state(1);
  let cluster = $derived(items.slice((page - 1) * chunk, page * chunk));
  let pages = $derived(Math.ceil(items.length / chunk));
</script>

<div class="gallery-items">
    {#each cluster as item, i}
        <Thumbnail {item} key={i} {thumbClick} />
    {/each}
</div>
<Pager {pages} callback={(i) => {page = i}} />

<style>
    .gallery-items {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        flex-wrap: wrap;
        gap: 20px;
    }
</style>