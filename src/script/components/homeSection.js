class HomeSection extends HTMLElement {
  constructor() {
    super();

    this._src = this.getAttribute("src");
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
    :host {
      height: 100vh;
      font-family: roboto, sans-serif;
    }

    .container {
      padding-top: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .container p {
      margin-top: 10px;
      text-align: center;
    }
        `;
  }

  emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  render() {
    this.emptyContent();
    this.updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div class="container">
      <img src="NotesIcon.png" alt="" width="300px">
      <h1>Rafi Notes</h1>
      <p>Tugas dicooding submission membuat website notes APP menggunakan web component javascript dan juga mengambil data dari data yang sudah di sediakan</p>
    </div>
        `;
  }
}

customElements.define("home-section", HomeSection);
