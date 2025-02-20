class NotesList extends HTMLElement {
    constructor() {
        super();

        this._NotesData = [];
        this._style = document.createElement('style')
        this._shadowRoot = this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.render()
    }

    setNotesData(values){
        this._NotesData = values

        this.render()
    }
    updateStyle(){
        this._style.textContent = `
         @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
        :host {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));            
            gap: 1rem;
            font-family: roboto, sans-serif;
        }

        @media (max-width : 680px) {
            :host {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }
        @media (max-width : 480px) {
            :host {
                grid-template-columns: repeat(1, minmax(0, 1fr));
            }
        }
        ` 
    }

    emptyContent(){
        this._shadowRoot.innerHTML = ''
    }

    render(){
        this.updateStyle()
       
        const notesList = this._NotesData.map((noteData) => {
            const note = document.createElement('note-item')
            note.setNote(noteData)

            return note
        })

        this.emptyContent()

        this._shadowRoot.append(this._style, ...notesList)
    }
}

customElements.define('note-list', NotesList);