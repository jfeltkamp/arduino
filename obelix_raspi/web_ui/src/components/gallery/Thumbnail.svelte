<script>
    const {
      path,
      thumbClick = () => {}
    } = $props()
</script>

<button class="thumbnail" type="button" onclick={() => thumbClick(path)} aria-label="enlarge image">
    <img src={path} class="thumbnail--img" alt={path} loading="eager" />
</button>

<style>
    .thumbnail {
        all: unset;
        flex: 1 1 50%;
        display: flex;
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

        @media (min-width: 992px) {
            max-width: calc(20% - 20px);
            flex: 1 1 20%;
        }
    }

    .thumbnail--img {
        display: block;
        width: 100%;
        margin-bottom: .5rem;
    }
</style>