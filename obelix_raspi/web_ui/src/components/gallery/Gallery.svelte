<script>
  import { locOrigin } from '$lib/data-store.js';
  import Thumbnail from "./Thumbnail.svelte";
  import Pager from "./Pager.svelte";
  const {items = []} = $props();

  const chunk =  10;
  let page = $state(1);
  let cluster = $derived(items.slice((page - 1) * chunk, page * chunk));
  let pages = $derived(Math.ceil(items.length / chunk));

  let enlarged = $state('../starfield-zoom.jpg');

  function thumbClick(path) {
    enlarged = path;
  }
</script>

<div class="gallery">
    <div class="gallery-enlarged">
        <img src={enlarged} alt="enlarged" />
    </div>
    <div class="gallery-items">
        {#each cluster as image}
            <Thumbnail path={$locOrigin + image} {thumbClick} />
        {/each}
    </div>
    <Pager {pages} callback={(i) => {page = i}} />
</div>

<style>
    .gallery {
        max-width: 1120px;
        height: 100vh;
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        flex-wrap: wrap;
        gap: 20px;
    }
    .gallery-enlarged {
        width: 100%;
        height: 35vh;

        > img {
            display: block;
            width: calc(35vh * 1080 / 810);
            height: 35vh;
            object-fit: contain;
            object-position: center center;
            margin: auto;
        }
    }
    .gallery-items {
        width: 100%;
        height: 50vh;
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        flex-wrap: wrap;
        gap: 20px;
    }
</style>