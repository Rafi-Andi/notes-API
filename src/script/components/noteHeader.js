class Header extends HTMLElement {

  static observedAttributes = ['aktif']
  constructor() {
    super();

    this._aktif = this.getAttribute('aktif') || 'notes';
    
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.innerHTML = `
           @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
           
           :host {
                color: white;
                font-family: roboto, sans-serif;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background-color: rgb(70, 66, 60, 0.2);
                backdrop-filter: blur(5px);
                z-index: 999px;
           }

           .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: white;
            padding: 5px 20px;
            }

    .container ul {
      display: flex;
      gap: 1rem;
      padding: 0px;
      list-style: none;
    }

    .container ul li a {
      text-decoration: none;
      color: white;
      font-weight: 700;
      transition: all .5s;
    }

    .${this._aktif} a {
      color: rgb(108, 105, 105) !important;
    }
    .container ul li a:hover {
        color:  rgb(108, 105, 105);
    }
        `;
  }

  emptyElement() {
    this._shadowRoot.innerHTML = "";
  }

  render() {
    this.emptyElement();
    this.updateStyle();

    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
        <div class="container">
        <h1>RafiNotes</h1>
            <ul>
              <li class="home"><a href="index.html">Home</a></li>
              <li class="notes"><a href="notes.html">Notes</a></li>
              <li class="archived"><a href="archived.html">Archived</a></li>
              </ul>
        </div>
        `;
  }

  attributeChangedCallback(name, old, newValue){
      this[`._${name}`] = newValue;

      this.render()
  }
}

customElements.define("header-custom", Header);
