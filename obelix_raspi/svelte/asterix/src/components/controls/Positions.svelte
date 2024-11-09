<script>
  import Icon from "../tools/Icon.svelte";
  let positions = $state({
    geo: {
      addr: "Wischhofsweg 4",
      lat: 53.606071,
      lon: 9.902575,
    },
    base: [
      {
        id: "home",
        name: "Home",
        pos: {
          x: -23900,
          y: 0,
          f: 500
        }
      },
      {
        id: "polaris",
        name: "Polaris",
        pos: {
          x: 0,
          y: 11912,
          f: 600,
        }
      },
      {
        id: "1",
        name: "Elisabeth Kirche",
        pos: {
          x: -3000,
          y: 250,
          f: 400
        }
      },
      {
        id: "2",
        name: "CCH Hamburg",
        pos: {
          x: -15000,
          y: -1250,
          f: 100,
        }
      }
    ]
  });
  const calback = (e, path) => {
    e.preventDefault();
    console.log('SVELTE callback', path)
  }
</script>

<div class="pos-wrapper uk-padding-small">
    <div id="nav-geo"></div>
    <ul id="nav-nav" class="uk-iconnav uk-iconnav-vertical">
        {#each positions.base as item}
            <li><a href={`/position/${item.id}`} onclick={(e) => calback(e, `/position/${item.id}`)}><span class="uk-icon" uk-icon=""><Icon type={item.id} size={1.35}/></span> <span>{item.name}</span></a></li>
        {/each}
    </ul>
</div>