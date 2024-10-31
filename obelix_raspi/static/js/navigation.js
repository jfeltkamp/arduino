import horizon from './horizon.js'

class Navigation {
  constructor() {
    this.nav = document.getElementById("nav-nav");
    if (this.nav) {
      this.geo = {};
      this.base = {};
      this.custom = [{}];
      this.fetchNavi();
    }
  }

  fetchNavi() {
    fetch('/get-navigation')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('NAV DATA', data)

        if (data.hasOwnProperty('geo')) {
          this.base = data.base;
        }
        if (data.hasOwnProperty('base')) {
          this.base = data.base;
        }
        if (data.hasOwnProperty('custom')) {
          this.custom = data.custom;
        }
        this._build()
      });
  }

  _call(type, name) {
    fetch(`/nav/${type}/${name}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        horizon.initUpdate(data)
      });
  }

  _getIcon(icon) {
    const iconEl = document.createElement("span");
    let iconType = "crosshairs";
    if (icon === "home") {
      iconType = "home";
    } else if (icon === "polaris") {
      iconType = "world";
    }
    iconEl.setAttribute("uk-icon", `icon: ${iconType}; ratio: 1.35`);
    return iconEl;
  }


  _getLink(type, name, definition) {
    const linkEl = document.createElement("a");
    linkEl.setAttribute("href", `/nav/${type}/${name}`);
    linkEl.append(this._getIcon(name));
    const label = document.createElement("span");
    label.innerText = (typeof definition.name === 'string') ? definition.name : 'no name';
    linkEl.append(label);
    linkEl.addEventListener('click', (e) => {
      e.preventDefault();
      this._call(`/nav/${type}/${name}`);
    })
    return linkEl;
  }

  _build() {
    const links = [];
    for (let name in this.base) {
      links.push(this._getLink('base', name, this.base[name]));
    }
    for (let num in this.custom) {
      links.push(this._getLink('custom', num, this.custom[num]));
    }
    this.nav.innerHTML = '';
    links.forEach((link) => {
      const listItem = document.createElement("li");
      listItem.append(link)
      this.nav.append(listItem);
    })
  }
}

new Navigation();