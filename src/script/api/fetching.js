const API_BASE = "https://notes-api.dicoding.dev/v2"
import { notesData } from "../data/data.js";


const getNotes = async () => {
    try {
        const ress = await fetch(`${API_BASE}/notes`)
        const data = await ress.json()
        console.log(data)
        if(data.error) {
            console.error(data.error)
        } else {
            renderNotes(data.data)
        }

    } catch(err) {
        console.log(err)
    }
}



const generateObjek = (id, title, body, archived, createdAt) => {
  return {
    id: id,
    title: title,
    body: body,
    archived: archived,
    createdAt: createdAt,
  };
};

const renderNotes = (notes) => {
  const noteList = document.querySelector("note-list");
  const notesListData = [];
  notes.forEach((note) => {
    const noteObjek = generateObjek(
      note.id,
      note.title,
      note.body,
      note.archived,
      note.createdAt
    );

    notesListData.unshift(noteObjek);
  });

  noteList.setNotesData(notesListData);
  console.log(notesListData);
};


getNotes();