<script>
    import VideoRecorder from "./tasks_bar/VideoRecorder.svelte";
    import ToggleFullscreen from "./tasks_bar/FullscreenToggle.svelte";
    import DaylightToggle from "./tasks_bar/DaylightToggle.svelte";
    import HomeButton from "./tasks_bar/HomeButton.svelte";
    import DangerStop from "./tasks_bar/DangerStop.svelte";
</script>

<div class="tasks">
    <VideoRecorder />
    <HomeButton />
    <ToggleFullscreen />
    <DaylightToggle />
    <DangerStop />
</div>
