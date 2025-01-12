<script>
  import {onDestroy} from "svelte";
  import {videoRecord} from '$lib/data-store.js';

  const stopwatch = { elapsedTime: 0 }
  let time = $state('00:00:00');

  function displayTime(hour, minutes, seconds) {
    const leadZeroTime = [hour, minutes, seconds].map(time => time < 10 ? `0${time}` : time)
    time = leadZeroTime.join(':')
  }

  function startStopwatch() {
    //reset start time
    stopwatch.startTime = Date.now();
    // run `setInterval()` and save the ID
    stopwatch.intervalId = setInterval(() => {
      //calculate elapsed time
      const elapsedTime = Date.now() - stopwatch.startTime + stopwatch.elapsedTime
      //calculate different time measurements based on elapsed time
      const seconds = parseInt((elapsedTime/1000)%60, 10)
      const minutes = parseInt((elapsedTime/(1000*60))%60, 10)
      const hour = parseInt((elapsedTime/(1000*60*60))%24, 10);
      //display time
      displayTime(hour, minutes, seconds)
    }, 1000);
  }

  function stopStopwatch() {
    if (stopwatch.intervalId) {
      clearInterval(stopwatch.intervalId);
      videoRecord.update(() => false)
      time = '00:00:00'
    }
  }

  let started = $state(false);
  const unsubscribe = videoRecord.subscribe((recording) => {
    if (recording !== started) {
        if (recording) {
          startStopwatch()
        }
        else {
          stopStopwatch()
        }
        started = recording
    }
  })

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })
</script>

{#if started}
<div class="video-recorder">
    <button onclick={stopStopwatch} aria-label="Stop video recording">
        <span class="icon-stop"></span>
        <span class="time">{time}</span>
    </button>
</div>
{/if}


<style>
    button {
        all: unset;
        cursor: pointer;
    }
    .video-recorder {
        font-size: 1.5em;
        padding: .25em .5em .25em .125em;
        margin: 0 .5em;
        background: #000;
        border-radius: 50px;
    }
</style>