export const API_BASE = "https://notes-api.dicoding.dev/v2";
import { customValidationUsernameHandler } from '../validasiForm.js';

export const getNotes = async () => {
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  };

  try {
    const ress = await fetch(`${API_BASE}/notes`, options);
    const data = await ress.json();

    if (data.error) {
      console.error(data.error);
    } else {
      getNotes();
    }
  } catch (err) {
    console.log(err);
  }
};

export const archiveNotes =  async (id) => {
  const options = {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    }
  }

  try {
    const ress = await fetch(`${API_BASE}/notes/${id}/archive`, options);
    const data = ress.json()

    console.log(data.message)
  } catch(err) {
    console.log(err)
  }
}

export const deleteNotes = async (id) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  }

  try {
    const ress = await fetch(`${API_BASE}/notes/${id}`, options)
    const data = ress.json()
  } catch(err) {
    console.log(err)
  }
}

export const generateObjek = (id, title, body, archived, createdAt) => {
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

    insertNote(noteInput);

    form.reset()
  });

  titleInput.addEventListener("change", customValidationUsernameHandler);
  titleInput.addEventListener("invalid", customValidationUsernameHandler);

  titleInput.addEventListener("blur", (event) => {
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  });

  bodyInput.addEventListener("change", customValidationUsernameHandler);
  bodyInput.addEventListener("invalid", customValidationUsernameHandler);

  bodyInput.addEventListener("blur", (event) => {
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  });
});

getNotes();
