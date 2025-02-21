class Button extends HTMLElement {
    static observedAttributes = ['color', 'hover', 'borderRadius', 'href']

    constructor(){
        super()

        this._shadowRoot = this.attachShadow({mode: 'open'})
        this._color = this.getAttribute('color') || 'blueviolet'
        this._borderRadius = this.getAttribute('borderRadius')
        this._href = this.getAttribute('href') || '#'
        this._hover = this.getAttribute('hover')
        this._style = document.createElement('style')
    }

    connectedCallback(){
        this.render()
    }
    updateStyle(){
    this._style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
    .container {
      margin: auto;
      background-color: ${this._color};
      width: fit-content;
      padding: 10px 20px;
      border-radius: ${this._borderRadius}px;
      transition: all .5s;
      font-family: roboto, sans-serif
      
    }

    .container a {
      text-decoration: none;
      color: white;
    }

    .container:hover {
      background-color: ${this._hover};
    }        
    `
    }

    emptyContent(){
        this._shadowRoot.innerHTML = ''
    }

    render(){
        this.emptyContent()
        this.updateStyle()

        this._shadowRoot.appendChild(this._style)

        this._shadowRoot.innerHTML = `
         ${this._style.outerHTML}
        <div class="container"> 
            <a href="${this._href}"><slot>Button</slot></a>
        </div>
        `
    }

    attributeChangedCallback(name, oldValue, newValue){
        this[`._${name}`] = newValue

        this.render()
    }
}

customElements.define('button-custom', Button);
