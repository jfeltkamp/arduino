<script>
  import { locOrigin } from '$lib/data-store.js';
  import GalleryList from "./GalleryList.svelte";
  import Breadcrumb from "./Breadcrumb.svelte";
  const {
    items = [],
  } = $props();

  let itemNumber = $state();
  let currentList = $derived((typeof itemNumber === 'number' && items[itemNumber]?.images) ? items[itemNumber].images : items);
  let enlarged = $state();

  const reset = () => { itemNumber = null;}

  function thumbClick(param) {
    if (typeof param === 'number') {
      itemNumber = param
    } else {
      enlarged = param;
    }
  }
</script>

<div class="gallery">
    {#if enlarged}
        <div class="gallery-enlarged">
            <img src={$locOrigin + enlarged} alt="enlarged" />
        </div>
    {/if}

    <Breadcrumb item={items[itemNumber]} {reset} />
    <GalleryList items={currentList} {thumbClick} />
</div>

<style>
    .gallery {
        max-width: 1120px;
        height: 100vh;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
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
</style>