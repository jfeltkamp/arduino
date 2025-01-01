<script>
    import VideoRecorder from "./tasks_bar/VideoRecorder.svelte";
</script>

<div class="tasks">
    <VideoRecorder />
</div>

<style>
    .tasks {
        position: fixed;
        top: 0;
        right: 0;
        height: 52px;
        z-index: 100;
        display: flex;
        flex-wrap: nowrap;
        background: transparent;
        justify-content: flex-end;
        align-items: center;
    }
</style>