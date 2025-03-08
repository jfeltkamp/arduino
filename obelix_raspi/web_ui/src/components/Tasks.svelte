<script>
    import VideoRecorder from "./tasks_bar/VideoRecorder.svelte";
    import ToggleFullscreen from "./tasks_bar/FullscreenToggle.svelte";
    import DaylightToggle from "./tasks_bar/DaylightToggle.svelte";
</script>

<div class="tasks">
    <VideoRecorder />
    <ToggleFullscreen />
    <DaylightToggle />
</div>

<style>
    .tasks {
        position: fixed;
        top: 3%;
        right: 3%;
        z-index: 10;
        display: flex;
        flex-wrap: nowrap;
        background: var(--background);
        justify-content: flex-end;
        align-items: center;
        height: 52px;
    }

    :global {
        .task--button  {
            display: block;
            min-width: 52px;
            height: 100%;
            border-radius: 0;
            background: transparent;
            border: none;
            font-size: 28px;
            color: var(--color);
        }
    }
</style>