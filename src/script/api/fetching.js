const API_BASE = "https://notes-api.dicoding.dev/v2";
import { notesData } from "../data/data.js";

const getNotes = async () => {
  try {
    const ress = await fetch(`${API_BASE}/notes`);
    const data = await ress.json();
    console.log(data);
    if (data.error) {
      console.error(data.error);
    } else {
      renderNotes(data.data);
    }
  } catch (err) {
    console.log(err);
  }
};


const insertNote = async (note) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)

    }

    try {
        const ress = await fetch(`${API_BASE}/notes`, options)
        const data = await ress.json()

        if(data.error){
            console.error(data.error)
        } else {
            getNotes()
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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const titleInput = form.elements["title"];
  const bodyInput = form.elements["isi"];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputTitle = document.querySelector("#title").value;
    const inputBody = document.querySelector("#isi").value;

    const noteInput = {
      title: inputTitle,
      body: inputBody,
    };

    insertNote(noteInput)
  });
});

function generateId() {
  const prefix = "notes";
  const randomStr = Math.random().toString(36).substring(2, 8);
  const randomNum = Math.floor(100000 + Math.random() * 900000);

  return `${prefix}-${randomStr}-${randomNum}`;
}

function getTimestamp() {
  return new Date().toISOString();
}

getNotes();
