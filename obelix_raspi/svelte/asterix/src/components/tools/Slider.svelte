<script>
    let { id, name, callback, index, value = 0, minValue = 0, maxValue = 10, steps = 1 } = $props()


</script>


<div class="slider-wrapper">
    <label for="{'slider_slide_' + id}">{ name }</label>
    <input id={'slider_slide_' + id} type="range" min="{minValue}" max="{maxValue}" step="{steps}"
           bind:value={value}
           onchange={() => {callback(id, value)}}
    />
</div>

<style>
    .slider-wrapper {
        margin: .3em 0 .3em auto;
        padding: .3em 0;
        width: 100%;
        max-width: 350px;
    }
    label {
        font-size: 1.2em;
        display: block;
        margin-bottom: .5em;
        text-align: right;
    }

    /* Focus */
    input[type="range"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 80%;
        width: 100%;
        background: rgba(255,255,255,.3);
        border: 2px solid rgba(255,255,255,.8);
        border-radius: 10px;
        outline: none;
    }

    input[type="range"]::-moz-range-thumb,
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 35px;
        height: 35px;
        background: #7C7C7C;
        border-radius: 50%;
        border: 2px solid rgba(255,255,255,.8);
        cursor: pointer;
    }
</style>