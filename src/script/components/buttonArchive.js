import { archiveNotes } from "../api/notesAPI";

class ButtonArchive extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", async (e) => {
      const noteItem = this.getRootNode().host;

      console.log("noteItem:", noteItem);

      const noteId = noteItem.getAttribute("id");
      console.log(noteId);

      await archiveNotes(noteId);
    });
  }

  emptyContent() {
    this.innerHTML = "";
  }

  updateStyle() {
    this._style.innerHTML += `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
    .container {
      margin: auto;
      background-color: green;
      width: fit-content;
      padding: 10px 20px;
      border-radius: 10px;
      transition: all .5s;
      font-family: roboto, sans-serif
      
    }

    .container button {
      background-color: transparent;
      outline: none;
      border: none;
      color: white;
    }

    .container:hover {
      background-color: lightgreen;
    }`;
  }

  render() {
    this.emptyContent();
    this.updateStyle();

    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML = `
    ${this._style.outerHTML}
        <div class="container"> 
            <button><slot>Archive</slot></button>
        </div>
    `;
  }
}

customElements.define("button-archive", ButtonArchive);
