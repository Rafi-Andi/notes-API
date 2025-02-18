import { notesData } from "./data.js";
import { customValidationUsernameHandler } from '../validasiForm.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const titleInput = form.elements['title'];
    const bodyInput = form.elements['isi'];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const noteListEl = document.querySelector("note-list");

    const inputTitle = document.querySelector("#title").value;
    const inputBody = document.querySelector("#isi").value;
    const noteInput = {
      id: generateId(),
      title: inputTitle,
      body: inputBody,
      createdAt: getTimestamp(),
      archived: false,
    };

    notesData.unshift(noteInput);
    console.log(noteInput);

    console.log(notesData);

    noteListEl.setNotesData(notesData);

    form.reset();
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

  function generateId() {
    const prefix = "notes";
    const randomStr = Math.random().toString(36).substring(2, 8); 
    const randomNum = Math.floor(100000 + Math.random() * 900000);

    return `${prefix}-${randomStr}-${randomNum}`;
  }

  function getTimestamp() {
    return new Date().toISOString();
  }
});
