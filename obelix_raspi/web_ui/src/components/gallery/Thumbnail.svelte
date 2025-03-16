<script>
    import { locOrigin } from '$lib/data-store.js';
    const {
      item,
      key,
      thumbClick = () => {}
    } = $props()

    const param = $derived((item?.path) ? item.path : key)
    const data = $derived({
      "isCollection": !!item?.location,
      "isImage": !!item?.path,
      "datetime": "",
      ...item
    })
</script>

<button class="thumbnail" type="button" onclick={() => thumbClick(param)} aria-label="select item">
    {#if data.isImage}
        <figure>
            <img src={$locOrigin + param} class="thumbnail--img" alt={param} loading="lazy" />
            <figcaption>{(new Date(data.datetime).toLocaleString())}</figcaption>
        </figure>
        <div class="thumbnail--overlay">
            <dl>
                {#if data?.position?.deg_x}<dt>Azimuth</dt><dd>{data.position.deg_x}°</dd>{/if}
                {#if data?.position?.deg_y}<dt>Altitude</dt><dd>{data.position.deg_y}°</dd>{/if}
            </dl>
        </div>
    {/if}
    {#if data.isCollection}
        <div class="collection">
            <h3>{data.location?.addr}</h3>
            <p>{(new Date(data.datetime).toLocaleString())}</p>
            <dl>
                {#if data.location?.lat}<dt>Lat: {data.location.lat}°</dt>{/if}
                {#if data.location?.lon}<dt>Lon: {data.location.lon}°</dt>{/if}
            </dl>
        </div>
    {/if}
</button>

<style>
    .thumbnail {
        all: unset;
        flex: 1 1 50%;
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: flex-start;
        background: var(--background);
        color: var(--color);
        max-width: calc(50% - 20px);
        border-radius: .5rem;
        overflow: hidden;

        @media (min-width: 500px) {
            max-width: calc(33.333% - 20px);
            flex: 1 1 33.333%;
        }

        @media (min-width: 756px) {
            max-width: calc(25% - 20px);
            flex: 1 1 25%;
        }
    }

    figure {
        margin: 0;
        padding: 0;
    }
    figcaption {
        padding: .5em;
        text-align: center;
    }
    .collection {
        text-align: center;
        padding: .5em;
    }
    .thumbnail--img {
        display: block;
        width: 100%;
    }
    .thumbnail--overlay {
        opacity: 0;
        position: absolute;
        top: 10%;
        left: 0;
        width: 100%;
        height: 100%;
        padding: .5em;
        background: var(--background);
        transition: all ease 300ms;
    }
    button:hover .thumbnail--overlay {
        top: 0;
        opacity: 1;
    }

</style>